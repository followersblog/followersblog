'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Send, Clock, MapPin, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const telegramLink = process.env.NEXT_PUBLIC_TELEGRAM_SUPPORT_URL || 'https://t.me/FollowersBlogSupport';

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-zinc-50 py-12 sm:py-20 text-zinc-800 font-sans">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Customer Support
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 mt-2">
              Contact Followers.blog
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 mt-2">
              Have questions regarding course curriculum, payments, or order status? We are here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-xs space-y-6">
              <h2 className="text-lg font-bold text-zinc-950">
                Official Channels
              </h2>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-zinc-900">Email Desk</div>
                    <a href="mailto:support@followers.blog" className="text-blue-600 hover:underline">
                      support@followers.blog
                    </a>
                    <div className="text-[11px] text-zinc-400">Response within 2-4 hours</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                    <Send className="w-5 h-5 fill-sky-500" />
                  </div>
                  <div>
                    <div className="font-bold text-zinc-900">Telegram Instant Support</div>
                    <a href={telegramLink} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline font-semibold">
                      @FollowersBlogSupport
                    </a>
                    <div className="text-[11px] text-zinc-400">Live chat assistance 24/7</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-zinc-900">Operating Hours</div>
                    <div className="text-zinc-600">Monday to Sunday: 9:00 AM – 11:00 PM IST</div>
                    <div className="text-[11px] text-zinc-400">Automated systems operational 24/7/365</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-xs">
              <h2 className="text-lg font-bold text-zinc-950 mb-4">
                Send a Message
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thank you! Your message has been received. Our team will contact you shortly.');
                }}
                className="space-y-3 text-xs"
              >
                <div>
                  <label className="block font-bold text-zinc-800 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-xs focus:outline-hidden focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-zinc-800 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-xs focus:outline-hidden focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-zinc-800 mb-1">Order ID (If Applicable)</label>
                  <input
                    type="text"
                    placeholder="e.g. CRS-102931 or MED-482019"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-xs focus:outline-hidden focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-zinc-800 mb-1">Message</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe your inquiry..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-xs focus:outline-hidden focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs"
                >
                  Send Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
