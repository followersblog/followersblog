'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  SOCIAL_CATEGORIES,
  INSTAGRAM_SUBCATEGORIES,
  YOUTUBE_SUBCATEGORIES,
  SOCIAL_PACKAGES,
  TESTIMONIALS,
  FOLLOWERS_FAQS,
  LIVE_ACTIVITY_SAMPLES,
} from '@/data/followers-services';
import { SocialServicePackage } from '@/types';
import { loadRazorpayScript } from '@/lib/load-razorpay';
import { loadCashfreeScript } from '@/lib/load-cashfree';
import { event } from '@/lib/meta-pixel';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Send,
  Star,
  ChevronDown,
  Clock,
  Shield,
  ShieldCheck,
  Zap,
  Lock,
  Flame,
  AlertCircle,
  X,
  Crown,
  Mail,
} from 'lucide-react';

export default function FollowersPage() {
  const router = useRouter();

  // Active Category state (Default Instagram as requested)
  const [selectedCategory, setSelectedCategory] = useState<string>('instagram');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('followers');

  // Flash Sale Timer countdown (e.g. 14:21)
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 21 });

  // Floating live activity notification
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [showActivity, setShowActivity] = useState(true);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Quick Order Modal state
  const [selectedPackageForModal, setSelectedPackageForModal] = useState<SocialServicePackage | null>(null);
  const [targetUsername, setTargetUsername] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalError, setModalError] = useState('');

  // Unfreeze screen & restore scroll helper
  const restoreScroll = () => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.height = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.position = '';
      document.documentElement.style.height = '';
      document.querySelectorAll('.razorpay-container').forEach((el) => {
        try {
          el.remove();
        } catch (e) {}
      });
    }
  };

  useEffect(() => {
    if (!selectedPackageForModal) {
      restoreScroll();
    }
  }, [selectedPackageForModal]);

  // Category change handler
  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    if (catId === 'instagram') {
      setSelectedSubCategory('followers');
    } else if (catId === 'youtube') {
      setSelectedSubCategory('views');
    }
  };

  // Timer countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return { minutes: 15, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Live activity rotation
  useEffect(() => {
    const activityTimer = setInterval(() => {
      setShowActivity(false);
      setTimeout(() => {
        setCurrentActivityIndex((prev) => (prev + 1) % LIVE_ACTIVITY_SAMPLES.length);
        setShowActivity(true);
      }, 500);
    }, 5000);
    return () => clearInterval(activityTimer);
  }, []);

  // Filter packages based on active category & subcategory
  const filteredPackages = SOCIAL_PACKAGES.filter((pkg) => {
    if (pkg.categoryId !== selectedCategory) return false;
    if (selectedCategory === 'instagram' && pkg.subCategoryId !== selectedSubCategory) {
      return false;
    }
    if (selectedCategory === 'youtube' && pkg.subCategoryId !== selectedSubCategory) {
      return false;
    }
    return true;
  });

  const telegramLink = process.env.NEXT_PUBLIC_TELEGRAM_SUPPORT_URL || 'https://t.me/FollowersBlogSupport';

  // Preload Razorpay checkout script immediately on page load
  useEffect(() => {
    loadRazorpayScript();
  }, []);

  const handleBuyNow = (pkg: SocialServicePackage) => {
    setSelectedPackageForModal(pkg);
    loadRazorpayScript();
    // Meta Pixel: ViewContent event
    event('ViewContent', {
      content_name: pkg.name,
      content_category: pkg.categoryId,
      content_ids: [pkg.id],
      content_type: 'product',
      value: pkg.price,
      currency: 'INR',
    });
  };

  const handleProceedToPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError('');

    if (!selectedPackageForModal) return;

    if (!targetUsername.trim()) {
      setModalError('Kripya target profile link ya username daalein.');
      return;
    }

    const cleanPhone = customerPhone.replace(/\D/g, '').slice(-10);
    if (cleanPhone.length < 10) {
      setModalError('Kripya valid 10-digit mobile / WhatsApp number daalein.');
      return;
    }

    setIsSubmitting(true);

    // Meta Pixel: InitiateCheckout event
    event('InitiateCheckout', {
      content_name: selectedPackageForModal.name,
      content_category: selectedPackageForModal.categoryId,
      content_ids: [selectedPackageForModal.id],
      content_type: 'product',
      value: selectedPackageForModal.price,
      currency: 'INR',
      num_items: 1,
    });

    try {
      // 1. Ensure Razorpay script is loaded
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error('Payment gateway load nahi ho paya. Kripya internet connection check karein.');
      }

      const displayName = customerName.trim() || targetUsername.trim().replace(/^@/, '') || 'Creator';
      const email = customerEmail.trim() || `${cleanPhone}@followers.blog`;

      // 2. Generate Gateway order with real verified customer details
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: selectedPackageForModal.price,
          currency: 'INR',
          productType: 'service',
          productId: selectedPackageForModal.id,
          customerName: displayName,
          customerEmail: email,
          customerPhone: cleanPhone,
          targetUrl: targetUsername.trim(),
        }),
      });

      const data = await response.json();

      if (!data || !data.order_id) {
        throw new Error(data?.error || 'Order generate nahi ho paya. Kripya punah prayas karein.');
      }

      // 2b. Cashfree routing if enabled
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

      const cleanDigits = customerPhone.replace(/\D/g, '').slice(-10);
      const formattedContact = `+91${cleanDigits}`;

      const origin = typeof window !== 'undefined' ? window.location.origin : 'https://follower.blog';

      // 3. Open Razorpay Checkout Modal directly with prefilled contact details
      const options = {
        key: data.key_id || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_live_Ts8dDt5Uk6gpHC',
        amount: data.amount,
        currency: data.currency || 'INR',
        name: 'Followers.blog',
        description: 'Digital Creator Strategy Class & Media Consultation',
        image: '/logo.png',
        order_id: data.order_id,
        callback_url: `${origin}/api/razorpay-callback?source=media`,
        redirect: false,
        prefill: {
          name: displayName,
          email: email,
          contact: formattedContact,
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
            setIsSubmitting(false);
            setModalError('');
            restoreScroll();
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
              throw new Error(verifyData.error || 'Payment signature verify nahi ho paya.');
            }

            // Save order in session for instant receipt access
            if (typeof window !== 'undefined') {
              sessionStorage.setItem('followers_order', JSON.stringify({
                orderId: data.receipt,
                packageId: selectedPackageForModal.id,
                packageName: selectedPackageForModal.name,
                amount: selectedPackageForModal.price,
                quantity: selectedPackageForModal.quantity,
                target: targetUsername,
                customerPhone: cleanPhone,
                customerName: displayName,
                customerEmail: email,
              }));
            }

            // Direct redirect to success page with full order details!
            const successUrl = `/followers/success?order_id=${encodeURIComponent(data.receipt)}&payment_id=${encodeURIComponent(paymentResponse.razorpay_payment_id || '')}&amount=${encodeURIComponent(String(selectedPackageForModal.price))}&name=${encodeURIComponent(displayName)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(cleanPhone)}&from=/followers`;

            if (typeof window !== 'undefined') {
              window.location.href = successUrl;
            } else {
              router.push(successUrl);
            }
          } catch (verifyErr: any) {
            setModalError(verifyErr.message || 'Payment verification failed.');
            setIsSubmitting(false);
          }
        },
      };

      const razorpayInstance = new (window as any).Razorpay(options);
      razorpayInstance.on('payment.failed', function () {
        setIsSubmitting(false);
        restoreScroll();
      });
      razorpayInstance.open();
      // Ensure button spinner doesn't get stuck once popup is launched
      setTimeout(() => {
        setIsSubmitting(false);
      }, 800);
    } catch (err: any) {
      setModalError(err.message || 'Something went wrong. Please try again.');
      setIsSubmitting(false);
      restoreScroll();
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans overflow-x-hidden w-full max-w-[100vw]">
      {/* ==================================================================== */}
      {/* 1. TOP FLASH SALE BANNER (Original Vibrant Gradient in 1-Line Ticker) */}
      {/* ==================================================================== */}
      <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white font-bold text-[11px] sm:text-xs py-2 shadow-sm overflow-hidden select-none border-b border-rose-500/30">
        <div className="animate-marquee-ticker flex items-center gap-8 whitespace-nowrap">
          {[0, 1].map((idx) => (
            <div key={idx} className="flex items-center gap-3 sm:gap-4 shrink-0">
              <span className="inline-flex items-center gap-1 bg-black/30 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-extrabold text-amber-300">
                <Flame className="w-3 h-3 text-amber-300 fill-amber-300 animate-pulse" />
                70% Flash Sale
              </span>
              <span>•</span>
              <span className="font-extrabold">100% Non-Drop Guaranteed & 30-Day Free Auto Refill</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 bg-black/40 px-2.5 py-0.5 rounded-full font-mono text-[11px] text-yellow-200 shadow-xs">
                <Clock className="w-3 h-3 text-yellow-300" />
                <span>Ends in {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}</span>
              </span>
              <span>•</span>
              <span>⚡ Instant 60-Second Process Auto-Start</span>
              <span>•</span>
              <span>🔒 100% Safe (No Password Needed)</span>
            </div>
          ))}
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 2. BRAND HEADER WITH SLEEK TELEGRAM PILL */}
      {/* ==================================================================== */}
      <header className="border-b border-zinc-100 bg-white/95 backdrop-blur-md sticky top-0 z-40 shadow-xs w-full overflow-hidden">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-1.5 sm:gap-2">
          {/* Brand Logo & Compact Typography */}
          <Link href="/followers" className="flex items-center gap-1.5 sm:gap-2 group shrink min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-pink-50 to-white flex items-center justify-center p-1 border border-zinc-200/80 shadow-xs group-hover:scale-105 transition-transform overflow-hidden shrink-0">
              <img 
                src="/logo.png" 
                alt="Followers.blog Logo" 
                className="w-full h-full object-contain" 
              />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="text-sm sm:text-lg font-black tracking-tight text-zinc-950 leading-tight truncate">
                FOLLOWERS<span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">.BLOG</span>
              </div>
              <span className="text-[8px] sm:text-[9px] text-zinc-400 font-semibold uppercase tracking-wider truncate">
                #1 Creator Growth Hub
              </span>
            </div>
          </Link>

          {/* Telegram Support Button: Modern Compact Pill with Live Online Pulse */}
          <a
            href={telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold text-white bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-sm shadow-sky-500/25 transition-all hover:scale-[1.02] active:scale-95 whitespace-nowrap shrink-0"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <Send className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white shrink-0" />
            <span className="leading-none">Telegram Support</span>
          </a>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* 3. CATEGORY SELECTION BUTTONS (2-Column Grid / Pills from Screenshots) */}
      {/* ==================================================================== */}
      <div className="max-w-2xl mx-auto px-4 pt-4 pb-2 w-full">
        <div className="grid grid-cols-2 gap-2.5">
          {/* Instagram */}
          <button
            onClick={() => handleCategorySelect('instagram')}
            className={`py-3 px-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border transition-all ${
              selectedCategory === 'instagram'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white border-transparent shadow-md shadow-pink-500/25'
                : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300'
            }`}
          >
            <span className="text-base">📸</span>
            <span>Instagram</span>
          </button>

          {/* Insta ID Unban */}
          <button
            onClick={() => handleCategorySelect('unban')}
            className={`py-3 px-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border transition-all ${
              selectedCategory === 'unban'
                ? 'bg-purple-600 text-white border-transparent shadow-md shadow-purple-600/25'
                : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300'
            }`}
          >
            <span className="text-base">🔥</span>
            <span>Insta ID Unban</span>
          </button>

          {/* YouTube */}
          <button
            onClick={() => handleCategorySelect('youtube')}
            className={`py-3 px-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border transition-all ${
              selectedCategory === 'youtube'
                ? 'bg-red-600 text-white border-transparent shadow-md shadow-red-600/25'
                : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300'
            }`}
          >
            <span className="text-base">🔴</span>
            <span>YouTube</span>
          </button>

          {/* Facebook */}
          <button
            onClick={() => handleCategorySelect('facebook')}
            className={`py-3 px-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border transition-all ${
              selectedCategory === 'facebook'
                ? 'bg-blue-600 text-white border-transparent shadow-md shadow-blue-600/25'
                : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300'
            }`}
          >
            <span className="text-base">🔵</span>
            <span>Facebook</span>
          </button>
        </div>

        {/* Telegram (Wide Pill Below) */}
        <div className="mt-2.5">
          <button
            onClick={() => handleCategorySelect('telegram')}
            className={`w-full py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border transition-all ${
              selectedCategory === 'telegram'
                ? 'bg-sky-500 text-white border-transparent shadow-md shadow-sky-500/25'
                : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300'
            }`}
          >
            <span className="text-base">✈️</span>
            <span>Telegram</span>
          </button>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 4. SUB-TABS (Followers, Likes, Views / Subscribers, Watch Time, etc.) */}
      {/* ==================================================================== */}
      <div className="max-w-2xl mx-auto px-4 py-2 w-full">
        {/* Instagram Sub-tabs */}
        {selectedCategory === 'instagram' && (
          <div className="grid grid-cols-3 gap-2 p-1.5 bg-zinc-100 rounded-2xl border border-zinc-200">
            {INSTAGRAM_SUBCATEGORIES.map((sub) => {
              const isActive = selectedSubCategory === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubCategory(sub.id)}
                  className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-sm shadow-pink-500/30'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  <span>{sub.icon}</span>
                  <span>{sub.name}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* YouTube Sub-tabs */}
        {selectedCategory === 'youtube' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-zinc-100 rounded-2xl border border-zinc-200">
            {YOUTUBE_SUBCATEGORIES.map((sub) => {
              const isActive = selectedSubCategory === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubCategory(sub.id)}
                  className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-sm shadow-pink-500/30'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  <span>{sub.icon}</span>
                  <span>{sub.name}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Insta ID Unban Top Header Banner */}
        {selectedCategory === 'unban' && (
          <div className="bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-white rounded-3xl p-6 text-center border-2 border-purple-500/50 shadow-md">
            <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-amber-400 text-zinc-950 inline-block mb-3">
              🔒 100% Guaranteed Account Recovery
            </span>
            <h2 className="text-xl font-black text-white">
              🔒 Instagram ID Unban & Recovery
            </h2>
            <p className="text-xs text-zinc-300 mt-2 max-w-md mx-auto leading-relaxed">
              Got your Instagram account disabled, suspended or banned? Don't worry! We offer a 100% account recovery service with complete trust, safety, and rapid turnaround time.
            </p>
          </div>
        )}
      </div>

      {/* ==================================================================== */}
      {/* 5. SERVICE PACKAGE CARDS (Matches Screenshot Designs & VVIP Dark Cards) */}
      {/* ==================================================================== */}
      <div className="max-w-2xl mx-auto px-4 py-4 w-full space-y-6">
        {filteredPackages.map((pkg, idx) => {
          const isVvip = pkg.badge?.includes('VVIP') || pkg.id.includes('vvip');
          const isUnban = pkg.categoryId === 'unban';

          // VVIP Dark Luxury Card from screenshots (Image 2, Image 3, Image 4)
          if (isVvip) {
            return (
              <div
                key={pkg.id}
                className="relative bg-gradient-to-b from-zinc-950 via-zinc-900 to-black rounded-3xl border-2 border-amber-400/80 p-6 sm:p-7 shadow-xl text-center text-white"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-4 py-0.5 rounded-full bg-amber-400 text-zinc-950 shadow-xs flex items-center gap-1">
                    <Crown className="w-3 h-3 fill-zinc-950" />
                    <span>{pkg.badge}</span>
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
                  {pkg.name}
                </h3>

                <div className="my-3 flex items-center justify-center gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-amber-400 tracking-tight">
                    ₹{pkg.price}
                  </span>
                  <span className="text-xs text-zinc-500 line-through font-semibold">
                    ₹{pkg.originalPrice}
                  </span>
                </div>

                <p className="text-xs text-zinc-300 max-w-sm mx-auto leading-relaxed mb-4">
                  {pkg.description}
                </p>

                <div className="space-y-2 max-w-xs mx-auto mb-6 text-left">
                  {pkg.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleBuyNow(pkg)}
                  className="btn-reflection w-full py-4 px-6 rounded-2xl font-black text-sm tracking-wide text-zinc-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span>CLAIM VVIP STATUS NOW</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            );
          }

          // Dynamic badge colors from screenshot
          let badgeBg = 'bg-amber-400 text-zinc-950';
          let borderOutline = 'border-amber-400';
          let btnColor = 'bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 shadow-pink-500/30';

          if (pkg.badge?.includes('POPULAR') || pkg.badge?.includes('1k Indian')) {
            badgeBg = 'bg-amber-400 text-zinc-950';
            borderOutline = 'border-amber-400';
          } else if (pkg.badge?.includes('VALUE') || pkg.badge?.includes('VIRAL')) {
            badgeBg = 'bg-rose-600 text-white';
            borderOutline = 'border-rose-500';
          } else if (pkg.badge?.includes('TRENDING') || pkg.badge?.includes('SECURE')) {
            badgeBg = 'bg-purple-600 text-white';
            borderOutline = 'border-purple-400';
          } else if (pkg.badge?.includes('INFLUENCER') || pkg.buttonColor === 'blue') {
            badgeBg = 'bg-blue-600 text-white';
            borderOutline = 'border-blue-500';
            btnColor = 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/30';
          } else if (pkg.badge?.includes('MEGA')) {
            badgeBg = 'bg-zinc-900 text-white';
            borderOutline = 'border-zinc-800';
          }

          if (isUnban) {
            btnColor = 'bg-purple-600 hover:bg-purple-700 shadow-purple-500/30';
            borderOutline = 'border-purple-300';
          }

          return (
            <div
              key={pkg.id}
              className={`relative bg-white rounded-3xl border-2 ${borderOutline} p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow text-center`}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span
                  className={`text-[10px] font-black uppercase tracking-wider px-4 py-0.5 rounded-full shadow-xs ${badgeBg}`}
                >
                  {pkg.badge || 'PACK'}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-zinc-950 mt-1">
                {pkg.name}
              </h3>

              <div className="my-3 flex items-center justify-center gap-2">
                <span className={`text-4xl sm:text-5xl font-black tracking-tight ${isUnban ? 'text-purple-600' : 'text-pink-600'}`}>
                  ₹{pkg.price}
                </span>
                <span className="text-xs text-zinc-400 line-through font-semibold">
                  ₹{pkg.originalPrice}
                </span>
              </div>

              <p className="text-xs text-zinc-600 max-w-sm mx-auto leading-relaxed mb-4">
                {pkg.description}
              </p>

              <div className="space-y-1.5 max-w-xs mx-auto mb-6 text-left">
                {pkg.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2 text-xs font-semibold text-zinc-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleBuyNow(pkg)}
                className={`btn-reflection w-full py-3.5 px-6 rounded-2xl font-black text-sm tracking-wide text-white flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] ${btnColor}`}
              >
                <span>{isUnban ? 'RECOVER ACCOUNT NOW' : 'BUY NOW'}</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          );
        })}
      </div>

      {/* ==================================================================== */}
      {/* 6. VERIFIED BUYER TESTIMONIALS */}
      {/* ==================================================================== */}
      <section className="py-12 bg-zinc-50/60 border-t border-zinc-200">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">
            <span>⭐</span> Customer Proof & Live Ratings
          </div>
          <h2 className="text-2xl font-black text-zinc-950 mb-1">
            Verified Buyer Testimonials
          </h2>
          <p className="text-xs text-zinc-500 mb-6">
            Real experiences from creators, brands, and influencers
          </p>

          <div className="space-y-4 text-left">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex text-amber-400 gap-0.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                    ✓ Verified Buyer
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-700 font-medium leading-relaxed mb-3">
                  "{t.comment}"
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-zinc-100 text-xs">
                  <div>
                    <span className="font-bold text-zinc-900">{t.name}</span>
                    <span className="text-zinc-400 text-[11px] ml-1">({t.city})</span>
                  </div>
                  <span className="text-[10px] font-semibold text-zinc-400">{t.servicePurchased}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      {/* ==================================================================== */}
      <section className="py-12 bg-white border-t border-zinc-100">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-black text-zinc-950 text-center mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-2.5">
            {FOLLOWERS_FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left font-bold text-xs sm:text-sm text-zinc-900 hover:text-pink-600"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-pink-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-zinc-600 leading-relaxed border-t border-zinc-100 pt-2.5">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 8. QUICK ORDER POPUP MODAL (Ultra-Premium Fintech Sheet) */}
      {/* ==================================================================== */}
      {selectedPackageForModal && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedPackageForModal(null);
              setModalError('');
              setIsSubmitting(false);
              restoreScroll();
            }
          }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/65 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-md w-full shadow-2xl border border-zinc-200/80 relative flex flex-col max-h-[92vh] overflow-hidden animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200">
            {/* Mobile drag handle pill */}
            <div className="w-10 h-1 bg-zinc-300 rounded-full mx-auto mt-2.5 sm:hidden shrink-0" />

            {/* Header: Package summary & close button */}
            <div className="px-5 pt-3 pb-3 border-b border-zinc-100 flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-white flex items-center justify-center font-black text-sm shadow-sm shrink-0">
                  ⚡
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-pink-100 text-pink-700">
                    {selectedPackageForModal.badge || 'CONFIRM ORDER'}
                  </span>
                  <h3 className="text-sm sm:text-base font-black text-zinc-950 truncate mt-0.5">
                    {selectedPackageForModal.name}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <div className="text-right">
                  <div className="text-xl sm:text-2xl font-black text-pink-600 leading-none">
                    ₹{selectedPackageForModal.price}
                  </div>
                  <div className="text-[10px] text-zinc-400 line-through mt-0.5">
                    ₹{selectedPackageForModal.originalPrice}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPackageForModal(null);
                    setModalError('');
                    setIsSubmitting(false);
                    restoreScroll();
                  }}
                  className="text-zinc-400 hover:text-zinc-700 p-1.5 rounded-full hover:bg-zinc-100 transition-colors ml-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 3-Pill Trust Bar (High credibility, compact height) */}
            <div className="grid grid-cols-3 gap-1 px-4 py-2 bg-emerald-50/70 border-b border-emerald-100 text-center shrink-0">
              <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-emerald-800">
                <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-500 shrink-0" />
                <span>60s Auto-Start</span>
              </div>
              <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-zinc-700 border-x border-emerald-200/60">
                <Lock className="w-3 h-3 text-zinc-600 shrink-0" />
                <span>No Password</span>
              </div>
              <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-zinc-700">
                <ShieldCheck className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>100% Non-Drop</span>
              </div>
            </div>

            {/* Form Fields: Scrollable Area */}
            <form onSubmit={handleProceedToPayment} className="flex flex-col flex-1 min-h-0 overflow-hidden">
              <div className="p-4 sm:p-5 overflow-y-auto space-y-3.5 flex-1">
                {modalError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{modalError}</span>
                  </div>
                )}

                {/* 1. Target Profile Link / Username */}
                <div>
                  <label className="block text-xs font-bold text-zinc-800 mb-1">
                    Target Profile URL / Username <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex items-center rounded-xl border border-zinc-300 bg-zinc-50/60 focus-within:border-pink-500 focus-within:ring-2 focus-within:ring-pink-200 focus-within:bg-white transition-all overflow-hidden shadow-xs">
                    <div className="pl-3.5 pr-1.5 text-zinc-400 font-bold text-sm shrink-0 select-none">
                      @
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="username ya link paste karein"
                      value={targetUsername}
                      onChange={(e) => setTargetUsername(e.target.value)}
                      className="w-full pr-3.5 py-2.5 bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 border-none outline-none focus:outline-none focus:ring-0 ring-0"
                    />
                  </div>
                  <p className="text-[10px] text-zinc-400 mt-1 flex items-center gap-1">
                    <span>🔒</span> Public account only • Password bilkul nahi chahiye
                  </p>
                </div>

                {/* 2. WhatsApp Mobile Number */}
                <div>
                  <label className="block text-xs font-bold text-zinc-800 mb-1">
                    WhatsApp Mobile Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex items-center rounded-xl border border-zinc-300 bg-zinc-50/60 focus-within:border-pink-500 focus-within:ring-2 focus-within:ring-pink-200 focus-within:bg-white transition-all overflow-hidden shadow-xs">
                    <div className="px-3 py-2.5 bg-zinc-100 border-r border-zinc-200 text-xs font-bold text-zinc-700 flex items-center gap-1.5 shrink-0 select-none">
                      <span>🇮🇳</span>
                      <span>+91</span>
                    </div>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="10-digit WhatsApp number"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-3.5 py-2.5 bg-transparent text-sm font-medium tracking-wide text-zinc-900 placeholder:text-zinc-400 border-none outline-none focus:outline-none focus:ring-0 ring-0"
                    />
                  </div>
                  <p className="text-[10px] text-zinc-400 mt-1 flex items-center gap-1">
                    <span>📱</span> Order delivery update aur tracking status ke liye
                  </p>
                </div>

                {/* 3. Email (Dispute proof & Tax Invoice) */}
                <div>
                  <label className="block text-xs font-bold text-zinc-800 mb-1">
                    Email Address <span className="text-[11px] text-zinc-400 font-normal">(Optional for Tax Invoice)</span>
                  </label>
                  <div className="flex items-center rounded-xl border border-zinc-300 bg-zinc-50/60 focus-within:border-pink-500 focus-within:ring-2 focus-within:ring-pink-200 focus-within:bg-white transition-all overflow-hidden shadow-xs">
                    <div className="pl-3.5 pr-2 text-zinc-400 shrink-0 select-none">
                      <Mail className="w-4 h-4 text-zinc-400" />
                    </div>
                    <input
                      type="email"
                      placeholder="e.g. name@gmail.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full pr-3.5 py-2.5 bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 border-none outline-none focus:outline-none focus:ring-0 ring-0"
                    />
                  </div>
                  <p className="text-[10px] text-zinc-400 mt-1 flex items-center gap-1">
                    <span>📄</span> Computerized GST tax receipt is email par dispatch hogi
                  </p>
                </div>
              </div>

              {/* Bottom Sticky Action Footer */}
              <div className="p-4 bg-zinc-50 border-t border-zinc-100 shrink-0">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-reflection w-full py-3.5 px-6 rounded-2xl font-black text-sm tracking-wide text-white bg-gradient-to-r from-pink-500 via-rose-600 to-pink-600 hover:from-pink-600 hover:to-rose-700 shadow-lg shadow-pink-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Connecting Secure Gateway...
                    </span>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 fill-white shrink-0" />
                      <span>Pay ₹{selectedPackageForModal.price} • Instant 60s Start</span>
                      <ArrowRight className="w-4 h-4 stroke-[3] shrink-0" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-400 font-medium pt-2">
                  <span>🛡️ 256-Bit SSL</span>
                  <span>•</span>
                  <span>GPay / PhonePe / Paytm / UPI</span>
                  <span>•</span>
                  <span>100% Safe</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 9. FOOTER */}
      {/* ==================================================================== */}
      <footer className="mt-auto py-8 bg-zinc-900 text-zinc-400 text-xs text-center border-t border-zinc-800">
        <div className="max-w-2xl mx-auto px-4 space-y-3">
          <div className="flex items-center justify-center gap-2">
            <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center p-0.5 overflow-hidden">
              <img 
                src="/logo.png" 
                alt="Followers.blog Logo" 
                className="w-full h-full object-contain" 
              />
            </div>
            <span className="font-extrabold text-white text-base">Followers.blog</span>
          </div>
          <p className="text-[11px] text-zinc-500">
            Automated social growth infrastructure and creator acceleration services.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold pt-1">
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/refund" className="hover:text-white">Refund Policy</Link>
            <a href={telegramLink} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">
              ✈️ Telegram Support
            </a>
          </div>
          <p className="text-[10px] text-zinc-600 pt-2">
            © 2026 Followers.blog. All rights reserved.
          </p>
        </div>
      </footer>

      {/* ==================================================================== */}
      {/* 10. FIXED FLOATING LIVE ACTIVITY TOAST (BOTTOM-LEFT) */}
      {/* ==================================================================== */}
      {showActivity && (
        <div className="fixed bottom-4 left-3 right-3 sm:right-auto sm:left-4 z-40 max-w-xs sm:max-w-sm p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-zinc-200/90 shadow-2xl flex items-center gap-3 text-left animate-in fade-in slide-in-from-bottom-3 duration-300 pointer-events-none">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 text-sm shadow-xs">
            🛍️
          </div>
          <div className="text-[11px] leading-tight">
            <div className="font-bold text-zinc-900">
              {LIVE_ACTIVITY_SAMPLES[currentActivityIndex].name} from {LIVE_ACTIVITY_SAMPLES[currentActivityIndex].city}
            </div>
            <div className="text-zinc-500 text-[10px] mt-0.5">
              bought {LIVE_ACTIVITY_SAMPLES[currentActivityIndex].package} • {LIVE_ACTIVITY_SAMPLES[currentActivityIndex].time}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
