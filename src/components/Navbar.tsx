'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  ShoppingBag,
  Flame,
  Tag,
  Truck,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  Percent
} from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top High-Sales Global Offer Ticker */}
      <div className="bg-black text-white text-[11px] sm:text-xs font-bold py-2 px-3 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="bg-red-600 text-white font-black px-2 py-0.5 rounded text-[10px] tracking-wider uppercase flex items-center gap-1">
              <Flame className="w-3 h-3 fill-white" /> FLASH SALE
            </span>
            <span className="text-zinc-200">
              FIRST ORDER FLAT ₹100 OFF AUTO-APPLIED + BUY 2 GET ₹150 OFF
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-4 text-zinc-400 text-[11px] shrink-0">
            <span className="flex items-center gap-1 text-emerald-400">
              <Truck className="w-3.5 h-3.5" /> 3-5 Days Delivery
            </span>
            <span>•</span>
            <span className="text-zinc-300">100% Instant Refund</span>
            <span>•</span>
            <span className="font-mono text-amber-400 font-bold">CODE: WELCOME10</span>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-200 transition-all shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-zinc-950 text-white flex items-center justify-center font-black text-xl tracking-tighter group-hover:scale-105 transition-transform shadow-xs">
                NC
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-xl sm:text-2xl tracking-tight text-zinc-950 group-hover:text-red-600 transition-colors">
                    NEXT CREATORS
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest bg-zinc-950 text-white px-1.5 py-0.5 rounded">
                    STUDIO
                  </span>
                </div>
                <span className="text-[10px] text-zinc-500 font-semibold tracking-wider uppercase -mt-0.5">
                  Streetwear & 1st Copy Archive
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Collections */}
            <nav className="hidden lg:flex items-center gap-8 text-xs font-black tracking-wider uppercase text-zinc-800">
              <Link
                href="/collection/all"
                className="hover:text-red-600 transition-colors"
              >
                All Drops
              </Link>
              <Link
                href="/collection/bape"
                className="hover:text-red-600 transition-colors flex items-center gap-1 text-red-600"
              >
                <Flame className="w-3.5 h-3.5 fill-red-600" />
                BAPE (1st Copy)
              </Link>
              <Link
                href="/collection/men"
                className="hover:text-red-600 transition-colors"
              >
                Men's Drips
              </Link>
              <Link
                href="/collection/women"
                className="hover:text-red-600 transition-colors"
              >
                Women's Fits
              </Link>
              <Link
                href="/collection/cargos"
                className="hover:text-red-600 transition-colors"
              >
                Cargos & Pants
              </Link>
              <Link
                href="/collection/deals"
                className="hover:text-amber-600 transition-colors text-amber-700 flex items-center gap-1"
              >
                <Percent className="w-3.5 h-3.5" />
                Combos Under ₹599
              </Link>
            </nav>

            {/* Right Quick Action */}
            <div className="hidden sm:flex items-center gap-4">
              <Link
                href="/portal"
                className="text-xs font-semibold text-zinc-400 hover:text-zinc-600 transition-colors"
                title="SMM & Creator Services"
              >
                Creator SMM →
              </Link>

              <Link
                href="/collection/all"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-950 hover:bg-red-600 text-white text-xs font-extrabold uppercase tracking-wider transition-all transform active:scale-95 shadow-xs"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Shop Catalog</span>
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-zinc-800 hover:bg-zinc-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-zinc-200 bg-white px-4 pt-4 pb-6 space-y-4 shadow-xl">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-zinc-100 text-xs font-black uppercase">
              <Link
                href="/collection/bape"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-xl bg-red-50 text-red-600 border border-red-200 flex items-center gap-1.5"
              >
                <Flame className="w-4 h-4 fill-red-600" />
                BAPE (1st Copy)
              </Link>
              <Link
                href="/collection/deals"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1.5"
              >
                <Percent className="w-4 h-4" />
                Combos ₹150 OFF
              </Link>
            </div>

            <div className="space-y-2 text-sm font-bold text-zinc-800">
              <Link
                href="/collection/all"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1.5 hover:text-red-600"
              >
                All Streetwear Drops (View All)
              </Link>
              <Link
                href="/collection/men"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1.5 hover:text-red-600"
              >
                Men's Oversized Tees & Shirts
              </Link>
              <Link
                href="/collection/women"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1.5 hover:text-red-600"
              >
                Women's Y2K Tops & Co-Ords
              </Link>
              <Link
                href="/collection/cargos"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1.5 hover:text-red-600"
              >
                Tactical Cargos & Wide Leg Trousers
              </Link>
            </div>

            <div className="pt-3 border-t border-zinc-100 flex flex-col gap-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                <Truck className="w-4 h-4" /> 3-5 Days Express Delivery across India
              </div>
              <div className="flex items-center gap-2 text-zinc-600 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Instant Refund On Cancellation
              </div>
              <Link
                href="/portal"
                onClick={() => setMobileMenuOpen(false)}
                className="text-zinc-400 py-1"
              >
                Creator SMM / Marketing Portal →
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
