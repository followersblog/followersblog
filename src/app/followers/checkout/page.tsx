'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { SOCIAL_PACKAGES } from '@/data/followers-services';
import { SocialServicePackage } from '@/types';
import { loadRazorpayScript } from '@/lib/load-razorpay';
import { loadCashfreeScript } from '@/lib/load-cashfree';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Send,
  Lock,
  AlertCircle,
  Clock,
  CheckCircle2,
} from 'lucide-react';

function FollowersCheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const packageIdParam = searchParams.get('packageId');

  const [selectedPkg, setSelectedPkg] = useState<SocialServicePackage | null>(null);
  const [targetUrl, setTargetUrl] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const preloadedOrderRef = useRef<{
    pkgId: string;
    promise: Promise<any>;
  } | null>(null);

  const startPreloadingOrder = (pkg: SocialServicePackage) => {
    try {
      const orderPromise = fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: pkg.price,
          currency: 'INR',
          productType: 'service',
          productId: pkg.id,
          customerName: 'Creator',
          customerEmail: 'creator@followers.blog',
          customerPhone: '9876543210',
          targetUrl: 'checkout_preload',
        }),
      })
        .then(async (res) => {
          if (!res.ok) return null;
          return res.json();
        })
        .catch(() => null);

      preloadedOrderRef.current = {
        pkgId: pkg.id,
        promise: orderPromise,
      };
    } catch (e) {
      // Non-fatal
    }
  };

  // Preload script & order when selected package is ready
  useEffect(() => {
    loadRazorpayScript();
    if (selectedPkg) {
      startPreloadingOrder(selectedPkg);
    }
  }, [selectedPkg?.id]);

  // Load from sessionStorage if available or query param
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('followers_order');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setTargetUrl(parsed.target || '');
          setCustomerName(parsed.customerName || '');
          setCustomerPhone(parsed.customerPhone || '');
          setCustomerEmail(parsed.customerEmail || '');
          const match = SOCIAL_PACKAGES.find((p) => p.id === parsed.packageId);
          if (match) {
            setSelectedPkg(match);
            return;
          }
        } catch (e) {
          console.error(e);
        }
      }
    }

    if (packageIdParam) {
      const match = SOCIAL_PACKAGES.find((p) => p.id === packageIdParam);
      if (match) setSelectedPkg(match);
    } else {
      setSelectedPkg(SOCIAL_PACKAGES[0]);
    }
  }, [packageIdParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!selectedPkg) {
      setErrorMessage('Please select a service package.');
      return;
    }

    if (!targetUrl.trim()) {
      setErrorMessage('Please fill in Target URL / Username.');
      return;
    }

    const cleanPhone = customerPhone.replace(/\D/g, '').slice(-10);
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    const displayName = customerName.trim() || targetUrl.trim().replace(/^@/, '') || 'Creator';
    const email = customerEmail.trim() || `${cleanPhone}@followers.blog`;

    setIsProcessing(true);
    setErrorMessage('');

    try {
      // 1. Fetch / create order first
      let data: any = null;
      if (
        preloadedOrderRef.current &&
        preloadedOrderRef.current.pkgId === selectedPkg.id
      ) {
        data = await preloadedOrderRef.current.promise;
      }

      // If preload wasn't ready or failed, request on demand
      if (!data || !data.order_id) {
        const response = await fetch('/api/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: selectedPkg.price,
            currency: 'INR',
            productType: 'service',
            productId: selectedPkg.id,
            customerName: displayName,
            customerEmail: email,
            customerPhone: cleanPhone,
            targetUrl,
          }),
        });
        data = await response.json();
      } else {
        // Fast non-blocking update to sync customer details into Supabase
        fetch('/api/update-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            receipt: data.receipt,
            customerName: displayName,
            customerEmail: email,
            customerPhone: cleanPhone,
            targetUrl,
          }),
        }).catch(() => {});
      }

      if (!data || !data.order_id) {
        throw new Error(data?.error || 'Failed to initiate payment.');
      }

      // Cashfree routing
      if (data.gateway === 'cashfree' || data.payment_session_id) {
        const Cashfree = await loadCashfreeScript();
        if (Cashfree && data.payment_session_id) {
          const cashfree = Cashfree({
            mode: data.environment || 'production',
          });
          cashfree.checkout({
            paymentSessionId: data.payment_session_id,
            redirectTarget: '_self',
          });
          return;
        }
        if (data.payment_url) {
          window.location.href = data.payment_url;
          return;
        }
      }

      // Razorpay routing
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error('Razorpay payment gateway failed to load. Please check your connection.');
      }

      // Suppress annoying browser alerts from gateway iframe errors
      if (typeof window !== 'undefined') {
        const rawAlert = window.alert;
        window.alert = function (msg: any) {
          if (typeof msg === 'string' && (msg.includes('Oops') || msg.includes('checkout') || msg.includes('opening'))) {
            console.warn('Suppressed gateway browser alert:', msg);
            return;
          }
          rawAlert.apply(window, arguments as any);
        };
      }

      const origin = typeof window !== 'undefined' ? window.location.origin : 'https://follower.blog';

      // 3. Open Razorpay Checkout Modal
      const options = {
        key: data.key_id || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_live_Ts8dDt5Uk6gpHC',
        amount: data.amount,
        currency: data.currency || 'INR',
        name: 'Followers.blog',
        description: 'Digital Creator Strategy Class & Media Consultation',
        image: '/logo.png',
        order_id: data.order_id,
        callback_url: `${origin}/api/razorpay-callback?source=followers`,
        redirect: false,
        prefill: {
          name: displayName,
          email: email,
          contact: `+91${cleanPhone}`,
        },
        readonly: {
          contact: true,
          email: true,
          name: true,
        },
        notes: {
          service: 'Digital Creator Strategy Class',
          receipt: data.receipt,
        },
        theme: {
          color: '#E11D48',
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
            setErrorMessage('');
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
            if (typeof window !== 'undefined') {
              window.location.href = `/followers/success?order_id=${encodeURIComponent(data.receipt)}&payment_id=${encodeURIComponent(paymentResponse.razorpay_payment_id || '')}&from=/followers`;
            } else {
              router.push(`/followers/success?order_id=${encodeURIComponent(data.receipt)}&from=/followers`);
            }
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
      setTimeout(() => {
        setIsProcessing(false);
      }, 1000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
      setIsProcessing(false);
    }
  };

  if (!selectedPkg) {
    return <div className="text-center py-20">Loading package details...</div>;
  }

  const telegramLink = process.env.NEXT_PUBLIC_TELEGRAM_SUPPORT_URL || 'https://t.me/FollowersBlogSupport';

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <Link href="/followers" className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-pink-600 mb-3">
          ← Back to All Services
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-zinc-950">
          Complete Your Service Order
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Fast automated processing. 100% account safe delivery.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Package Summary Box */}
      <div className="bg-white rounded-3xl border-2 border-pink-500/80 p-6 mb-6 shadow-xs text-center relative">
        <span className="text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full bg-pink-100 text-pink-700">
          {selectedPkg.badge || 'SELECTED SERVICE'}
        </span>
        <h2 className="text-xl font-black text-zinc-950 mt-1">
          {selectedPkg.name}
        </h2>
        <div className="text-3xl font-black text-pink-600 my-2">
          ₹{selectedPkg.price}{' '}
          <span className="text-xs text-zinc-400 line-through font-normal">₹{selectedPkg.originalPrice}</span>
        </div>
        <p className="text-xs text-zinc-600 max-w-sm mx-auto">
          {selectedPkg.description}
        </p>
      </div>

      {/* Order Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div>
          <label className="block text-xs font-bold text-zinc-900 mb-1">
            Target Profile URL / Username / Channel Link *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. https://instagram.com/your_handle ya @username"
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-hidden focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
          />
          <p className="text-[10px] text-zinc-400 mt-1 flex items-center gap-1">
            <Lock className="w-3 h-3 text-emerald-600" />
            <span>Profile public honi chahiye. Password ki bilkul zaroorat nahi hai.</span>
          </p>
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-900 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            required
            placeholder="Aapka Naam"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-hidden focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-900 mb-1">
            Mobile / WhatsApp Number *
          </label>
          <input
            type="tel"
            required
            placeholder="10-digit WhatsApp Number"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-hidden focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-900 mb-1">
            Email Address (For Receipt & Tracking)
          </label>
          <input
            type="email"
            placeholder="receipt@followers.blog"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-hidden focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
          />
        </div>

        {/* Pay Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-4 px-6 rounded-2xl font-black text-sm tracking-wide text-white bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 shadow-md shadow-pink-500/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
          >
            {isProcessing ? (
              <span>Connecting Secure Payment Gateway...</span>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Pay Securely — ₹{selectedPkg.price}</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </>
            )}
          </button>
        </div>

        <div className="pt-2 flex items-center justify-center gap-2 text-xs text-zinc-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>256-Bit SSL Encrypted & Verified Payment</span>
        </div>
      </form>

      {/* Support box */}
      <div className="mt-6 text-center text-xs text-zinc-500 flex items-center justify-center gap-2">
        <span>Kisi problem ke liye:</span>
        <a href={telegramLink} target="_blank" rel="noopener noreferrer" className="font-bold text-sky-600 hover:underline flex items-center gap-1">
          <Send className="w-3 h-3 fill-sky-600" /> Telegram Support
        </a>
      </div>
    </div>
  );
}

export default function FollowersCheckoutPage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <Suspense fallback={<div className="text-center py-20">Loading checkout...</div>}>
        <FollowersCheckoutContent />
      </Suspense>
    </div>
  );
}
