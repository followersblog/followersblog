'use client';

import React, { useState, useEffect } from 'react';
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
  Crown,
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
      {/* 1. TOP FLASH SALE BANNER */}
      {/* ==================================================================== */}
      <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white text-[11px] sm:text-xs font-bold py-2 px-3 text-center flex items-center justify-center gap-2 tracking-wide shadow-sm">
        <span className="uppercase">⚡ Special Flash Sale | 70% Off All Packages • 100% Non-Drop & 30-Day Auto Refill •</span>
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
                  className="w-full py-4 px-6 rounded-2xl font-black text-sm tracking-wide text-zinc-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
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

              {/* Live Activity Toast */}
              {idx === 0 && showActivity && (
                <div className="my-3 mx-auto max-w-xs p-2 rounded-xl bg-white border border-zinc-200 shadow-sm flex items-center gap-2.5 text-left animate-in fade-in duration-300">
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

              <button
                onClick={() => handleBuyNow(pkg)}
                className={`w-full py-3.5 px-6 rounded-2xl font-black text-sm tracking-wide text-white flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] ${btnColor}`}
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
                  placeholder="e.g. @your_username ya post/reel link"
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
      {/* 9. FOOTER */}
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
