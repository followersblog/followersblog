'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { COURSE_DETAILS } from '@/data/courses';
import {
  User,
  ShoppingBag,
  Video,
  Clock,
  Calendar,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Search,
  BookOpen,
  Send,
  AlertCircle,
} from 'lucide-react';

export default function UserDashboardPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'courses' | 'services'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [userEmail, setUserEmail] = useState('');

  // Sample orders to display if DB is not connected yet, or loaded from sessionStorage
  const [orders, setOrders] = useState<any[]>([
    {
      id: 'CRS-749102-AI9X',
      productName: 'AI Website Building — 3 Hour Complete Practical Class',
      productType: 'course',
      amount: 1499,
      paymentStatus: 'success',
      orderStatus: 'completed',
      date: 'Today',
      webinarDate: COURSE_DETAILS.nextBatchDate,
      webinarTime: COURSE_DETAILS.nextBatchTime,
      accessLink: 'https://meet.google.com/followers-blog-live-class',
    },
    {
      id: 'SMM-183921-TG20',
      productName: '20k Telegram Members 🇮🇳',
      productType: 'service',
      target: '@crypto_trading_hub',
      quantity: '20,000',
      amount: 299,
      paymentStatus: 'success',
      orderStatus: 'processing',
      date: 'Yesterday',
      expectedWindow: '24–120 Hours',
    },
  ]);

  useEffect(() => {
    // Check if user has an order in sessionStorage
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('followers_order');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.customerEmail) {
            setUserEmail(parsed.customerEmail);
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const filteredOrders = orders.filter((order) => {
    if (activeTab === 'courses' && order.productType !== 'course') return false;
    if (activeTab === 'services' && order.productType !== 'service') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        order.id.toLowerCase().includes(q) ||
        order.productName.toLowerCase().includes(q) ||
        (order.target && order.target.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const telegramLink = process.env.NEXT_PUBLIC_TELEGRAM_SUPPORT_URL || 'https://t.me/FollowersBlogSupport';

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-zinc-50/70 py-10 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                Customer Portal
              </span>
              <h1 className="text-3xl font-extrabold text-zinc-950 mt-2">
                My Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-zinc-600 mt-1">
                View your active course access credentials and social service delivery statuses.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-sky-500 hover:bg-sky-600 shadow-sm transition-all"
              >
                <Send className="w-3.5 h-3.5 fill-white" />
                <span>Telegram Support</span>
              </a>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-zinc-500 font-semibold">Course Enrolments</div>
                <div className="text-xl font-bold text-zinc-950">1 Active Workshop</div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-zinc-500 font-semibold">Service Orders</div>
                <div className="text-xl font-bold text-zinc-950">1 In Queue</div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-zinc-500 font-semibold">Account Status</div>
                <div className="text-xl font-bold text-emerald-600">Verified Buyer</div>
              </div>
            </div>
          </div>

          {/* Live Course Webinar Banner */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-3xl p-6 sm:p-8 text-white shadow-md shadow-blue-500/15 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-white">
                  Upcoming Live Workshop
                </span>
                <h3 className="text-2xl font-black text-white">
                  AI Website Building — 3 Hour Class
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-blue-100">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-blue-200" />
                    <span>{COURSE_DETAILS.nextBatchDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-blue-200" />
                    <span>{COURSE_DETAILS.nextBatchTime}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                <a
                  href="https://meet.google.com/followers-blog-live-class"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-white text-blue-700 hover:bg-blue-50 text-center shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Video className="w-4 h-4" />
                  <span>Join Classroom Meeting</span>
                </a>
              </div>
            </div>
          </div>

          {/* Orders Table & Tabs */}
          <div className="bg-white rounded-3xl border border-zinc-200 shadow-xs overflow-hidden">
            {/* Tabs & Search */}
            <div className="p-4 sm:p-6 border-b border-zinc-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-xl">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'all' ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  All Orders
                </button>
                <button
                  onClick={() => setActiveTab('courses')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'courses' ? 'bg-white text-blue-700 shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  Courses
                </button>
                <button
                  onClick={() => setActiveTab('services')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'services' ? 'bg-white text-pink-700 shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  SMM Services
                </button>
              </div>

              <div className="relative max-w-xs w-full">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search order ID or service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-zinc-200 text-xs focus:outline-hidden focus:border-blue-500"
                />
              </div>
            </div>

            {/* List */}
            <div className="divide-y divide-zinc-100">
              {filteredOrders.length === 0 ? (
                <div className="p-12 text-center text-zinc-500 text-xs">
                  Koi order nahi mila. Naya purchase karne ke liye Homepage ya SMM section visit karein.
                </div>
              ) : (
                filteredOrders.map((order) => (
                  <div key={order.id} className="p-5 sm:p-6 hover:bg-zinc-50/50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded ${
                              order.productType === 'course'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-pink-100 text-pink-700'
                            }`}
                          >
                            {order.productType}
                          </span>
                          <span className="text-xs font-mono font-bold text-zinc-500">{order.id}</span>
                          <span className="text-[11px] text-zinc-400">• {order.date}</span>
                        </div>

                        <h4 className="text-base font-bold text-zinc-950">
                          {order.productName}
                        </h4>

                        {order.target && (
                          <div className="text-xs text-zinc-600">
                            Target URL: <span className="font-semibold text-zinc-900">{order.target}</span>
                            {order.quantity && <span className="ml-2 text-zinc-400">({order.quantity})</span>}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-4 sm:text-right">
                        <div>
                          <div className="text-sm font-black text-zinc-950">₹{order.amount}</div>
                          <div className="mt-0.5">
                            {order.orderStatus === 'completed' ? (
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                                Completed
                              </span>
                            ) : (
                              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                                In Queue (24-120 hrs)
                              </span>
                            )}
                          </div>
                        </div>

                        {order.productType === 'course' && (
                          <a
                            href={order.accessLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs"
                          >
                            Class Link
                          </a>
                        )}

                        {order.productType === 'service' && (
                          <a
                            href={telegramLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 rounded-xl text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 transition-colors flex items-center gap-1"
                          >
                            <Send className="w-3 h-3" />
                            <span>Track</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
