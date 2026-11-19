'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Sparkles, ShoppingBag, ShieldCheck, Flame, Tag, Truck } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top High-Sales Offer Ticker */}
      <div className="bg-gradient-to-r from-red-600 via-amber-600 to-red-600 text-white text-xs sm:text-sm font-bold py-2 px-3 text-center tracking-wide flex items-center justify-center gap-2 shadow-inner">
        <Flame className="w-4 h-4 text-yellow-300 animate-pulse hidden sm:inline" />
        <span>
          ⚡ <span className="underline decoration-yellow-300 decoration-2 font-black">SALE ALERT:</span> FLAT ₹100 OFF AUTO-APPLIED ON FIRST ORDER + BUY 2 GET ₹150 OFF!
        </span>
        <span className="hidden md:inline bg-black/30 px-2 py-0.5 rounded text-[11px] font-mono border border-white/20">
          CODE: WELCOME10
        </span>
      </div>

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center p-1 border border-red-100 group-hover:scale-105 transition-transform overflow-hidden">
                <ShoppingBag className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-zinc-900 group-hover:text-red-600 transition-colors">
                  Next <span className="text-red-600">Creators</span> <span className="text-xs font-bold uppercase tracking-widest bg-zinc-900 text-white px-1.5 py-0.5 rounded ml-1">WEAR</span>
                </span>
                <span className="text-[10px] text-zinc-500 font-medium tracking-wider uppercase -mt-0.5">
                  Trending Streetwear & Master Copies
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-7">
              <Link 
                href="/#shop-men" 
                className="text-sm font-bold text-zinc-700 hover:text-red-600 transition-colors"
              >
                Men's Drips
              </Link>
              <Link 
                href="/#shop-women" 
                className="text-sm font-bold text-zinc-700 hover:text-red-600 transition-colors"
              >
                Women's Fits
              </Link>
              <Link 
                href="/#bape-drop" 
                className="text-sm font-black text-red-600 hover:text-red-700 transition-colors flex items-center gap-1 bg-red-50 px-2.5 py-1 rounded-full border border-red-200"
              >
                <Flame className="w-3.5 h-3.5 fill-red-600" />
                BAPE Shark (1st Copy)
              </Link>
              <Link 
                href="/#offers" 
                className="text-sm font-bold text-amber-700 hover:text-amber-800 transition-colors flex items-center gap-1"
              >
                <Tag className="w-3.5 h-3.5 text-amber-600" />
                BOGO Offers
              </Link>
              <Link 
                href="/portal" 
                className="text-xs font-semibold text-zinc-400 hover:text-zinc-600 transition-colors"
              >
                Creator SMM
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                <Truck className="w-3.5 h-3.5 text-emerald-600" />
                <span>3-5 Days Delivery</span>
              </div>
              <Link
                href="/#all-products"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-bold rounded-xl text-white bg-red-600 hover:bg-red-700 shadow-sm transition-all transform active:scale-95"
              >
                Explore Sale
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-zinc-700 hover:bg-zinc-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-200 bg-white px-4 pt-3 pb-6 space-y-3">
            <Link
              href="/#shop-men"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-bold text-zinc-800 hover:text-red-600"
            >
              Men's Trending
            </Link>
            <Link
              href="/#shop-women"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-bold text-zinc-800 hover:text-red-600"
            >
              Women's Trending
            </Link>
            <Link
              href="/#bape-drop"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-black text-red-600"
            >
              🔥 BAPE Shark Jacket (1st Copy ₹489)
            </Link>
            <Link
              href="/#offers"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-bold text-amber-700"
            >
              🏷️ Combo & BOGO Offers
            </Link>
            <div className="pt-2 border-t border-zinc-100 flex flex-col gap-2">
              <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-600" />
                3-5 Days Fast Delivery across India
              </div>
              <div className="text-xs text-zinc-500 font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-zinc-400" />
                100% Instant Refund on Cancellation
              </div>
              <Link
                href="/portal"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-zinc-400 py-1"
              >
                Go to Creator Media / SMM Portal →
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
