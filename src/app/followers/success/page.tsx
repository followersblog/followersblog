'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Clock, X } from 'lucide-react';
import { event } from '@/lib/meta-pixel';

function FollowersSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id') || 'SMM-2026-ACTIVE';
  const paramAmount = searchParams.get('amount') || '';
  const paramName = searchParams.get('name') || '';
  const paramEmail = searchParams.get('email') || '';
  const paramPhone = searchParams.get('phone') || '';
  const fromParam = searchParams.get('from') || '';

  const [sessionOrder, setSessionOrder] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('followers_order');
      if (saved) {
        try {
          setSessionOrder(JSON.parse(saved));
        } catch (e) {}
      }
    }
  }, []);

  const activeAmount = paramAmount || (sessionOrder?.amount !== undefined ? String(sessionOrder.amount) : '1');

  // Meta Pixel: Track 100% REAL Verified Purchase (Guard against duplicate firing on page refresh)
  useEffect(() => {
    if (typeof window !== 'undefined' && orderId) {
      const firedKey = `fb_purchase_fired_${orderId}`;
      const alreadyFired = sessionStorage.getItem(firedKey);

      if (!alreadyFired) {
        event('Purchase', {
          value: Number(activeAmount) || 49,
          currency: 'INR',
          content_name: 'Followers Growth Order',
          content_type: 'product',
          order_id: orderId,
        });
        sessionStorage.setItem(firedKey, 'true');
      }
    }
  }, [orderId, activeAmount]);

  // Determine return URL: return to home if bought from home, else /followers
  const returnUrl = fromParam === 'home' || fromParam === '/' ? '/' : '/followers';

  const handleDismiss = () => {
    if (typeof window !== 'undefined') {
      window.location.href = returnUrl;
    } else {
      router.push(returnUrl);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      {/* High Traffic Order Received Modal */}
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 text-center shadow-2xl border border-zinc-200 relative animate-in zoom-in-95 duration-200">
        {/* Close Button (X) */}
        <button
          onClick={handleDismiss}
          aria-label="Close"
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 p-1.5 rounded-full hover:bg-zinc-100 transition-colors cursor-pointer"
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

        {/* High Traffic Message */}
        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200/80 mb-6 text-left space-y-2.5">
          <p className="text-xs sm:text-sm font-semibold text-amber-900 leading-relaxed">
            &ldquo;High traffic ki wajah se aapke order ko process hone mein thoda extra time lag sakta hai. Kripya wait karein.&rdquo;
          </p>
          <div className="pt-2 border-t border-amber-200/60 flex items-center gap-2 text-xs font-bold text-amber-800">
            <Clock className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Estimated processing time: 24–120 hours.</span>
          </div>
        </div>

        {/* Got it Button (Redirects back to origin page) */}
        <button
          onClick={handleDismiss}
          className="w-full py-3.5 px-6 rounded-2xl font-black text-sm text-white bg-pink-600 hover:bg-pink-700 active:scale-[0.99] shadow-md shadow-pink-500/25 transition-all cursor-pointer"
        >
          Got it
        </button>
      </div>
    </div>
  );
}

export default function FollowersSuccessPage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans flex flex-col">
      <header className="border-b border-zinc-200 bg-white py-3 px-6 flex items-center justify-center">
        <Link href="/followers" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center p-0.5 border border-zinc-200 shadow-xs overflow-hidden">
            <img 
              src="/logo.png" 
              alt="Followers.blog Logo" 
              className="w-full h-full object-contain" 
            />
          </div>
          <span className="font-black text-lg text-zinc-950">
            Followers<span className="text-pink-600">.blog</span>
          </span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <Suspense fallback={<div className="text-center py-20 text-zinc-500 text-sm">Loading order...</div>}>
          <FollowersSuccessContent />
        </Suspense>
      </main>
    </div>
  );
}
