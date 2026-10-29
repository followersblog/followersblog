'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  COURSE_DETAILS,
  COURSE_MODULES,
  COURSE_BENEFITS,
  WHO_IS_THIS_FOR,
  WHATS_INCLUDED,
  COURSE_ADDONS,
  COURSE_FAQS,
  CREATOR_EDITING_TIERS,
  CreatorEditingTier,
} from '@/data/courses';
import { loadRazorpayScript } from '@/lib/load-razorpay';
import { loadCashfreeScript } from '@/lib/load-cashfree';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Video,
  Code2,
  Database,
  CreditCard,
  Rocket,
  ShieldCheck,
  ChevronDown,
  Layers,
  Zap,
  Globe,
  Terminal,
  Gift,
  HelpCircle,
  Film,
  Play,
  X,
  Lock,
  Mail,
  Phone,
  User,
  TrendingUp,
} from 'lucide-react';

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Creator Video Editing Modules Modal & Filter State
  const [selectedTierForModal, setSelectedTierForModal] = useState<CreatorEditingTier | null>(null);
  const [tierCategory, setTierCategory] = useState<'all' | 'starter' | 'viral' | 'vip'>('all');
  const [tierCustomerName, setTierCustomerName] = useState('');
  const [tierCustomerPhone, setTierCustomerPhone] = useState('');
  const [tierCustomerEmail, setTierCustomerEmail] = useState('');
  const [isTierSubmitting, setIsTierSubmitting] = useState(false);
  const [tierModalError, setTierModalError] = useState('');

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
    if (!selectedTierForModal) {
      restoreScroll();
    }
  }, [selectedTierForModal]);

  // Filter editing tiers by tab
  const filteredTiers = CREATOR_EDITING_TIERS.filter((tier) => {
    if (tierCategory === 'starter') return tier.price <= 99;
    if (tierCategory === 'viral') return tier.price >= 199 && tier.price <= 350;
    if (tierCategory === 'vip') return tier.price >= 500;
    return true;
  });

  const handleEnrollTier = async (e: React.FormEvent) => {
    e.preventDefault();
    setTierModalError('');

    if (!selectedTierForModal) return;

    const cleanPhone = tierCustomerPhone.replace(/\D/g, '').slice(-10);
    if (cleanPhone.length < 10) {
      setTierModalError('Kripya valid 10-digit mobile number daalein.');
      return;
    }

    setIsTierSubmitting(true);

    try {
      const displayName = tierCustomerName.trim() || 'Learner';
      const email = tierCustomerEmail.trim() || `${cleanPhone}@follower.blog`;

      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: selectedTierForModal.price,
          currency: 'INR',
          productType: 'tier',
          productId: selectedTierForModal.id,
          productName: selectedTierForModal.name,
          customerName: displayName,
          customerEmail: email,
          customerPhone: cleanPhone,
          targetUrl: 'home_tier_enrollment',
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.order_id) {
        throw new Error(data.error || 'Order generate nahi ho paya. Kripya punah prayas karein.');
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
        throw new Error('Payment gateway load nahi ho paya. Kripya connection check karein.');
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

      const options = {
        key: data.key_id || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_live_Ts8dDt5Uk6gpHC',
        amount: data.amount,
        currency: data.currency || 'INR',
        name: 'Followers.blog',
        description: selectedTierForModal.name,
        image: '/logo.png',
        order_id: data.order_id,
        callback_url: `${origin}/api/razorpay-callback?source=home`,
        redirect: false,
        prefill: {
          name: displayName,
          email: email,
          contact: `+91${cleanPhone}`,
        },
        theme: {
          color: '#2563EB',
        },
        modal: {
          ondismiss: () => {
            setIsTierSubmitting(false);
            setTierModalError('');
            restoreScroll();
          },
        },
        handler: async function (paymentResponse: any) {
          try {
            await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_signature: paymentResponse.razorpay_signature,
                receipt: data.receipt,
              }),
            });

            const successUrl = `/receipt?order_id=${encodeURIComponent(data.receipt)}&payment_id=${encodeURIComponent(paymentResponse.razorpay_payment_id || '')}&name=${encodeURIComponent(displayName)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(cleanPhone)}&amount=${encodeURIComponent(String(selectedTierForModal.price))}`;
            window.location.href = successUrl;
          } catch (e: any) {
            setTierModalError(e.message || 'Payment verification failed');
            setIsTierSubmitting(false);
            restoreScroll();
          }
        },
      };

      const rzpInstance = new (window as any).Razorpay(options);
      rzpInstance.on('payment.failed', function () {
        setIsTierSubmitting(false);
        restoreScroll();
      });
      rzpInstance.open();
      setTimeout(() => setIsTierSubmitting(false), 1200);
    } catch (err: any) {
      setTierModalError(err.message || 'Something went wrong.');
      setIsTierSubmitting(false);
      restoreScroll();
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-white">
        {/* ==================================================================== */}
        {/* HERO SECTION (WHITE PREMIUM THEME) */}
        {/* ==================================================================== */}
        <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 border-b border-zinc-100">
          {/* Subtle background ambient gradients (Soft blue/indigo, very light) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-50/70 via-indigo-50/30 to-transparent pointer-events-none -z-10 rounded-full blur-3xl" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs sm:text-sm font-semibold shadow-xs">
                <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
                <span>3-Hour Intensive Practical Workshop</span>
                <span className="hidden sm:inline text-blue-300">•</span>
                <span className="hidden sm:inline text-zinc-600 font-medium">Batch starting {COURSE_DETAILS.nextBatchDate}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-950 leading-[1.15]">
                AI Se Professional Website Banana Seekho —{' '}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
                  Sirf 3 Ghante Mein
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl text-zinc-600 font-normal leading-relaxed max-w-2xl mx-auto">
                AI tools aur practical workflow ki help se zero se ek professional, production-ready website build karna seekhiye. Kisi coding background ki zaroorat nahi.
              </p>

              {/* Pricing & CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/course/checkout"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-base text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/35 hover:-translate-y-0.5 transition-all"
                >
                  <span>Join Course — ₹1499</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <a
                  href="#course-curriculum"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-base text-zinc-700 bg-zinc-100 hover:bg-zinc-200 hover:text-zinc-900 transition-colors"
                >
                  <span>Course Details</span>
                  <ChevronDown className="w-4 h-4" />
                </a>
              </div>

              {/* Key Highlights Pill Row */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                  <Clock className="w-5 h-5 text-blue-600 shrink-0" />
                  <div>
                    <div className="text-xs font-medium text-zinc-500">Duration</div>
                    <div className="text-sm font-bold text-zinc-900">3 Hours Live</div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                  <Video className="w-5 h-5 text-indigo-600 shrink-0" />
                  <div>
                    <div className="text-xs font-medium text-zinc-500">Class Mode</div>
                    <div className="text-sm font-bold text-zinc-900">Live + Lifetime Rec</div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                  <Rocket className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <div className="text-xs font-medium text-zinc-500">Live Project</div>
                    <div className="text-sm font-bold text-zinc-900">Zero to Deployed</div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                  <ShieldCheck className="w-5 h-5 text-sky-600 shrink-0" />
                  <div>
                    <div className="text-xs font-medium text-zinc-500">Support</div>
                    <div className="text-sm font-bold text-zinc-900">Q&A + Community</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* CREATOR VIDEO EDITING & DIGITAL ASSET MASTERCLASS TIERS (₹49 - ₹600) */}
        {/* ==================================================================== */}
        <section id="editing-courses" className="py-20 bg-zinc-50/70 border-b border-zinc-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 tracking-wider uppercase bg-blue-100/70 px-3.5 py-1.5 rounded-full border border-blue-200">
                <Film className="w-3.5 h-3.5 text-blue-600" />
                <span>Modular Digital Creator Curriculum</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 mt-3 tracking-tight">
                Creator Video Editing & Digital Skills Masterclass Tiers
              </h2>
              <p className="text-zinc-600 mt-2 text-sm sm:text-base leading-relaxed">
                Mobile video editing presets, viral retention frameworks, aur commercial production toolkits — har creator stage ke liye step-by-step modular practical programs.
              </p>

              {/* Tier Filter Tabs */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setTierCategory('all')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    tierCategory === 'all'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200'
                  }`}
                >
                  All Tiers (₹49 - ₹600)
                </button>
                <button
                  type="button"
                  onClick={() => setTierCategory('starter')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    tierCategory === 'starter'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200'
                  }`}
                >
                  Starter Packs (₹49 - ₹99)
                </button>
                <button
                  type="button"
                  onClick={() => setTierCategory('viral')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    tierCategory === 'viral'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200'
                  }`}
                >
                  Viral Editing (₹199 - ₹350)
                </button>
                <button
                  type="button"
                  onClick={() => setTierCategory('vip')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    tierCategory === 'vip'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200'
                  }`}
                >
                  Agency & VIP (₹500 - ₹600)
                </button>
              </div>
            </div>

            {/* Editing Tiers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`bg-white rounded-3xl p-6 border flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-lg ${
                    tier.popular
                      ? 'border-2 border-blue-600 shadow-md shadow-blue-500/10 relative'
                      : 'border-zinc-200'
                  }`}
                >
                  <div>
                    {/* Top Level Pill & Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                        {tier.level}
                      </span>
                      {tier.badge && (
                        <span
                          className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                            tier.popular
                              ? 'bg-blue-600 text-white'
                              : 'bg-blue-50 text-blue-700 border border-blue-100'
                          }`}
                        >
                          {tier.badge}
                        </span>
                      )}
                    </div>

                    {/* Tier Name */}
                    <h3 className="font-extrabold text-zinc-950 text-base leading-snug mb-2">
                      {tier.name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-3xl font-black text-zinc-950">
                        ₹{tier.price}
                      </span>
                      <span className="text-xs text-zinc-400 line-through">
                        ₹{tier.originalPrice}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                        Save ₹{tier.originalPrice - tier.price}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                      {tier.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-6 border-t border-zinc-100 pt-3">
                      {tier.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[11px] text-zinc-700 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Enroll CTA */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTierForModal(tier);
                      setTierModalError('');
                    }}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      tier.popular
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/25'
                        : 'bg-zinc-900 hover:bg-zinc-800 text-white'
                    }`}
                  >
                    <span>Get Instant Access • ₹{tier.price}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Gateway & Banking Trust Banner */}
            <div className="mt-12 p-6 rounded-2xl bg-white border border-zinc-200 text-center max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-950 uppercase tracking-wider">
                    Instant Electronic Dispatch & Verified Tax Receipts
                  </h4>
                  <p className="text-[11px] text-zinc-500">
                    All digital programs include immediate digital asset access, video modules, and GST-compliant invoices.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg shrink-0">
                <span>🔒 256-Bit SSL Encrypted Checkout</span>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* PRACTICAL WORKFLOW PREVIEW */}
        {/* ==================================================================== */}
        <section className="py-16 bg-zinc-50 border-b border-zinc-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                End-To-End Architecture
              </span>
              <h2 className="text-3xl font-bold text-zinc-950 mt-3">
                Zero Se Live Website Tak Ka Real Workflow
              </h2>
              <p className="text-zinc-600 mt-2 text-sm sm:text-base">
                Bina kisi unnecessary theory ke, aap seekhenge industry ka practical AI workflow.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs relative">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center mb-4">
                  1
                </div>
                <h3 className="font-bold text-zinc-900 text-base mb-1">Planning & Wireframing</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Idea ko structure mein convert karna, high-converting sitemap aur page copy plan karna.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs relative">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center mb-4">
                  2
                </div>
                <h3 className="font-bold text-zinc-900 text-base mb-1">AI Prompt Engineering</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Antigravity AI aur LLM tools se production-grade Next.js + Tailwind UI components generate karna.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs relative">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center mb-4">
                  3
                </div>
                <h3 className="font-bold text-zinc-900 text-base mb-1">Supabase DB & Backend</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Cloud database connect karna, secure forms, authentication aur payment order flows handle karna.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs relative">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 font-bold flex items-center justify-center mb-4">
                  4
                </div>
                <h3 className="font-bold text-zinc-900 text-base mb-1">Live Vercel Deployment</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  GitHub repository se Vercel par 1-click CI/CD deploy karna aur custom domain attach karna.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* BENEFITS: IS COURSE KE BAAD AAP KYA KAR PAOGE? */}
        {/* ==================================================================== */}
        <section className="py-16 md:py-24 bg-white border-b border-zinc-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                Actionable Outcomes
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 mt-3">
                Is Course Ke Baad Aap Kya Kar Paoge?
              </h2>
              <p className="text-zinc-600 mt-2 text-base">
                Sirf videos dekhna nahi, balki independently real websites create karne ki capability hasil hogi.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {COURSE_BENEFITS.map((benefit, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-zinc-50/80 hover:bg-white border border-zinc-200 hover:border-blue-300 hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-zinc-900 text-base mb-2 group-hover:text-blue-600 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* COURSE CURRICULUM (10 MODULES) */}
        {/* ==================================================================== */}
        <section id="course-curriculum" className="py-16 md:py-24 bg-zinc-50 border-b border-zinc-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                10 Comprehensive Modules
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 mt-3">
                Class Curriculum & Roadmap
              </h2>
              <p className="text-zinc-600 mt-2 text-base">
                Step-by-step roadmap jo beginner level se production deployment tak guide karta hai.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {COURSE_MODULES.map((mod) => (
                <div
                  key={mod.number}
                  className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 font-extrabold text-xs flex items-center justify-center border border-blue-100 shrink-0">
                        {mod.number}
                      </span>
                      <h3 className="font-bold text-zinc-950 text-lg">
                        {mod.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-600 mb-4 leading-relaxed">
                    {mod.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-100">
                    {mod.topics.map((topic, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-700"
                      >
                        ✓ {topic}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* WHO THIS COURSE IS FOR */}
        {/* ==================================================================== */}
        <section className="py-16 md:py-24 bg-white border-b border-zinc-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                Target Audience
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 mt-3">
                Kiske Liye Hai Ye Practical Workshop?
              </h2>
              <p className="text-zinc-600 mt-2 text-base">
                Agar aap in categories mein se kisi ek mein aate hain, toh ye class aapke liye game-changer hogi.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {WHO_IS_THIS_FOR.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-zinc-300 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-blue-700 bg-blue-100/80 px-2.5 py-1 rounded-full">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="font-bold text-zinc-900 text-lg mb-2">
                    {item.role}
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* WHAT'S INCLUDED CHECKLIST */}
        {/* ==================================================================== */}
        <section className="py-16 bg-blue-50/50 border-b border-blue-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-blue-200/80 shadow-md">
              <div className="text-center max-w-2xl mx-auto mb-8">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  Full Package Breakdown
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 mt-2">
                  What's Included In ₹1499 Enrolment
                </h2>
                <p className="text-xs sm:text-sm text-zinc-600 mt-1">
                  Everything you need to successfully build and deploy your websites with AI.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {WHATS_INCLUDED.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-zinc-800">{item}</span>
                  </div>
                ))}
              </div>

              {/* Transparent Add-ons Note */}
              <div className="mt-8 pt-6 border-t border-zinc-200">
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">
                  Optional Add-Ons (Available on Checkout):
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {COURSE_ADDONS.map((addon) => (
                    <div key={addon.id} className="p-3 rounded-xl bg-blue-50/40 border border-blue-100">
                      <div className="flex items-center justify-between text-xs font-bold text-zinc-900 mb-1">
                        <span>{addon.name}</span>
                        <span className="text-blue-700 bg-blue-100 px-2 py-0.5 rounded">₹{addon.price}</span>
                      </div>
                      <p className="text-[11px] text-zinc-600 leading-tight">
                        {addon.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* PRICING CARD SECTION (HONEST & CONVERSION-FOCUSED) */}
        {/* ==================================================================== */}
        <section className="py-20 bg-white border-b border-zinc-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Straightforward Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 mt-3 mb-4">
              Invest In Practical AI Skills Today
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base max-w-xl mx-auto mb-10">
              No hidden fees, no monthly subscriptions. Ek transparent one-time payment aur complete access.
            </p>

            <div className="max-w-lg mx-auto bg-white rounded-3xl border-2 border-blue-600 p-8 sm:p-10 shadow-xl shadow-blue-500/10 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-[11px] font-extrabold tracking-wider uppercase px-4 py-1.5 rounded-bl-xl">
                Limited Batch
              </div>

              <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                Practical Live Workshop
              </div>
              <h3 className="text-2xl font-bold text-zinc-950 mb-3">
                AI Website Building — 3 Hour Class
              </h3>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-5xl font-black text-zinc-950 tracking-tight">
                  ₹1499
                </span>
                <span className="text-lg text-zinc-400 line-through font-semibold">
                  ₹3999
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Save ₹2500
                </span>
              </div>

              <ul className="space-y-3 mb-8 text-sm text-zinc-700">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>3-Hour intensive live session with instructor</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Permanent recording access for future reference</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Complete source code & prompt templates</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Supabase & Cashfree integration patterns</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Vercel deployment & custom domain guidance</span>
                </li>
              </ul>

              <Link
                href="/course/checkout"
                className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-base text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/30 transition-all"
              >
                <span>Join Course — ₹1499</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-zinc-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Secure Checkout with Instant Confirmation</span>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* FAQS SECTION */}
        {/* ==================================================================== */}
        <section id="faq" className="py-16 md:py-24 bg-zinc-50 border-b border-zinc-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                FAQ
              </span>
              <h2 className="text-3xl font-extrabold text-zinc-950 mt-3">
                Frequently Asked Questions
              </h2>
              <p className="text-zinc-600 mt-2 text-sm sm:text-base">
                Class aur syllabus se jude aam sawal aur unke jawab.
              </p>
            </div>

            <div className="space-y-3">
              {COURSE_FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl border border-zinc-200 overflow-hidden transition-all shadow-xs"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full flex items-center justify-between p-5 text-left font-bold text-base text-zinc-900 hover:text-blue-600"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-zinc-400 transition-transform ${isOpen ? 'rotate-180 text-blue-600' : ''}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 pt-3">
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
        {/* FINAL CALL TO ACTION */}
        {/* ==================================================================== */}
        <section className="py-20 bg-gradient-to-b from-white to-blue-50/50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-950 tracking-tight">
              Ready To Build Your First AI-Powered Website?
            </h2>
            <p className="text-base sm:text-lg text-zinc-600 max-w-xl mx-auto">
              Join hundreds of creators and builders who have learned to deploy full-stack websites in hours.
            </p>
            <div className="pt-2">
              <Link
                href="/course/checkout"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-base text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30 hover:-translate-y-0.5 transition-all"
              >
                <span>Enroll Now — ₹1499</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Enrolment Modal for Video Editing & Creator Tiers */}
        {selectedTierForModal && (
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedTierForModal(null);
                setTierModalError('');
                setIsTierSubmitting(false);
                restoreScroll();
              }
            }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200"
          >
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 text-left shadow-2xl border border-zinc-200 relative animate-in zoom-in-95 duration-200">
              <button
                type="button"
                onClick={() => {
                  setSelectedTierForModal(null);
                  setTierModalError('');
                  setIsTierSubmitting(false);
                  restoreScroll();
                }}
                className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 p-1.5 rounded-full hover:bg-zinc-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100 uppercase">
                  {selectedTierForModal.level}
                </span>
                <span className="text-xs font-black text-blue-600">₹{selectedTierForModal.price}</span>
              </div>

              <h3 className="text-lg font-bold text-zinc-950 mb-1 leading-snug">
                {selectedTierForModal.name}
              </h3>
              <p className="text-xs text-zinc-500 mb-5">
                Instant digital download + video curriculum access via email/WhatsApp.
              </p>

              {tierModalError && (
                <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                  {tierModalError}
                </div>
              )}

              <form onSubmit={handleEnrollTier} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={tierCustomerName}
                    onChange={(e) => setTierCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-xs text-zinc-900 focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    WhatsApp Mobile Number
                  </label>
                  <div className="flex items-center rounded-xl border border-zinc-300 overflow-hidden">
                    <span className="px-3 py-2.5 bg-zinc-100 text-xs font-bold text-zinc-600 border-r border-zinc-200 select-none">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      value={tierCustomerPhone}
                      onChange={(e) => setTierCustomerPhone(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-3.5 py-2.5 text-xs text-zinc-900 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    Email Address (For Tax Receipt & Credentials)
                  </label>
                  <input
                    type="email"
                    placeholder="name@gmail.com"
                    value={tierCustomerEmail}
                    onChange={(e) => setTierCustomerEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-xs text-zinc-900 focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isTierSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isTierSubmitting ? (
                      <span>Connecting Gateway...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Pay ₹{selectedTierForModal.price} • Instant Access</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center text-[10px] text-zinc-400 pt-1 flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  <span>256-Bit SSL Encrypted • GST Compliant Tax Receipt Included</span>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
