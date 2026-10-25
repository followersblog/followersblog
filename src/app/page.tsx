'use client';

import React, { useState } from 'react';
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
} from '@/data/courses';
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
} from 'lucide-react';

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
      </main>

      <Footer />
    </>
  );
}
