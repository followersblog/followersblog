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
  ChevronRight
} from 'lucide-react';

function ClothingCheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId') || CLOTHING_PRODUCTS[0].id;
  const initialSize = searchParams.get('size') || '';
  const initialQty = parseInt(searchParams.get('qty') || '1', 10);

  // Selected item state
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

  // Pricing calculations
  const singleItemPrice = product.discountPrice;
  const subtotal = singleItemPrice * quantity;

  // Auto discounts:
  // 1. First order coupon WELCOME10 = Flat ₹100 OFF (if order >= 350) or 10%
  const couponDiscount = couponApplied
    ? subtotal >= 400
      ? 100
      : Math.round(subtotal * 0.15)
    : 0;

  // 2. Buy 2 Get ₹150 OFF bundle offer
  const bundleDiscount = quantity >= 2 ? 150 : 0;

  const totalDiscount = couponDiscount + bundleDiscount;
  const shippingFee = 0; // FREE Express Delivery
  const finalPayable = Math.max(1, subtotal - totalDiscount + shippingFee);

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
        productName: `${product.name} (Size: ${selectedSize}, Qty: ${quantity})`,
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

      // Check if Cashfree
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
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
          <Link href="/" className="hover:text-red-600">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span>Clothing Checkout</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-zinc-900 font-semibold">{product.name}</span>
        </div>

        {/* High Conversion Banner */}
        <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Flame className="w-6 h-6 text-yellow-300 animate-bounce" />
            </div>
            <div>
              <p className="font-extrabold text-sm sm:text-base">
                🔥 FLASH SALE ACTIVE: {STORE_PROMOS.firstOrderDiscountText}
              </p>
              <p className="text-xs text-red-100">
                100% Instant Refund on Cancellation + 3-5 Days Express Tracked Delivery
              </p>
            </div>
          </div>
          <div className="shrink-0 bg-black/40 px-3 py-1.5 rounded-lg text-xs font-mono font-bold border border-white/20">
            AUTO COUPON APPLIED
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form: Delivery & Customer Info */}
          <div className="lg:col-span-7 space-y-6">
            <form onSubmit={handlePayment} className="space-y-6">
              {/* Delivery Address Card */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-zinc-200 shadow-xs">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                    <h2 className="text-lg font-bold text-zinc-900">
                      Shipping & Delivery Address
                    </h2>
                  </div>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5" /> 3-5 Days
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Phone Number (WhatsApp updates) *
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="For invoice & tracking link"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm font-medium"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Flat / House No. / Street / Area *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Flat 302, Green Avenue, Near Metro"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mumbai / Delhi"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                      6-Digit PIN Code *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="e.g. 110001"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Trust & Guarantee Box */}
              <div className="bg-emerald-50/60 rounded-2xl p-5 border border-emerald-200 flex items-start gap-4">
                <RotateCcw className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-900">
                    100% Instant Refund on Cancellation
                  </h4>
                  <p className="text-xs text-emerald-700 mt-1 leading-relaxed">
                    Koi risk nahi! Agar dispatch se pehle aapka mind change ho jaye, toh 1-click me turant 100% refund aapke account me bhej diya jata hai.
                  </p>
                </div>
              </div>

              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-red-600 via-red-500 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-extrabold text-lg shadow-lg shadow-red-500/20 transition-all transform active:scale-98 flex items-center justify-center gap-3 disabled:opacity-50"
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

              <div className="flex items-center justify-center gap-4 text-xs text-zinc-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  UPI, Cards & NetBanking Supported
                </span>
                <span>•</span>
                <span>Encrypted 256-Bit Checkout</span>
              </div>
            </form>
          </div>

          {/* Right Summary: Product Card & Dynamic Pricing */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-xs space-y-6">
              <h3 className="text-base font-bold text-zinc-900 pb-3 border-b border-zinc-100 flex items-center justify-between">
                <span>Order Summary</span>
                <span className="text-xs text-red-600 font-extrabold bg-red-50 px-2 py-0.5 rounded">
                  {product.badge || 'Trending Fit'}
                </span>
              </h3>

              {/* Product Preview */}
              <div className="flex gap-4">
                <div className="w-24 h-28 rounded-xl overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  {product.isFirstCopy && (
                    <span className="text-[10px] font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 uppercase">
                      7A Quality / 1st Copy
                    </span>
                  )}
                  <h4 className="text-sm font-bold text-zinc-900 line-clamp-2">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-lg font-extrabold text-red-600">
                      ₹{product.discountPrice}
                    </span>
                    <span className="text-xs text-zinc-400 line-through">
                      ₹{product.originalPrice}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                      {Math.round(((product.originalPrice - product.discountPrice) / product.originalPrice) * 100)}% OFF
                    </span>
                  </div>
                </div>
              </div>

              {/* Size & Quantity selector */}
              <div className="space-y-4 pt-3 border-t border-zinc-100">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-zinc-700 uppercase">
                      Select Size: <span className="text-red-600 font-black">{selectedSize}</span>
                    </label>
                    <span className="text-[11px] text-zinc-400">Regular Fit</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSelectedSize(sz)}
                        className={`min-w-10 px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                          selectedSize === sz
                            ? 'bg-zinc-900 text-white border-zinc-900 shadow-xs'
                            : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity + Bundle Trigger */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-zinc-700 uppercase">
                      Quantity:
                    </label>
                    {quantity === 1 && (
                      <span className="text-[11px] font-bold text-amber-600">
                        ⚡ Add 1 more for extra ₹150 OFF!
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-zinc-200 rounded-lg overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-1 bg-zinc-100 hover:bg-zinc-200 text-sm font-bold"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 text-sm font-bold text-zinc-900">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-1 bg-zinc-100 hover:bg-zinc-200 text-sm font-bold"
                      >
                        +
                      </button>
                    </div>
                    {quantity >= 2 && (
                      <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                        🎉 Combo Applied: -₹150 OFF
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
                    placeholder="Enter Coupon (e.g. WELCOME10)"
                    className="flex-1 px-3 py-2 text-xs font-mono font-bold uppercase rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-bold rounded-xl bg-zinc-900 text-white hover:bg-zinc-800"
                  >
                    Apply
                  </button>
                </form>
                {couponApplied && (
                  <p className="text-xs text-emerald-600 font-semibold mt-1.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Coupon <span className="font-mono font-bold">WELCOME10</span> applied!
                  </p>
                )}
              </div>

              {/* Final Breakdown */}
              <div className="space-y-2 pt-3 border-t border-zinc-100 text-sm">
                <div className="flex justify-between text-zinc-600">
                  <span>Price ({quantity} Item{quantity > 1 ? 's' : ''})</span>
                  <span>₹{subtotal}</span>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>First Order Coupon (WELCOME10)</span>
                    <span>-₹{couponDiscount}</span>
                  </div>
                )}

                {bundleDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Buy 2 Combo Savings</span>
                    <span>-₹{bundleDiscount}</span>
                  </div>
                )}

                <div className="flex justify-between text-zinc-600">
                  <span>Express 3-5 Days Delivery</span>
                  <span className="text-emerald-600 font-bold uppercase text-xs">FREE</span>
                </div>

                <div className="flex justify-between text-base font-black text-zinc-900 pt-3 border-t border-zinc-200">
                  <span>Total Payable:</span>
                  <span className="text-xl text-red-600">₹{finalPayable}</span>
                </div>
              </div>
            </div>

            {/* Quick highlights */}
            <div className="p-4 rounded-xl bg-white border border-zinc-200 space-y-2 text-xs text-zinc-600">
              <p className="font-bold text-zinc-900">Why order from Next Creators Wear?</p>
              <ul className="space-y-1.5 list-disc pl-4">
                <li>Factory-direct pricing without middleman showroom margins</li>
                <li>Real master replica details with premium cotton blends</li>
                <li>Dispatched within 24 hours with SMS/WhatsApp live tracking</li>
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
