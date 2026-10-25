'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  ShoppingBag,
  TrendingUp,
  DollarSign,
  Shield,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Upload,
  MessageSquare,
  Printer,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Filter,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [activeSection, setActiveSection] = useState<'overview' | 'courses' | 'services' | 'evidence'>('overview');
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedOrderForDetail, setSelectedOrderForDetail] = useState<any | null>(null);

  // New Note state
  const [newNote, setNewNote] = useState('');
  const [newProofNote, setNewProofNote] = useState('');
  const [proofType, setProofType] = useState('screenshot');
  const [proofRef, setProofRef] = useState('');

  // Sample production-ready order records
  const [orders, setOrders] = useState<any[]>([
    {
      id: 'SMM-183921-TG20',
      customerName: 'Amit Verma',
      customerEmail: 'amit.verma@example.com',
      customerPhone: '+91 9876543210',
      productType: 'service',
      serviceName: '20k Telegram Members 🇮🇳',
      category: 'Telegram',
      quantity: '20,000',
      target: 'https://t.me/crypto_trading_hub',
      amount: 299,
      paymentStatus: 'success',
      orderStatus: 'processing',
      createdAt: '2026-10-25 09:30 AM',
      timeline: [
        { time: '09:30 AM', title: 'Order Placed', desc: 'Order created with target link' },
        { time: '09:31 AM', title: 'Payment Verified', desc: '₹299 paid via Cashfree gateway' },
        { time: '10:00 AM', title: 'Processing Started', desc: 'Added to automated drip-feed queue' },
      ],
      notes: [
        { by: 'Admin', note: 'Customer Telegram username verified. Safe queue active.', time: '10:05 AM' }
      ],
      evidence: [
        { type: 'screenshot', ref: 'initial_count_432.png', note: 'Starting member count was 432', time: '10:01 AM' }
      ],
      communication: [
        { message: 'Order Confirmation Email', status: 'Delivered', time: '09:31 AM' },
        { message: 'Processing Notice (24-120 hrs)', status: 'Delivered', time: '10:02 AM' },
      ],
    },
    {
      id: 'CRS-749102-AI9X',
      customerName: 'Rahul Sharma',
      customerEmail: 'rahul.s@example.com',
      customerPhone: '+91 9811223344',
      productType: 'course',
      serviceName: 'AI Website Building — 3 Hour Practical Class',
      amount: 1499,
      paymentStatus: 'success',
      orderStatus: 'completed',
      createdAt: '2026-10-25 11:15 AM',
      timeline: [
        { time: '11:15 AM', title: 'Enrolled & Paid', desc: '₹1499 paid via Cashfree' },
        { time: '11:16 AM', title: 'Webinar Link Dispatched', desc: 'Sent to email & dashboard activated' },
      ],
      notes: [
        { by: 'System', note: 'Classroom access granted for upcoming batch.', time: '11:16 AM' }
      ],
      evidence: [],
      communication: [
        { message: 'Class Enrolment & Calendar Invite', status: 'Delivered', time: '11:16 AM' }
      ],
    },
    {
      id: 'SMM-992014-FB10',
      customerName: 'Sunita Mehra',
      customerEmail: 'sunita.m@example.com',
      customerPhone: '+91 9988776655',
      productType: 'service',
      serviceName: '10k Facebook Likes + Followers 🇮🇳',
      category: 'Facebook',
      quantity: '10,000',
      target: 'https://facebook.com/mehra_boutique',
      amount: 250,
      paymentStatus: 'success',
      orderStatus: 'completed',
      createdAt: '2026-10-24 03:00 PM',
      timeline: [
        { time: '03:00 PM', title: 'Order Placed', desc: 'Target page validated' },
        { time: '03:01 PM', title: 'Payment Verified', desc: '₹250 verified' },
        { time: '04:00 PM', title: 'Processing Started', desc: 'Indian organic followers queue' },
        { time: '08:30 PM', title: 'Delivery Completed', desc: '10,150 followers delivered successfully' },
      ],
      notes: [
        { by: 'Admin', note: 'Final audit complete. Non-drop verified.', time: '08:35 PM' }
      ],
      evidence: [
        { type: 'screenshot', ref: 'final_delivery_fb_proof.png', note: 'Final page follower counter screenshot', time: '08:32 PM' }
      ],
      communication: [
        { message: 'Order Confirmation', status: 'Delivered', time: '03:01 PM' },
        { message: 'Completion Confirmation', status: 'Delivered', time: '08:35 PM' },
      ],
    },
  ]);

  // Add internal note
  const handleAddNote = (orderId: string) => {
    if (!newNote.trim()) return;
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            notes: [...o.notes, { by: 'Admin', note: newNote, time: 'Just now' }],
          };
        }
        return o;
      })
    );
    if (selectedOrderForDetail?.id === orderId) {
      setSelectedOrderForDetail((prev: any) => ({
        ...prev,
        notes: [...prev.notes, { by: 'Admin', note: newNote, time: 'Just now' }],
      }));
    }
    setNewNote('');
  };

  // Add delivery proof
  const handleAddEvidence = (orderId: string) => {
    if (!newProofNote.trim()) return;
    const proofItem = {
      type: proofType,
      ref: proofRef || 'proof_ref_uploaded.png',
      note: newProofNote,
      time: 'Just now',
    };

    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            evidence: [...o.evidence, proofItem],
            timeline: [
              ...o.timeline,
              { time: 'Just now', title: 'Delivery Proof Uploaded', desc: newProofNote },
            ],
          };
        }
        return o;
      })
    );

    if (selectedOrderForDetail?.id === orderId) {
      setSelectedOrderForDetail((prev: any) => ({
        ...prev,
        evidence: [...prev.evidence, proofItem],
        timeline: [
          ...prev.timeline,
          { time: 'Just now', title: 'Delivery Proof Uploaded', desc: newProofNote },
        ],
      }));
    }

    setNewProofNote('');
    setProofRef('');
    alert('Delivery proof successfully saved in evidence vault.');
  };

  // Filter orders
  const filtered = orders.filter((o) => {
    if (activeSection === 'courses' && o.productType !== 'course') return false;
    if (activeSection === 'services' && o.productType !== 'service') return false;
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerEmail.toLowerCase().includes(q) ||
        o.serviceName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0);
  const courseOrdersCount = orders.filter((o) => o.productType === 'course').length;
  const serviceOrdersCount = orders.filter((o) => o.productType === 'service').length;

  return (
    <div className="min-h-screen bg-zinc-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 text-zinc-300 hidden md:flex flex-col shrink-0">
        <div className="p-6 border-b border-zinc-800">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm">
              FB
            </div>
            <div>
              <div className="font-extrabold text-white text-base">Followers.blog</div>
              <div className="text-[10px] text-zinc-500 uppercase font-semibold">Admin Workspace</div>
            </div>
          </Link>
        </div>

        <nav className="p-4 space-y-1.5 flex-1 text-xs font-semibold">
          <button
            onClick={() => { setActiveSection('overview'); setSelectedOrderForDetail(null); }}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${
              activeSection === 'overview' ? 'bg-blue-600 text-white' : 'hover:bg-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Dashboard Overview</span>
          </button>
          <button
            onClick={() => { setActiveSection('courses'); setSelectedOrderForDetail(null); }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
              activeSection === 'courses' ? 'bg-blue-600 text-white' : 'hover:bg-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-4 h-4" />
              <span>Course Orders</span>
            </div>
            <span className="text-[10px] font-bold bg-zinc-800 px-2 py-0.5 rounded-full">{courseOrdersCount}</span>
          </button>
          <button
            onClick={() => { setActiveSection('services'); setSelectedOrderForDetail(null); }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
              activeSection === 'services' ? 'bg-blue-600 text-white' : 'hover:bg-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <TrendingUp className="w-4 h-4" />
              <span>Service (SMM) Orders</span>
            </div>
            <span className="text-[10px] font-bold bg-zinc-800 px-2 py-0.5 rounded-full">{serviceOrdersCount}</span>
          </button>
        </nav>

        <div className="p-4 border-t border-zinc-800 text-xs">
          <Link href="/" className="text-zinc-500 hover:text-white flex items-center gap-2">
            <span>← Public Website</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="bg-white border-b border-zinc-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-zinc-950 capitalize">
              {selectedOrderForDetail ? `Order Audit: ${selectedOrderForDetail.id}` : `${activeSection} Management`}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              ● Secure Mode Active
            </span>
          </div>
        </header>

        <main className="p-6 overflow-y-auto flex-1">
          {/* If an Order is Selected -> Show Full Order Audit & Evidence View (Section 24-28) */}
          {selectedOrderForDetail ? (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setSelectedOrderForDetail(null)}
                  className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                >
                  ← Back to Orders List
                </button>

                {/* Printable Order Evidence Report (Section 28) */}
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-zinc-700 bg-white border border-zinc-300 hover:bg-zinc-50 shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Export Order Evidence (PDF)</span>
                </button>
              </div>

              {/* Order Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs">
                  <div className="text-xs font-bold text-zinc-400 uppercase">Customer Info</div>
                  <div className="text-sm font-bold text-zinc-950 mt-1">{selectedOrderForDetail.customerName}</div>
                  <div className="text-xs text-zinc-600 mt-0.5">{selectedOrderForDetail.customerEmail}</div>
                  <div className="text-xs text-zinc-600">{selectedOrderForDetail.customerPhone}</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs">
                  <div className="text-xs font-bold text-zinc-400 uppercase">Product & Amount</div>
                  <div className="text-sm font-bold text-zinc-950 mt-1">{selectedOrderForDetail.serviceName}</div>
                  <div className="text-lg font-black text-blue-600 mt-1">₹{selectedOrderForDetail.amount}</div>
                  <div className="text-xs text-emerald-600 font-bold">Payment: {selectedOrderForDetail.paymentStatus.toUpperCase()}</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs">
                  <div className="text-xs font-bold text-zinc-400 uppercase">Fulfillment Target</div>
                  <div className="text-xs font-mono font-semibold text-zinc-900 mt-1 break-all">
                    {selectedOrderForDetail.target || 'N/A (Course Access)'}
                  </div>
                  <div className="mt-2 text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded inline-block">
                    Status: {selectedOrderForDetail.orderStatus.toUpperCase()}
                  </div>
                </div>
              </div>

              {/* Section 27: Timeline */}
              <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs">
                <h3 className="text-sm font-bold text-zinc-950 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Order Audit Timeline</span>
                </h3>
                <div className="space-y-4 pl-4 border-l-2 border-blue-500 text-xs">
                  {selectedOrderForDetail.timeline?.map((item: any, i: number) => (
                    <div key={i} className="relative pl-4">
                      <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-white" />
                      <div className="font-bold text-zinc-900 flex items-center gap-2">
                        <span>{item.title}</span>
                        <span className="text-[10px] text-zinc-400 font-normal">({item.time})</span>
                      </div>
                      <p className="text-zinc-600 text-[11px] mt-0.5">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 25: Delivery Proof Vault */}
              <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs">
                <h3 className="text-sm font-bold text-zinc-950 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span>Delivery Evidence & Proof Vault</span>
                </h3>
                <p className="text-xs text-zinc-500 mb-4">
                  Actual fulfillment screenshots or references stored securely for compliance.
                </p>

                {selectedOrderForDetail.evidence?.length === 0 ? (
                  <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-500 text-center mb-4">
                    Koi delivery proof abhi upload nahi kiya gaya hai.
                  </div>
                ) : (
                  <div className="space-y-2 mb-4">
                    {selectedOrderForDetail.evidence?.map((ev: any, idx: number) => (
                      <div key={idx} className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-emerald-950 uppercase text-[10px] bg-emerald-100 px-1.5 py-0.5 rounded mr-2">
                            {ev.type}
                          </span>
                          <span className="font-semibold text-zinc-900">{ev.note}</span>
                          <div className="text-[10px] text-zinc-400 font-mono mt-0.5">Ref: {ev.ref} • {ev.time}</div>
                        </div>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Proof Form */}
                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-3">
                  <div className="text-xs font-bold text-zinc-800">Add New Delivery Proof</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <select
                      value={proofType}
                      onChange={(e) => setProofType(e.target.value)}
                      className="px-3 py-2 rounded-lg border border-zinc-300 text-xs bg-white"
                    >
                      <option value="screenshot">Screenshot Evidence</option>
                      <option value="pdf">PDF Receipt / Statement</option>
                      <option value="reference">Provider Reference ID</option>
                    </select>
                    <input
                      type="text"
                      placeholder="File name or external reference"
                      value={proofRef}
                      onChange={(e) => setProofRef(e.target.value)}
                      className="px-3 py-2 rounded-lg border border-zinc-300 text-xs bg-white"
                    >
                    </input>
                  </div>
                  <input
                    type="text"
                    placeholder="Evidence description note (e.g. Starting vs Final count screenshot)"
                    value={newProofNote}
                    onChange={(e) => setNewProofNote(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-xs bg-white"
                  />
                  <button
                    onClick={() => handleAddEvidence(selectedOrderForDetail.id)}
                    className="px-4 py-2 rounded-lg font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-xs"
                  >
                    Save Delivery Proof
                  </button>
                </div>
              </div>

              {/* Section 26 & 29: Admin Notes & Communication Log */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Internal Notes (Never shown to customer) */}
                <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs">
                  <h4 className="text-xs font-bold text-zinc-950 uppercase tracking-wider mb-3">
                    Internal Admin Notes
                  </h4>
                  <div className="space-y-2 mb-3 max-h-40 overflow-y-auto">
                    {selectedOrderForDetail.notes?.map((n: any, idx: number) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-100 text-xs">
                        <div className="flex items-center justify-between text-[10px] text-zinc-400 font-semibold">
                          <span>{n.by}</span>
                          <span>{n.time}</span>
                        </div>
                        <p className="text-zinc-800 text-xs mt-0.5">{n.note}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add private note..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg border border-zinc-300 text-xs"
                    />
                    <button
                      onClick={() => handleAddNote(selectedOrderForDetail.id)}
                      className="px-3 py-2 rounded-lg bg-zinc-900 text-white font-bold text-xs"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Communication Log */}
                <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs">
                  <h4 className="text-xs font-bold text-zinc-950 uppercase tracking-wider mb-3">
                    Communication Log
                  </h4>
                  <div className="space-y-2 max-h-52 overflow-y-auto">
                    {selectedOrderForDetail.communication?.map((c: any, idx: number) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-blue-50/50 border border-blue-100 text-xs flex items-center justify-between">
                        <div>
                          <div className="font-bold text-zinc-900">{c.message}</div>
                          <div className="text-[10px] text-zinc-400">{c.time}</div>
                        </div>
                        <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                          {c.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Default Overview & Orders Table
            <div className="space-y-6 max-w-6xl mx-auto">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs">
                  <div className="text-xs font-bold text-zinc-400 uppercase">Total Revenue</div>
                  <div className="text-2xl font-black text-zinc-950 mt-1">₹{totalRevenue}</div>
                  <div className="text-[11px] text-emerald-600 font-semibold mt-1">100% Verified</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs">
                  <div className="text-xs font-bold text-zinc-400 uppercase">Total Orders</div>
                  <div className="text-2xl font-black text-zinc-950 mt-1">{orders.length}</div>
                  <div className="text-[11px] text-blue-600 font-semibold mt-1">All Products</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs">
                  <div className="text-xs font-bold text-zinc-400 uppercase">Course Students</div>
                  <div className="text-2xl font-black text-zinc-950 mt-1">{courseOrdersCount}</div>
                  <div className="text-[11px] text-indigo-600 font-semibold mt-1">Class Enrolled</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs">
                  <div className="text-xs font-bold text-zinc-400 uppercase">Service Orders</div>
                  <div className="text-2xl font-black text-zinc-950 mt-1">{serviceOrdersCount}</div>
                  <div className="text-[11px] text-pink-600 font-semibold mt-1">Active Fulfillment</div>
                </div>
              </div>

              {/* Orders Table */}
              <div className="bg-white rounded-2xl border border-zinc-200 shadow-xs overflow-hidden">
                <div className="p-4 border-b border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="font-bold text-sm text-zinc-900">
                    Order Records
                  </div>
                  <div className="relative max-w-xs w-full">
                    <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search customer, ID, service..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 rounded-xl border border-zinc-200 text-xs focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="p-4">Order ID</th>
                        <th className="p-4">Customer</th>
                        <th className="p-4">Product / Service</th>
                        <th className="p-4">Amount</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Date</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {filtered.map((order) => (
                        <tr key={order.id} className="hover:bg-zinc-50/70 transition-colors">
                          <td className="p-4 font-mono font-bold text-zinc-900">
                            {order.id}
                          </td>
                          <td className="p-4">
                            <div className="font-bold text-zinc-950">{order.customerName}</div>
                            <div className="text-[11px] text-zinc-400">{order.customerEmail}</div>
                          </td>
                          <td className="p-4">
                            <div className="font-semibold text-zinc-800">{order.serviceName}</div>
                            {order.target && (
                              <div className="text-[10px] text-zinc-400 font-mono truncate max-w-xs">
                                {order.target}
                              </div>
                            )}
                          </td>
                          <td className="p-4 font-bold text-zinc-950">
                            ₹{order.amount}
                          </td>
                          <td className="p-4">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                order.orderStatus === 'completed'
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : 'bg-amber-50 text-amber-700'
                              }`}
                            >
                              {order.orderStatus.toUpperCase()}
                            </span>
                          </td>
                          <td className="p-4 text-zinc-400 text-[11px]">
                            {order.createdAt}
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => setSelectedOrderForDetail(order)}
                              className="px-3 py-1.5 rounded-lg text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
                            >
                              Manage & Evidence →
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
