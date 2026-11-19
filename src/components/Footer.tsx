import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Truck, RotateCcw, Heart, Mail, Phone, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-400">
      {/* Guarantees Bar */}
      <div className="border-b border-zinc-800 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <Truck className="w-6 h-6 text-red-500 shrink-0" />
              <div>
                <p className="text-white text-sm font-bold">3-5 Days Express Delivery</p>
                <p className="text-xs text-zinc-400">All India Doorstep Shipping</p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3">
              <RotateCcw className="w-6 h-6 text-emerald-500 shrink-0" />
              <div>
                <p className="text-white text-sm font-bold">100% Instant Refund</p>
                <p className="text-xs text-zinc-400">Cancel anytime before dispatch</p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3">
              <ShieldCheck className="w-6 h-6 text-blue-500 shrink-0" />
              <div>
                <p className="text-white text-sm font-bold">Transparent 1st Copy Tags</p>
                <p className="text-xs text-zinc-400">7A Master Master replicas clearly labeled</p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3">
              <Lock className="w-6 h-6 text-amber-500 shrink-0" />
              <div>
                <p className="text-white text-sm font-bold">Secure UPI & Card Payments</p>
                <p className="text-xs text-zinc-400">Encrypted checkout protection</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Next <span className="text-red-500">Creators</span> <span className="text-xs font-bold uppercase tracking-widest bg-white text-black px-1.5 py-0.5 rounded">WEAR</span>
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              India's premier high-demand street fashion hub. Offering viral aesthetic tees, 7A replica streetwear jackets, baggy cargos, and curated drops directly at unbeatable factory prices.
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Verified Merchant & Safe Checkout</span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Shop Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#shop-men" className="hover:text-red-400 transition-colors">
                  Men's Oversized Tees & Cargos
                </Link>
              </li>
              <li>
                <Link href="/#shop-women" className="hover:text-red-400 transition-colors">
                  Women's Co-ords & Wide-leg Pants
                </Link>
              </li>
              <li>
                <Link href="/#bape-drop" className="hover:text-red-400 transition-colors font-bold text-red-400">
                  BAPE Shark 1st Copy Collection
                </Link>
              </li>
              <li>
                <Link href="/#offers" className="hover:text-red-400 transition-colors text-amber-400">
                  Buy 2 Get ₹150 OFF Combos
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/shipping" className="hover:text-red-400 transition-colors">
                  Shipping & Delivery Timeline (3-5 Days)
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-red-400 transition-colors">
                  Instant Cancellation & 100% Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-red-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-red-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-red-400 transition-colors">
                  Contact Support Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Creator Services link */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Other Services
            </h4>
            <p className="text-xs text-zinc-400 mb-3">
              Need creator media promotions, courses, or media marketing?
            </p>
            <Link
              href="/portal"
              className="inline-block text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-2 rounded-lg border border-zinc-700 font-medium transition-colors"
            >
              Open Creator Media Portal →
            </Link>
            <p className="text-[11px] text-zinc-500 mt-3">
              Support email: <span className="text-zinc-300">support@nextcreators.in</span>
            </p>
          </div>
        </div>

        <div className="border-t border-zinc-800/80 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} Next Creators Wear. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered for High-Velocity D2C Streetwear
          </p>
        </div>
      </div>
    </footer>
  );
}
