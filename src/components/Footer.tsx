import React from 'react';
import Link from 'next/link';
import { Sparkles, Shield, Heart, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-zinc-50 border-t border-zinc-200 text-zinc-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50/50 flex items-center justify-center p-1 border border-blue-100 shadow-xs overflow-hidden">
                <img 
                  src="/logo.png" 
                  alt="Followers.blog Logo" 
                  className="w-full h-full object-contain" 
                />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-zinc-900">
                Followers<span className="text-blue-600">.blog</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Empowering creators and digital entrepreneurs with modern AI website development skills and premium digital growth solutions.
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>SSL 256-Bit Encrypted Payments</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#course-curriculum" className="hover:text-blue-600 transition-colors">
                  AI Website Building Course
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-blue-600 transition-colors">
                  Student Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Compliance (Cashfree Review Ready) */}
          <div>
            <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-wider mb-4">
              Legal & Policies
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/terms" className="hover:text-blue-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-blue-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-blue-600 transition-colors">
                  Refund & Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-blue-600 transition-colors">
                  Shipping & Delivery Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Community */}
          <div>
            <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-wider mb-4">
              Need Assistance?
            </h4>
            <p className="text-sm text-zinc-600 mb-3">
              Have questions regarding course access or your orders? Our team is active 24/7.
            </p>
            <div className="space-y-2 text-sm">
              <a
                href={process.env.NEXT_PUBLIC_TELEGRAM_SUPPORT_URL || 'https://t.me/FollowersBlogSupport'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 font-semibold transition-colors"
              >
                <span>✈️</span> Telegram Fast Support
              </a>
              <div className="flex items-center gap-2 text-xs text-zinc-500 pt-2">
                <Mail className="w-3.5 h-3.5 text-zinc-400" />
                <span>support@followers.blog</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© 2026 Followers.blog. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Built with precision for creators</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
}
