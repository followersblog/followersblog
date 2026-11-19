'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CLOTHING_PRODUCTS, ClothingProduct, STORE_PROMOS } from '@/data/clothing';
import { loadRazorpayScript } from '@/lib/load-razorpay';
import { loadCashfreeScript } from '@/lib/load-cashfree';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Tag,
  Flame,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  Gift
} from 'lucide-react';

function ClothingCheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId') || CLOTHING_PRODUCTS[0].id;
  const initialSize = searchParams.get('size') || '';
  const initialQty = parseInt(searchParams.get('qty') || '1', 10);

  const product: ClothingProduct =
    CLOTHING_PRODUCTS.find((p) => p.id === productId) || CLOTHING_PRODUCTS[0];

  const [selectedSize, setSelectedSize] = useState<string>(initialSize || product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || '');
  const [quantity, setQuantity] = useState<number>(initialQty > 0 ? initialQty : 1);

  // User details
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [stateName, setStateName] = useState('');

  // Coupon state
  const [couponCode, setCouponCode] = useState('WELCOME10');
  const [couponApplied, setCouponApplied] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    loadCashfreeScript();
    loadRazorpayScript();
  }, []);

  const singleItemPrice = product.discountPrice;
  const rawSubtotal = singleItemPrice * quantity;

  // USER RULE 1: BUY 1 GET 1 FREE (BOGO)
  // If user orders 2 hoodies, the 2nd one is 100% FREE (discount = singleItemPrice)!
  // If user orders 4, 2 are free, etc.
  const freeItemsCount = Math.floor(quantity / 2);
  const bogoDiscount = freeItemsCount * singleItemPrice;

  // Subtotal after BOGO
  const payableBeforeCoupon = rawSubtotal - bogoDiscount;

  // USER RULE 2:
  // "249 wale me 50 ka off lage 1st buying me and 499 wale me 100 ka"
  let couponDiscount = 0;
  if (couponApplied) {
    if (singleItemPrice <= 300) {
      couponDiscount = 50; // ₹50 OFF for ₹249 items
    } else {
      couponDiscount = 100; // ₹100 OFF for ₹499 items
    }
  }

  const finalPayable = Math.max(1, payableBeforeCoupon - couponDiscount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'WELCOME10') {
      setCouponApplied(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid coupon code. Try WELCOME10 for instant discount.');
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name for shipping delivery.');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number for delivery tracking.');
      return;
    }
    if (!address.trim() || !pincode.trim() || !city.trim()) {
      setErrorMessage('Please provide complete shipping address with 6-digit Pincode.');
      return;
    }

    setIsProcessing(true);

    try {
      const orderPayload = {
        amount: finalPayable,
        currency: 'INR',
        productName: `${product.name} (Size: ${selectedSize}, Qty: ${quantity}${freeItemsCount > 0 ? ` + ${freeItemsCount} FREE BOGO` : ''})`,
        customerName: fullName.trim(),
        customerEmail: email.trim() || `${phone.replace(/\D/g, '').slice(-10)}@nextcreators.in`,
        customerPhone: phone.replace(/\D/g, '').slice(-10),
        productType: 'clothing',
        targetUrl: `Address: ${address}, ${city}, ${stateName} - ${pincode} | Color: ${selectedColor} | Size: ${selectedSize}`,
      };

      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      const orderData = await res.json();

      if (!res.ok || !orderData.success) {
        throw new Error(orderData.error || 'Failed to initialize payment gateway.');
      }

      // Cashfree
      if (orderData.gateway === 'cashfree') {
        if (!(window as any).Cashfree) {
          throw new Error('Cashfree payment SDK failed to load. Please refresh.');
        }
        const cashfree = (window as any).Cashfree({
          mode: orderData.environment === 'production' ? 'production' : 'sandbox',
        });
        cashfree.checkout({
          paymentSessionId: orderData.payment_session_id,
          redirectTarget: '_self',
        });
        return;
      }

      // Razorpay
      if (!(window as any).Razorpay) {
        throw new Error('Razorpay payment gateway failed to load. Please refresh.');
      }

      const rzpOptions = {
        key: orderData.key_id || 'rzp_live_Ts8dDt5Uk6gpHC',
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'Next Creators Wear',
        description: `${product.name} - ${selectedSize}`,
        order_id: orderData.order_id,
        prefill: {
          name: fullName,
          email: email || 'customer@nextcreators.in',
          contact: phone,
        },
        theme: {
          color: '#dc2626',
        },
        handler: async function (response: any) {
          router.push(
            `/receipt?order_id=${orderData.receipt || orderData.order_id}&amount=${finalPayable}`
          );
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          },
        },
      };

      const rzpInstance = new (window as any).Razorpay(rzpOptions);
      rzpInstance.open();
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Payment initiation failed. Please retry.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 mb-6">
          <Link href="/" className="hover:text-red-600">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span>Checkout</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-zinc-950 font-black">{product.name}</span>
        </div>

        {/* High Conversion BOGO Banner */}
        <div className="mb-8 p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
              <Gift className="w-6 h-6 text-yellow-300 animate-bounce" />
            </div>
            <div>
              <p className="font-black text-sm sm:text-base uppercase tracking-wider">
                🎁 BUY 1 GET 1 FREE OFFER ACTIVE: Add 2 hoodies, 2nd one is 100% FREE!
              </p>
              <p className="text-xs text-red-100 font-medium">
                {singleItemPrice <= 300 ? '₹50 OFF Auto-Applied (₹249 Special)' : '₹100 OFF Auto-Applied (₹499 Drop)'} • 100% Instant Refund
              </p>
            </div>
          </div>
          <div className="shrink-0 bg-black/40 px-3.5 py-1.5 rounded-xl text-xs font-mono font-black border border-white/20">
            CODE: WELCOME10
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Shipping Form */}
          <div className="lg:col-span-7 space-y-6">
            <form onSubmit={handlePayment} className="space-y-6">
              
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-xs">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-black text-sm">
                      1
                    </div>
                    <h2 className="text-lg font-black text-zinc-950">
                      Delivery Address
                    </h2>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5" /> 3-5 Days
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-black text-zinc-700 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-zinc-700 uppercase tracking-wider mb-1.5">
                      Phone Number (WhatsApp Updates) *
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-zinc-700 uppercase tracking-wider mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="For tracking receipt"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm font-semibold"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-black text-zinc-700 uppercase tracking-wider mb-1.5">
                      House / Flat / Area / Landmark *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. House No. 42, Street 3, Near Metro"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-zinc-700 uppercase tracking-wider mb-1.5">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Delhi / Mumbai"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-zinc-700 uppercase tracking-wider mb-1.5">
                      6-Digit PIN Code *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="e.g. 110001"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm font-semibold"
                    />
                  </div>
                </div>
              </div>

              {/* Instant Refund Box */}
              <div className="bg-emerald-50/70 rounded-3xl p-5 border border-emerald-200 flex items-start gap-4">
                <RotateCcw className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-black text-emerald-950">
                    100% Instant Refund Policy
                  </h4>
                  <p className="text-xs text-emerald-800 mt-1 leading-relaxed font-medium">
                    Order dispatch hone se pehle agar aap cancel karte hain, toh turant 1-click me 100% full refund aapke account me credit ho jata hai. Zero questions asked.
                  </p>
                </div>
              </div>

              {errorMessage && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2 font-bold">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-black text-lg uppercase tracking-wider shadow-xl shadow-red-500/20 transition-all transform active:scale-98 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Connecting Secure Gateway...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Pay ₹{finalPayable} (Instant Order Confirm)</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-xs text-zinc-500 font-semibold">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  UPI, Cards & NetBanking Supported
                </span>
                <span>•</span>
                <span>256-Bit Encrypted</span>
              </div>
            </form>
          </div>

          {/* Right Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-xs space-y-6">
              <h3 className="text-base font-black text-zinc-950 pb-3 border-b border-zinc-100 flex items-center justify-between">
                <span>Order Summary</span>
                <span className="text-xs text-red-600 font-black bg-red-50 px-2.5 py-1 rounded-md">
                  {product.badge}
                </span>
              </h3>

              {/* Product Info */}
              <div className="flex gap-4">
                <div className="w-24 h-28 rounded-2xl overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-red-600 uppercase">
                    {product.brandTag}
                  </span>
                  <h4 className="text-sm font-black text-zinc-950 line-clamp-2">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-lg font-black text-red-600">
                      ₹{product.discountPrice}
                    </span>
                    <span className="text-xs text-zinc-400 line-through">
                      ₹{product.originalPrice}
                    </span>
                  </div>
                </div>
              </div>

              {/* Size & Quantity + BOGO Trigger */}
              <div className="space-y-4 pt-3 border-t border-zinc-100">
                <div>
                  <label className="block text-xs font-black uppercase text-zinc-700 mb-1.5">
                    Size: <span className="text-red-600">{selectedSize}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSelectedSize(sz)}
                        className={`min-w-10 px-3 py-1.5 text-xs font-black rounded-lg border transition-all ${
                          selectedSize === sz
                            ? 'bg-zinc-950 text-white border-zinc-950'
                            : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-black uppercase text-zinc-700">
                      Quantity:
                    </label>
                    {quantity === 1 && (
                      <span className="text-xs font-black text-amber-600 animate-pulse">
                        🔥 Add 1 more to get it 100% FREE!
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-zinc-200 rounded-xl overflow-hidden bg-zinc-50">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3.5 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-sm font-black"
                      >
                        -
                      </button>
                      <span className="px-4 py-1.5 text-sm font-black text-zinc-950">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3.5 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-sm font-black"
                      >
                        +
                      </button>
                    </div>

                    {quantity >= 2 && (
                      <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center gap-1">
                        <Gift className="w-3.5 h-3.5" /> BOGO APPLIED: 1 FREE!
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Coupon Box */}
              <div className="pt-3 border-t border-zinc-100">
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="Coupon (e.g. WELCOME10)"
                    className="flex-1 px-3 py-2 text-xs font-mono font-black uppercase rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-black rounded-xl bg-zinc-950 text-white hover:bg-zinc-800 uppercase"
                  >
                    Apply
                  </button>
                </form>
                {couponApplied && (
                  <p className="text-xs text-emerald-600 font-bold mt-1.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Coupon <strong className="font-mono">WELCOME10</strong> applied (-₹{couponDiscount})
                  </p>
                )}
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-2 pt-3 border-t border-zinc-100 text-xs sm:text-sm">
                <div className="flex justify-between text-zinc-600">
                  <span>Price ({quantity} Hoodie{quantity > 1 ? 's' : ''})</span>
                  <span>₹{rawSubtotal}</span>
                </div>

                {bogoDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Buy 1 Get 1 Free (BOGO)</span>
                    <span>-₹{bogoDiscount} (FREE)</span>
                  </div>
                )}

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>First Order Special Discount</span>
                    <span>-₹{couponDiscount}</span>
                  </div>
                )}

                <div className="flex justify-between text-zinc-600">
                  <span>Express Tracked Shipping (3-5 Days)</span>
                  <span className="text-emerald-600 font-black uppercase text-xs">FREE</span>
                </div>

                <div className="flex justify-between text-base font-black text-zinc-950 pt-3 border-t border-zinc-200">
                  <span>Total Amount:</span>
                  <span className="text-2xl text-red-600">₹{finalPayable}</span>
                </div>
              </div>
            </div>

            {/* Quick Guarantees */}
            <div className="p-5 rounded-2xl bg-white border border-zinc-200 text-xs text-zinc-600 space-y-2">
              <p className="font-black text-zinc-950 uppercase">Why Buyers Love Next Creators:</p>
              <ul className="space-y-1.5 list-disc pl-4 font-medium">
                <li>Heavyweight 300+ GSM fleece fabrics tested for zero shrinkage</li>
                <li>Shipped in sealed premium polybag with live WhatsApp tracking</li>
                <li>100% money back if you cancel before dispatch</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ClothingCheckoutPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center font-bold">Loading Checkout...</div>}>
      <ClothingCheckoutContent />
    </Suspense>
  );
}
