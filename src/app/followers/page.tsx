'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  SOCIAL_CATEGORIES,
  YOUTUBE_SUBCATEGORIES,
  SOCIAL_PACKAGES,
  TESTIMONIALS,
  FOLLOWERS_FAQS,
  LIVE_ACTIVITY_SAMPLES,
} from '@/data/followers-services';
import { SocialServicePackage } from '@/types';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Send,
  Star,
  ChevronDown,
  Clock,
  Shield,
  Zap,
  Lock,
  Flame,
  AlertCircle,
  X,
} from 'lucide-react';

export default function FollowersPage() {
  const router = useRouter();

  // Active Category state
  const [selectedCategory, setSelectedCategory] = useState<string>('youtube');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('views');

  // Flash Sale Timer countdown (e.g. 12:12)
  const [timeLeft, setTimeLeft] = useState({ minutes: 12, seconds: 12 });

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
    }, 6000);
    return () => clearInterval(activityTimer);
  }, []);

  // Filter packages based on active category & subcategory
  const filteredPackages = SOCIAL_PACKAGES.filter((pkg) => {
    if (pkg.categoryId !== selectedCategory) return false;
    if (selectedCategory === 'youtube' && pkg.subCategoryId !== selectedSubCategory) {
      return false;
    }
    return true;
  });

  const telegramLink = process.env.NEXT_PUBLIC_TELEGRAM_SUPPORT_URL || 'https://t.me/FollowersBlogSupport';

  const handleBuyNow = (pkg: SocialServicePackage) => {
    setSelectedPackageForModal(pkg);
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPackageForModal || !targetUsername || !customerName || !customerPhone) {
      alert('Kripya apna Naam, Phone aur Target URL / Username daaliye.');
      return;
    }

    setIsSubmitting(true);

    // Save order data in sessionStorage for checkout and proceed
    const orderData = {
      packageId: selectedPackageForModal.id,
      packageName: selectedPackageForModal.name,
      amount: selectedPackageForModal.price,
      quantity: selectedPackageForModal.quantity,
      category: selectedPackageForModal.categoryId,
      target: targetUsername,
      customerName,
      customerEmail: customerEmail || `${customerPhone}@followers.blog`,
      customerPhone,
    };

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('followers_order', JSON.stringify(orderData));
    }

    router.push(`/followers/checkout?packageId=${selectedPackageForModal.id}`);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans">
      {/* ==================================================================== */}
      {/* 1. TOP FLASH SALE BANNER (Exact style from screenshots) */}
      {/* ==================================================================== */}
      <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white text-[11px] sm:text-xs font-bold py-2 px-3 text-center flex items-center justify-center gap-2 tracking-wide shadow-sm">
        <span className="uppercase">Special Flash Sale | 70% Off All Packages • 100% Non-Drop & 30-Day Auto Refill •</span>
        <span className="inline-flex items-center gap-1 bg-black/30 px-2 py-0.5 rounded-full font-mono text-[11px]">
          <Clock className="w-3.5 h-3.5 text-yellow-300" />
          {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
        </span>
      </div>

      {/* ==================================================================== */}
      {/* 2. BRAND HEADER WITH TELEGRAM SUPPORT BUTTON */}
      {/* ==================================================================== */}
      <header className="border-b border-zinc-100 bg-white sticky top-0 z-40 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xl font-black tracking-tight text-zinc-950">
                  FOLLOWERS<span className="text-pink-600">.BLOG</span>
                </span>
                <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1 rounded">IN</span>
              </div>
              <p className="text-[9px] text-zinc-400 font-semibold uppercase tracking-wider -mt-0.5">
                #1 Premium Social Growth & AI Hub
              </p>
            </div>
          </Link>

          {/* Telegram Support Button (Exact style from screenshots) */}
          <a
            href={telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-sky-500 hover:bg-sky-600 shadow-sm shadow-sky-500/30 transition-all hover:scale-105"
          >
            <Send className="w-3.5 h-3.5 fill-white" />
            <span>Telegram Support</span>
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
            onClick={() => setSelectedCategory('instagram')}
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
            onClick={() => setSelectedCategory('unban')}
            className={`py-3 px-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border transition-all ${
              selectedCategory === 'unban'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-transparent shadow-md shadow-amber-500/25'
                : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300'
            }`}
          >
            <span className="text-base">🔥</span>
            <span>Insta ID Unban</span>
          </button>

          {/* YouTube */}
          <button
            onClick={() => setSelectedCategory('youtube')}
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
            onClick={() => setSelectedCategory('facebook')}
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
            onClick={() => setSelectedCategory('telegram')}
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
      {/* 4. WELCOME CARD & SUB-TABS (Per Category) */}
      {/* ==================================================================== */}
      <div className="max-w-2xl mx-auto px-4 py-3 w-full">
        <div className="bg-white rounded-2xl border border-zinc-200 p-5 text-center shadow-xs">
          {selectedCategory === 'youtube' && (
            <>
              <h2 className="text-lg font-extrabold text-zinc-950 flex items-center justify-center gap-2">
                Welcome to YouTube Growth 🚀
              </h2>
              <p className="text-xs text-zinc-500 mt-1 max-w-md mx-auto leading-relaxed">
                Buy YouTube services instantly. Indian subscribers, watch time, views & likes with safe delivery. Creator-friendly services for channel growth.
              </p>

              {/* YouTube Sub-Tabs (Subscribers, Watch Time, Views, Likes) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-3 border-t border-zinc-100">
                {YOUTUBE_SUBCATEGORIES.map((sub) => {
                  const isActive = selectedSubCategory === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedSubCategory(sub.id)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-sm shadow-pink-500/30'
                          : 'bg-zinc-50 text-zinc-700 hover:bg-zinc-100'
                      }`}
                    >
                      <span>{sub.icon}</span>
                      <span>{sub.name}</span>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {selectedCategory === 'facebook' && (
            <>
              <h2 className="text-lg font-extrabold text-zinc-950 flex items-center justify-center gap-2">
                Facebook Services 👥
              </h2>
              <p className="text-xs text-zinc-500 mt-1 max-w-md mx-auto leading-relaxed">
                Grow your Facebook Page with Indian likes and followers. Choose a package below for quick safe delivery and reliable service.
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                <span>👍</span> Page Likes & Followers
              </div>
            </>
          )}

          {selectedCategory === 'telegram' && (
            <>
              <h2 className="text-lg font-extrabold text-zinc-950 flex items-center justify-center gap-2">
                Telegram Services 📱
              </h2>
              <p className="text-xs text-zinc-500 mt-1 max-w-md mx-auto leading-relaxed">
                Grow your Telegram channel or group with Indian members. Choose a package below for quick safe delivery and reliable service.
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-50 text-sky-700 text-xs font-bold border border-sky-100">
                <span>👥</span> Indian Members
              </div>
            </>
          )}

          {selectedCategory === 'instagram' && (
            <>
              <h2 className="text-lg font-extrabold text-zinc-950 flex items-center justify-center gap-2">
                Instagram Growth Hub 📸
              </h2>
              <p className="text-xs text-zinc-500 mt-1 max-w-md mx-auto leading-relaxed">
                High quality Indian active profile followers with natural drip-feed delivery. Non-drop and 30-day auto refill guaranteed.
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-50 text-pink-700 text-xs font-bold border border-pink-100">
                <span>⚡</span> Non-Drop Active Followers
              </div>
            </>
          )}

          {selectedCategory === 'unban' && (
            <>
              <h2 className="text-lg font-extrabold text-zinc-950 flex items-center justify-center gap-2">
                Instagram ID Unban & Recovery Hub 🛡️
              </h2>
              <p className="text-xs text-zinc-500 mt-1 max-w-md mx-auto leading-relaxed">
                21 din se suspended ya disabled account? Hum official Meta compliance and ticket escalation appeals file karte hain. 95%+ success rate.
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-100">
                <span>🔥</span> Priority Fast-Track Case Escalation
              </div>
            </>
          )}
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 5. SERVICE PACKAGE CARDS (Exact match to screenshot cards) */}
      {/* ==================================================================== */}
      <div className="max-w-2xl mx-auto px-4 py-4 w-full space-y-6">
        {filteredPackages.map((pkg, idx) => {
          // Dynamic badge colors from screenshot
          let badgeBg = 'bg-amber-400 text-zinc-950';
          let borderOutline = 'border-amber-400';
          if (pkg.badge === 'POPULAR') {
            badgeBg = 'bg-emerald-500 text-white';
            borderOutline = 'border-emerald-500';
          } else if (pkg.badge === 'HOT') {
            badgeBg = 'bg-amber-500 text-white';
            borderOutline = 'border-sky-400';
          } else if (pkg.badge === 'BEST DEAL') {
            badgeBg = 'bg-amber-500 text-white';
            borderOutline = 'border-rose-500';
          } else if (pkg.badge === 'OFFER') {
            badgeBg = 'bg-amber-400 text-zinc-950';
            borderOutline = 'border-rose-500';
          }

          // Button gradient styling
          const isBlueBtn = pkg.buttonColor === 'blue';
          const btnClasses = isBlueBtn
            ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/30'
            : 'bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 shadow-pink-500/30';

          return (
            <div
              key={pkg.id}
              className={`relative bg-white rounded-3xl border-2 ${borderOutline} p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow text-center`}
            >
              {/* Badge Centered on Top Border */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span
                  className={`text-[10px] font-black uppercase tracking-wider px-4 py-0.5 rounded-full shadow-xs ${badgeBg}`}
                >
                  {pkg.badge || 'PACK'}
                </span>
              </div>

              {/* Package Name */}
              <h3 className="text-xl sm:text-2xl font-black text-zinc-950 mt-1">
                {pkg.name}
              </h3>

              {/* Price Row */}
              <div className="my-3 flex items-center justify-center gap-2">
                <span className="text-4xl sm:text-5xl font-black text-pink-600 tracking-tight">
                  ₹{pkg.price}
                </span>
                <span className="text-xs text-zinc-400 line-through font-semibold">
                  ₹{pkg.originalPrice}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-zinc-600 max-w-sm mx-auto leading-relaxed mb-4">
                {pkg.description}
              </p>

              {/* Features List */}
              <div className="space-y-1.5 max-w-xs mx-auto mb-6 text-left">
                {pkg.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2 text-xs font-semibold text-zinc-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Floating Live Activity Toast on specific card (matches screenshot) */}
              {idx === 0 && showActivity && (
                <div className="my-3 mx-auto max-w-xs p-2 rounded-xl bg-white border border-zinc-200 shadow-sm flex items-center gap-2.5 text-left animate-in fade-in slide-in-from-bottom-1 duration-300">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 text-xs">
                    🛍️
                  </div>
                  <div className="text-[11px] leading-tight">
                    <div className="font-bold text-zinc-900">
                      {LIVE_ACTIVITY_SAMPLES[currentActivityIndex].name} from {LIVE_ACTIVITY_SAMPLES[currentActivityIndex].city}
                    </div>
                    <div className="text-zinc-500 text-[10px]">
                      bought {LIVE_ACTIVITY_SAMPLES[currentActivityIndex].package} • {LIVE_ACTIVITY_SAMPLES[currentActivityIndex].time}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Button */}
              <button
                onClick={() => handleBuyNow(pkg)}
                className={`w-full py-3.5 px-6 rounded-2xl font-black text-sm tracking-wide text-white flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] ${btnClasses}`}
              >
                <span>BUY NOW</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          );
        })}
      </div>

      {/* ==================================================================== */}
      {/* 6. VERIFIED BUYER TESTIMONIALS (From Screenshots) */}
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
      {/* 7. FREQUENTLY ASKED QUESTIONS (From Screenshots) */}
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
      {/* 8. QUICK ORDER POPUP MODAL */}
      {/* ==================================================================== */}
      {selectedPackageForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-zinc-200 relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedPackageForModal(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 p-1 rounded-full hover:bg-zinc-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-4">
              <span className="text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full bg-pink-100 text-pink-700">
                {selectedPackageForModal.badge || 'CONFIRM ORDER'}
              </span>
              <h3 className="text-xl font-black text-zinc-950 mt-1">
                {selectedPackageForModal.name}
              </h3>
              <div className="text-2xl font-black text-pink-600 mt-1">
                ₹{selectedPackageForModal.price}{' '}
                <span className="text-xs text-zinc-400 line-through">₹{selectedPackageForModal.originalPrice}</span>
              </div>
            </div>

            <form onSubmit={handleProceedToPayment} className="space-y-3.5 text-left">
              <div>
                <label className="block text-xs font-bold text-zinc-800 mb-1">
                  Target Profile URL / Username / Link *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. @your_username ya post/channel link"
                  value={targetUsername}
                  onChange={(e) => setTargetUsername(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm focus:outline-hidden focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
                />
                <p className="text-[10px] text-zinc-400 mt-1">
                  🔒 Password ki zaroorat nahi hai. Sirf public username ya link dijiye.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-800 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Aapka Poora Naam"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm focus:outline-hidden focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-800 mb-1">
                  Mobile / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit Mobile Number"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm focus:outline-hidden focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-800 mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="Order receipt ke liye"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm focus:outline-hidden focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
                />
              </div>

              {/* Order Notice */}
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px] leading-tight">
                ⚡ High traffic ke dauran delivery 24-120 hours ke andar safely complete ho jati hai. 100% non-drop guaranteed.
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-2xl font-black text-sm tracking-wide text-white bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 shadow-md shadow-pink-500/30 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <span>Proceed To Payment — ₹{selectedPackageForModal.price}</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 9. BOTTOM BAR / FOOTER FOR /followers */}
      {/* ==================================================================== */}
      <footer className="mt-auto py-8 bg-zinc-900 text-zinc-400 text-xs text-center border-t border-zinc-800">
        <div className="max-w-2xl mx-auto px-4 space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="font-extrabold text-white text-base">Followers.blog</span>
          </div>
          <p className="text-[11px] text-zinc-500">
            Automated social growth infrastructure and creator acceleration services.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold pt-1">
            <Link href="/" className="hover:text-white">AI Course</Link>
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
    </div>
  );
}
