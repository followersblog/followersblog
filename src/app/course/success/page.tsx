'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { COURSE_DETAILS } from '@/data/courses';
import {
  CheckCircle2,
  Calendar,
  Clock,
  Video,
  ArrowRight,
  Sparkles,
  Download,
  ShieldCheck,
  Send,
} from 'lucide-react';

function CourseSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id') || 'CRS-2026-CONFIRMED';

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center">
      {/* Success Badge */}
      <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md shadow-emerald-500/10">
        <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
      </div>

      <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
        Enrolment Confirmed
      </span>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 mt-3 mb-2">
        Payment Successful 🎉
      </h1>
      <p className="text-sm text-zinc-600 max-w-lg mx-auto mb-8">
        Congratulations! Aapka slot successfully reserve ho gaya hai. Class access details neeche diye gaye hain.
      </p>

      {/* Order Details Card */}
      <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-8 shadow-xs text-left mb-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-zinc-100 gap-2">
          <div>
            <div className="text-xs text-zinc-400 font-semibold uppercase">Order Reference ID</div>
            <div className="text-base font-mono font-bold text-zinc-900">{orderId}</div>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Verified Paid
          </span>
        </div>

        {/* Course Details */}
        <div className="space-y-3">
          <div className="text-xs text-zinc-400 font-semibold uppercase">Enrolled Course</div>
          <div className="text-lg font-bold text-zinc-950">{COURSE_DETAILS.name}</div>
          <p className="text-xs text-zinc-600">
            3-Hour live interactive class covering AI planning, Antigravity AI coding, Supabase integration, and live deployment.
          </p>
        </div>

        {/* Webinar Schedule Box */}
        <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 text-left space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Class Joining Information</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2 text-zinc-800">
              <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
              <span><strong>Date:</strong> {COURSE_DETAILS.nextBatchDate}</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-800">
              <Clock className="w-4 h-4 text-blue-600 shrink-0" />
              <span><strong>Time:</strong> {COURSE_DETAILS.nextBatchTime}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-blue-200/60 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-blue-950 font-semibold">
              <Video className="w-4 h-4 text-blue-700" />
              <span>Google Meet / Zoom Live Session</span>
            </div>
            <a
              href="https://meet.google.com/followers-blog-live-class"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors text-center shadow-xs"
            >
              Access Classroom Link
            </a>
          </div>
        </div>

        {/* Telegram Community */}
        <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-between gap-4 text-left">
          <div>
            <div className="text-xs font-bold text-sky-950">Student Telegram Group</div>
            <p className="text-[11px] text-sky-800 mt-0.5">
              Class updates, prompt files aur Q&A support ke liye join karein.
            </p>
          </div>
          <a
            href={process.env.NEXT_PUBLIC_TELEGRAM_SUPPORT_URL || 'https://t.me/FollowersBlogSupport'}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-sky-500 hover:bg-sky-600 shrink-0 flex items-center gap-1.5 shadow-xs"
          >
            <Send className="w-3.5 h-3.5 fill-white" />
            <span>Join Group</span>
          </a>
        </div>
      </div>

      {/* Action CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-zinc-900 hover:bg-zinc-800 shadow-md transition-all"
        >
          <span>Back to Home</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default function CourseSuccessPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-zinc-50/60">
        <Suspense fallback={<div className="text-center py-20">Loading order status...</div>}>
          <CourseSuccessContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
