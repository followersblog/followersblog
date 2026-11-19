import React from 'react';
import Link from 'next/link';
import { Truck, RotateCcw, ShieldCheck, Lock, ArrowRight, Instagram, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-800">
      {/* 4 Pillars of High Conversion */}
      <div className="border-b border-zinc-800/80 bg-zinc-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-500/30 flex items-center justify-center shrink-0 text-red-400">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white text-sm font-extrabold">3–5 Days Fast Delivery</h4>
                <p className="text-xs text-zinc-400 mt-0.5">Pan-India express tracked courier directly to your door.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white text-sm font-extrabold">100% Instant Refund</h4>
                <p className="text-xs text-zinc-400 mt-0.5">Cancel anytime before dispatch with instant 1-click full refund.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white text-sm font-extrabold">7A Master Replicas</h4>
                <p className="text-xs text-zinc-400 mt-0.5">Transparent 1st copy detailing. No fake promises, pure master quality.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-950/60 border border-blue-500/30 flex items-center justify-center shrink-0 text-blue-400">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white text-sm font-extrabold">Safe UPI & Card Payments</h4>
                <p className="text-xs text-zinc-400 mt-0.5">Bank-grade 256-bit encrypted checkout via Razorpay & Cashfree.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white text-black font-black flex items-center justify-center text-sm">
                NC
              </div>
              <span className="font-black text-xl text-white tracking-tight">
                NEXT CREATORS <span className="text-red-500">STUDIO</span>
              </span>
            </div>
            
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              India's highest selling streetwear archival drops. Direct factory pricing on Heavyweight 240+ GSM Oversized Tees, Korean Wide Leg Cargos, and 7A Quality Master 1st Copies under ₹499 - ₹599.
            </p>

            <div className="pt-2 text-xs text-zinc-400 space-y-1">
              <p>Email: <span className="text-white font-medium">support@nextcreators.in</span></p>
              <p>Timings: Mon – Sat (10:00 AM – 7:00 PM IST)</p>
            </div>
          </div>

          {/* Curated Drop Links */}
          <div>
            <h5 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              Trending Drops
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/collection/bape" className="hover:text-red-400 transition-colors font-bold text-red-400">
                  🔥 BAPE Shark Hoodie (1st Copy)
                </Link>
              </li>
              <li>
                <Link href="/collection/men" className="hover:text-white transition-colors">
                  Men's Heavyweight Boxy Tees
                </Link>
              </li>
              <li>
                <Link href="/collection/cargos" className="hover:text-white transition-colors">
                  Parachute & Tactical Baggy Cargos
                </Link>
              </li>
              <li>
                <Link href="/collection/women" className="hover:text-white transition-colors">
                  Women's Co-ords & Wide Leg Trousers
                </Link>
              </li>
              <li>
                <Link href="/collection/deals" className="hover:text-amber-400 transition-colors text-amber-400">
                  Buy 2 Get ₹150 OFF Combos
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Support & Policies */}
          <div>
            <h5 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              Help & Policies
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/shipping" className="hover:text-white transition-colors">
                  Shipping Policy (3-5 Days)
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-white transition-colors">
                  100% Instant Refund & Returns
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Track Order / Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Creator Portal Dual Access */}
          <div>
            <h5 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              Creator Services
            </h5>
            <p className="text-xs text-zinc-400 mb-3">
              Looking for our creator media growth, SMM tools, or video courses?
            </p>
            <Link
              href="/portal"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 px-3 py-2 rounded-xl transition-colors"
            >
              <span>Creator SMM Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

        <div className="border-t border-zinc-900 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} Next Creators Studio. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Dispatched via Delhivery, BlueDart & Express Courier</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
