'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { COURSE_DETAILS, COURSE_ADDONS } from '@/data/courses';
import { loadRazorpayScript } from '@/lib/load-razorpay';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Plus,
  HelpCircle,
  AlertCircle,
} from 'lucide-react';

export default function CourseCheckoutPage() {
  const router = useRouter();

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Selected Add-ons (IDs)
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Toggle Add-on
  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  // Calculate dynamic total
  const basePrice = COURSE_DETAILS.price; // 1499
  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const addon = COURSE_ADDONS.find((a) => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);
  const finalTotal = basePrice + addonsTotal;

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setErrorMessage('Please fill in your name, email, and phone number.');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');

    try {
      const chosenAddonsList = selectedAddons.map((id) => {
        const item = COURSE_ADDONS.find((a) => a.id === id)!;
        return { id: item.id, name: item.name, price: item.price };
      });

      // 1. Ensure Razorpay checkout.js script is loaded
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error('Razorpay payment gateway failed to load. Please check your internet connection.');
      }

      // 2. Create Razorpay order via backend endpoint
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: finalTotal,
          currency: 'INR',
          productType: 'course',
          productId: COURSE_DETAILS.id,
          productName: COURSE_DETAILS.name,
          customerName: fullName,
          customerEmail: email,
          customerPhone: cleanPhone,
          addons: chosenAddonsList,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.order_id) {
        throw new Error(data.error || 'Failed to initiate payment.');
      }

      // 3. Open Razorpay Checkout Modal
      const options = {
        key: data.key_id || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_Ts840pCB0WvHBf',
        amount: data.amount,
        currency: data.currency || 'INR',
        name: 'Followers.blog',
        description: 'AI Website Building — 3 Hour Complete Practical Class',
        image: '/logo.png',
        order_id: data.order_id,
        prefill: {
          name: fullName,
          email: email,
          contact: cleanPhone,
        },
        notes: {
          course: 'AI Website Building',
          receipt: data.receipt,
        },
        theme: {
          color: '#2563EB',
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          },
        },
        handler: async function (paymentResponse: any) {
          try {
            // 4. Verify signature on backend
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_signature: paymentResponse.razorpay_signature,
                receipt: data.receipt,
              }),
            });

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok || !verifyData.success) {
              throw new Error(verifyData.error || 'Payment signature verification failed.');
            }

            // Redirect to success page
            router.push(`/course/success?order_id=${data.receipt}`);
          } catch (verifyErr: any) {
            setErrorMessage(verifyErr.message || 'Payment verification failed. Please contact support.');
            setIsProcessing(false);
          }
        },
      };

      const razorpayInstance = new (window as any).Razorpay(options);
      razorpayInstance.on('payment.failed', function (failResp: any) {
        setErrorMessage(failResp.error?.description || 'Payment failed. Please try again.');
        setIsProcessing(false);
      });
      razorpayInstance.open();
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Something went wrong. Please try again or contact support.');
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-zinc-50/70 py-10 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Secure Enrolment
            </span>
            <h1 className="text-3xl font-extrabold text-zinc-950 mt-2">
              Course Checkout
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1">
              Join the 3-Hour AI Website Building Practical Class. Instant access details upon confirmation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left Column: Customer Form */}
            <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-xs">
              <h2 className="text-lg font-bold text-zinc-950 mb-1 flex items-center gap-2">
                <span>1. Contact Details</span>
              </h2>
              <p className="text-xs text-zinc-500 mb-6">
                Webinar link and classroom credentials will be sent to this email & WhatsApp.
              </p>

              {errorMessage && (
                <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-800 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-800 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-800 mb-1">
                    Mobile Number (WhatsApp) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3.5 text-xs font-bold text-zinc-500">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>

                {/* Optional Add-ons Section */}
                <div className="pt-6 border-t border-zinc-100">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-zinc-950 flex items-center gap-1.5">
                      <span>2. Optional Add-Ons</span>
                      <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">
                        Optional
                      </span>
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-500 mb-4 leading-relaxed">
                    Check the boxes below if you want to include these booster resources with your class.
                  </p>

                  <div className="space-y-3">
                    {COURSE_ADDONS.map((addon) => {
                      const isSelected = selectedAddons.includes(addon.id);
                      return (
                        <div
                          key={addon.id}
                          onClick={() => toggleAddon(addon.id)}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-blue-50/70 border-blue-400 shadow-xs'
                              : 'bg-white border-zinc-200 hover:border-zinc-300'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => {}} // Handled by parent div click
                                className="mt-1 w-4 h-4 text-blue-600 rounded border-zinc-300 focus:ring-blue-500 cursor-pointer"
                              />
                              <div>
                                <h4 className="text-xs font-bold text-zinc-900">
                                  {addon.name}
                                </h4>
                                <p className="text-[11px] text-zinc-500 leading-tight mt-0.5">
                                  {addon.description}
                                </p>
                              </div>
                            </div>
                            <span className="text-xs font-black text-blue-700 bg-white px-2.5 py-1 rounded-lg border border-blue-200 shrink-0">
                              +₹{addon.price}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Submit Payment CTA */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 px-6 rounded-xl font-bold text-base text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/30 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                  >
                    {isProcessing ? (
                      <span>Connecting Secure Gateway...</span>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Pay Securely — ₹{finalTotal}</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </button>
                  <div className="mt-3 flex items-center justify-center gap-2 text-xs text-zinc-500">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>256-Bit SSL Encrypted & Verified Checkout</span>
                  </div>
                </div>
              </form>
            </div>

            {/* Right Column: Order Summary */}
            <div className="md:col-span-5 space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-xs">
                <h3 className="text-base font-bold text-zinc-950 pb-3 border-b border-zinc-100">
                  Order Summary
                </h3>

                <div className="py-4 space-y-3 text-xs sm:text-sm">
                  {/* Primary Course */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-bold text-zinc-900">{COURSE_DETAILS.name}</div>
                      <div className="text-[11px] text-zinc-500">3 Hours Practical Class + Recording</div>
                    </div>
                    <span className="font-bold text-zinc-900">₹{basePrice}</span>
                  </div>

                  {/* Add-ons list */}
                  {selectedAddons.map((id) => {
                    const addon = COURSE_ADDONS.find((a) => a.id === id)!;
                    return (
                      <div key={id} className="flex items-center justify-between text-xs text-blue-700">
                        <span>+ {addon.name}</span>
                        <span className="font-bold">₹{addon.price}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Total */}
                <div className="pt-4 border-t border-zinc-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-zinc-500 font-semibold uppercase">Total Payable</div>
                    <div className="text-2xl font-black text-zinc-950">₹{finalTotal}</div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                    One-time payment
                  </span>
                </div>

                {/* What happens next */}
                <div className="mt-6 p-4 rounded-2xl bg-zinc-50 border border-zinc-100 text-xs text-zinc-600 space-y-2">
                  <div className="font-bold text-zinc-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Immediate Access After Payment</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Aapko payment complete hone ke baad dashboard access aur class webinar meeting link instant email aur WhatsApp par bhej diya jayega.
                  </p>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="p-4 rounded-2xl bg-white border border-zinc-200 text-center text-xs text-zinc-500 space-y-1">
                <div className="font-bold text-zinc-800">Followers.blog Official Enrolment</div>
                <div>Support: <span className="font-medium text-zinc-700">support@followers.blog</span></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
