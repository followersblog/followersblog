'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  CheckCircle2,
  Clock,
  Send,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Layers,
  Sparkles,
  Info,
  X,
  FileText,
} from 'lucide-react';

function FollowersSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id') || 'SMM-2026-ACTIVE';

  // Section 19 Requirement: SMM Processing Modal
  const [showTrafficModal, setShowTrafficModal] = useState(true);

  const telegramLink = process.env.NEXT_PUBLIC_TELEGRAM_SUPPORT_URL || 'https://t.me/FollowersBlogSupport';

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-16 text-center font-sans">
      {/* ==================================================================== */}
      {/* SECTION 19 SMM SUCCESS POPUP / MODAL (CRITICAL REQUIREMENT) */}
      {/* ==================================================================== */}
      {showTrafficModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 text-center shadow-2xl border border-zinc-200 relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowTrafficModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 p-1.5 rounded-full hover:bg-zinc-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Warning / Traffic Icon */}
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 stroke-[2.5]" />
            </div>

            <h3 className="text-xl font-black text-zinc-950 mb-3">
              Order Received Successfully!
            </h3>

            {/* Prompt exact text from section 19 */}
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200/80 mb-5 text-left space-y-2.5">
              <p className="text-xs sm:text-sm font-semibold text-amber-900 leading-relaxed">
                “High traffic ki wajah se aapke order ko process hone mein thoda extra time lag sakta hai. Kripya wait karein.”
              </p>
              <div className="pt-2 border-t border-amber-200/60 flex items-center gap-2 text-xs font-bold text-amber-800">
                <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Estimated processing time: 24–120 hours.</span>
              </div>
            </div>

            {/* Modal Buttons */}
            <div className="space-y-2">
              <button
                onClick={() => setShowTrafficModal(false)}
                className="w-full py-3.5 px-6 rounded-2xl font-black text-sm text-white bg-pink-600 hover:bg-pink-700 shadow-md shadow-pink-500/25 transition-all"
              >
                Got it
              </button>
              <button
                onClick={() => setShowTrafficModal(false)}
                className="w-full py-3 px-6 rounded-2xl font-bold text-xs text-zinc-600 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200 transition-colors"
              >
                View My Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Badge */}
      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
        <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
      </div>

      <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
        Order Confirmed
      </span>

      <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 mt-2 mb-2">
        Service Order In Queue ⚡
      </h1>
      <p className="text-xs text-zinc-500 max-w-md mx-auto mb-6">
        Aapka order system mein register ho gaya hai aur automated queue mein add kar diya gaya hai.
      </p>

      {/* Order Status Card */}
      <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-8 shadow-xs text-left mb-6 space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
          <div>
            <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Order ID</div>
            <div className="text-base font-mono font-black text-zinc-900">{orderId}</div>
          </div>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            In Queue (24-120 Hrs)
          </span>
        </div>

        {/* Timeline */}
        <div className="space-y-3 pt-1">
          <div className="text-xs font-bold text-zinc-800 uppercase tracking-wider">
            Order Timeline
          </div>
          <div className="space-y-3 text-xs pl-2 border-l-2 border-pink-400">
            <div className="relative pl-4">
              <span className="absolute -left-[13px] top-1 w-2.5 h-2.5 rounded-full bg-pink-500 ring-4 ring-white" />
              <div className="font-bold text-zinc-900">Order Placed & Verified</div>
              <div className="text-[11px] text-zinc-400">Payment captured via gateway</div>
            </div>
            <div className="relative pl-4">
              <span className="absolute -left-[13px] top-1 w-2.5 h-2.5 rounded-full bg-amber-400 ring-4 ring-white" />
              <div className="font-bold text-zinc-900">Queue Assigned</div>
              <div className="text-[11px] text-zinc-400">Target URL validated for safe drip-feed</div>
            </div>
            <div className="relative pl-4 opacity-50">
              <span className="absolute -left-[13px] top-1 w-2.5 h-2.5 rounded-full bg-zinc-300 ring-4 ring-white" />
              <div className="font-bold text-zinc-700">Service Completion</div>
              <div className="text-[11px] text-zinc-400">Estimated within 24–120 hours window</div>
            </div>
          </div>
        </div>

        {/* High Traffic Information Notice */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-left space-y-1">
          <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-amber-700" />
            <span>Important Delivery Notice</span>
          </div>
          <p className="text-[11px] text-amber-800 leading-relaxed">
            Order natural drip-feed pace par start hota hai taaki kisi social algorithm ko trigger na kare. Kripya process hone tak account ko private mat kariyega.
          </p>
        </div>

        {/* Telegram Direct Support Link */}
        <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-between gap-3 text-left">
          <div>
            <div className="text-xs font-bold text-sky-950">Telegram Priority Status</div>
            <div className="text-[11px] text-sky-800">Order ID share karke live update le sakte hain.</div>
          </div>
          <a
            href={telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-xl text-xs font-bold text-white bg-sky-500 hover:bg-sky-600 shrink-0 flex items-center gap-1 shadow-xs"
          >
            <Send className="w-3.5 h-3.5 fill-white" />
            <span>Support</span>
          </a>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href={`/receipt?order_id=${orderId}`}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-zinc-800 bg-white border border-zinc-300 hover:bg-zinc-50 transition-all shadow-xs"
        >
          <FileText className="w-4 h-4 text-blue-600" />
          <span>Tax Invoice & Receipt</span>
        </Link>
        <Link
          href="/dashboard"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-black text-xs sm:text-sm text-white bg-zinc-950 hover:bg-zinc-800 transition-all shadow-md"
        >
          <span>Track in My Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/followers"
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-zinc-700 bg-zinc-100 hover:bg-zinc-200 transition-colors"
        >
          Explore More Services
        </Link>
      </div>
    </div>
  );
}

export default function FollowersSuccessPage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <header className="border-b border-zinc-200 bg-white py-4 px-6 text-center">
        <Link href="/followers" className="font-black text-lg text-zinc-950">
          Followers<span className="text-pink-600">.blog</span>
        </Link>
      </header>

      <Suspense fallback={<div className="text-center py-20">Loading order...</div>}>
        <FollowersSuccessContent />
      </Suspense>
    </div>
  );
}
