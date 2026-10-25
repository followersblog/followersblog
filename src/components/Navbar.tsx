'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Sparkles, BookOpen, TrendingUp, ShieldCheck, User } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-blue-50/50 flex items-center justify-center p-1 border border-blue-100 group-hover:scale-105 transition-transform overflow-hidden">
              <img 
                src="/logo.png" 
                alt="Followers.blog Logo" 
                className="w-full h-full object-contain" 
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-zinc-900 group-hover:text-blue-600 transition-colors">
                Followers<span className="text-blue-600">.blog</span>
              </span>
              <span className="text-[10px] text-zinc-500 font-medium tracking-wider uppercase -mt-1">
                AI & Digital Growth
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/" 
              className="text-sm font-semibold text-zinc-700 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/#course-curriculum" 
              className="text-sm font-semibold text-zinc-700 hover:text-blue-600 transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4 text-blue-500" />
              Course Curriculum
            </Link>
            <Link 
              href="/#faq" 
              className="text-sm font-semibold text-zinc-700 hover:text-blue-600 transition-colors"
            >
              FAQ
            </Link>
          </nav>

          {/* Right CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/course/checkout"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 hover:-translate-y-0.5 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              Join Course — ₹1499
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/course/checkout"
              className="text-xs font-bold px-3 py-2 rounded-lg bg-blue-600 text-white"
            >
              Join ₹1499
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-zinc-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-zinc-800 hover:bg-blue-50 hover:text-blue-600"
          >
            Home
          </Link>
          <Link
            href="/#course-curriculum"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-3 py-2 rounded-lg text-base font-semibold text-zinc-800 hover:bg-blue-50 hover:text-blue-600"
          >
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-500" />
              AI Website Building Course
            </span>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">₹1499</span>
          </Link>
          <Link
            href="/#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-zinc-800 hover:bg-blue-50 hover:text-blue-600"
          >
            Frequently Asked Questions
          </Link>
          <div className="pt-2">
            <Link
              href="/course/checkout"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              Join Course — ₹1499
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
