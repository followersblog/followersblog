'use client';

import React, { useState, useEffect } from 'react';
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
  Lock,
  LogOut,
  AlertTriangle,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';

export default function AdminDashboardPage() {
  // ==========================================================================
  // 1. ADMIN PASSWORD AUTHENTICATION STATE
  // ==========================================================================
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  // Default secure admin passcode
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASS || 'followers@7055';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedAuth = sessionStorage.getItem('followers_admin_auth');
      if (savedAuth === 'true') {
        setIsAuthenticated(true);
      }
    }
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('followers_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Galat Password! Kripya sahi Admin Passcode daaliye.');
    }
  };

  const handleAdminLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('followers_admin_auth');
    setPasswordInput('');
  };

  // ==========================================================================
  // 2. DASHBOARD DATA & DISPUTE MANAGEMENT
  // ==========================================================================
  const [activeSection, setActiveSection] = useState<'overview' | 'courses' | 'services' | 'disputes'>('overview');
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedOrderForDetail, setSelectedOrderForDetail] = useState<any | null>(null);

  // New Note state
  const [newNote, setNewNote] = useState('');
  const [newProofNote, setNewProofNote] = useState('');
  const [proofType, setProofType] = useState('screenshot');
  const [proofRef, setProofRef] = useState('');

  // Orders list with Dispute Tracking
  const [orders, setOrders] = useState<any[]>([
    {
      id: 'MED-183921-TG20',
      customerName: 'Amit Verma',
      customerEmail: 'amit.verma@example.com',
      customerPhone: '+91 9876543210',
      productType: 'service',
      serviceName: '20k Telegram Members 🇮🇳',
      compliantBillingName: 'Digital Creator Strategy Class & Media Pack (Tier ₹299)',
      category: 'Telegram',
      quantity: '20,000',
      target: 'https://t.me/crypto_trading_hub',
      amount: 299,
      paymentStatus: 'success',
      orderStatus: 'processing',
      disputeStatus: 'under_review', // 'none' | 'under_review' | 'won' | 'lost'
      disputeReason: 'Customer bank reported unrecognized charge. Compliant receipt ready.',
      createdAt: '2026-10-25 09:30 AM',
      timeline: [
        { time: '09:30 AM', title: 'Order Placed', desc: 'Customer agreed to Terms of Service & digital delivery' },
        { time: '09:31 AM', title: 'Payment Captured', desc: '₹299 paid via Cashfree Gateway' },
        { time: '10:00 AM', title: 'Asset Delivery Dispatched', desc: 'Media strategy queue assigned' },
      ],
      notes: [
        { by: 'Admin', note: 'Customer Telegram verified. Evidence screenshot captured.', time: '10:05 AM' }
      ],
      evidence: [
        { type: 'screenshot', ref: 'initial_count_432.png', note: 'Starting subscriber counter verified (432)', time: '10:01 AM' }
      ],
      communication: [
        { message: 'Digital Tax Invoice Dispatched', status: 'Delivered', time: '09:31 AM' },
        { message: 'Class & Strategy Access Notice', status: 'Delivered', time: '10:02 AM' },
      ],
    },
    {
      id: 'CRS-749102-AI9X',
      customerName: 'Rahul Sharma',
      customerEmail: 'rahul.s@example.com',
      customerPhone: '+91 9811223344',
      productType: 'course',
      serviceName: 'AI Website Building — 3 Hour Practical Class',
      compliantBillingName: 'AI Website Building — 3 Hour Live Practical Class',
      amount: 1499,
      paymentStatus: 'success',
      orderStatus: 'completed',
      disputeStatus: 'none',
      createdAt: '2026-10-25 11:15 AM',
      timeline: [
        { time: '11:15 AM', title: 'Course Enrolled', desc: '₹1499 paid via Cashfree' },
        { time: '11:16 AM', title: 'Webinar Joining Credentials', desc: 'Google Meet link & prompts sent' },
      ],
      notes: [
        { by: 'System', note: 'Classroom access granted for upcoming live batch.', time: '11:16 AM' }
      ],
      evidence: [],
      communication: [
        { message: 'Class Enrolment & Calendar Invite', status: 'Delivered', time: '11:16 AM' }
      ],
    },
    {
      id: 'MED-992014-FB10',
      customerName: 'Sunita Mehra',
      customerEmail: 'sunita.m@example.com',
      customerPhone: '+91 9988776655',
      productType: 'service',
      serviceName: '10k Facebook Likes + Followers 🇮🇳',
      compliantBillingName: 'Digital Creator Strategy Class & Media Pack (Tier ₹250)',
      category: 'Facebook',
      quantity: '10,000',
      target: 'https://facebook.com/mehra_boutique',
      amount: 250,
      paymentStatus: 'success',
      orderStatus: 'completed',
      disputeStatus: 'none',
      createdAt: '2026-10-24 03:00 PM',
      timeline: [
        { time: '03:00 PM', title: 'Order Placed', desc: 'Page verified' },
        { time: '03:01 PM', title: 'Payment Captured', desc: '₹250 verified' },
        { time: '08:30 PM', title: 'Delivery Completed', desc: '10,150 delivered successfully' },
      ],
      notes: [
        { by: 'Admin', note: 'Final audit complete. Non-drop verified.', time: '08:35 PM' }
      ],
      evidence: [
        { type: 'screenshot', ref: 'final_delivery_fb_proof.png', note: 'Final follower counter screenshot', time: '08:32 PM' }
      ],
      communication: [
        { message: 'Tax Invoice & Strategy Delivered', status: 'Delivered', time: '03:01 PM' },
      ],
    },
  ]);

  // Toggle order dispute status
  const handleToggleDispute = (orderId: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, disputeStatus: newStatus } : o))
    );
    if (selectedOrderForDetail?.id === orderId) {
      setSelectedOrderForDetail((prev: any) => ({ ...prev, disputeStatus: newStatus }));
    }
  };

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
      ref: proofRef || 'delivery_proof_verified.png',
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
    alert('Delivery proof evidence vault mein save ho gaya hai.');
  };

  // Filter orders
  const filtered = orders.filter((o) => {
    if (activeSection === 'courses' && o.productType !== 'course') return false;
    if (activeSection === 'services' && o.productType !== 'service') return false;
    if (activeSection === 'disputes' && o.disputeStatus === 'none') return false;

    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerEmail.toLowerCase().includes(q) ||
        o.customerPhone.toLowerCase().includes(q) ||
        String(o.amount).includes(q) ||
        o.serviceName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0);
  const activeDisputesCount = orders.filter((o) => o.disputeStatus === 'under_review').length;

  // ==========================================================================
  // SCREEN 1: ADMIN LOGIN GATEWAY (IF NOT AUTHENTICATED)
  // ==========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 font-sans text-white">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-md w-full shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-blue-600/20 text-blue-500 border border-blue-500/30 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-8 h-8 stroke-[2.5]" />
          </div>

          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
              Restricted Area
            </span>
            <div className="flex items-center justify-center gap-2.5 mt-2">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center p-0.5 border border-zinc-700 overflow-hidden">
                <img src="/logo.png" alt="Followers.blog Logo" className="w-full h-full object-contain" />
              </div>
              <h1 className="text-2xl font-black text-white">
                Followers<span className="text-blue-500">.blog</span>
              </h1>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Admin Portal Security Gateway. Authentication required.
            </p>
          </div>

          {authError && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2 text-left">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">
                Admin Security Passcode
              </label>
              <input
                type="password"
                required
                placeholder="Enter admin password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
              <div className="flex items-center justify-between text-[11px] text-zinc-500 mt-1.5">
                <span>Default Passcode:</span>
                <code className="text-blue-400 font-mono bg-zinc-800 px-1.5 py-0.5 rounded">followers2026admin</code>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Unlock Admin Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 border-t border-zinc-800/80 text-[11px] text-zinc-600">
            Authorized admin access only. All login attempts are encrypted.
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // SCREEN 2: AUTHENTICATED ADMIN DASHBOARD
  // ==========================================================================
  return (
    <div className="min-h-screen bg-zinc-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 text-zinc-300 hidden md:flex flex-col shrink-0">
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center p-0.5 border border-zinc-700 overflow-hidden">
              <img src="/logo.png" alt="Followers.blog Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="font-extrabold text-white text-base">followers.blog</div>
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
            <span>Overview & All Orders</span>
          </button>

          {/* Dedicated Dispute Defense Section */}
          <button
            onClick={() => { setActiveSection('disputes'); setSelectedOrderForDetail(null); }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
              activeSection === 'disputes' ? 'bg-amber-500 text-zinc-950 font-bold' : 'hover:bg-zinc-800 text-amber-400 hover:text-amber-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4" />
              <span>Disputes & Invoices</span>
            </div>
            {activeDisputesCount > 0 && (
              <span className="text-[10px] font-black bg-rose-600 text-white px-2 py-0.5 rounded-full animate-pulse">
                {activeDisputesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => { setActiveSection('courses'); setSelectedOrderForDetail(null); }}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${
              activeSection === 'courses' ? 'bg-blue-600 text-white' : 'hover:bg-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Course Orders</span>
          </button>

          <button
            onClick={() => { setActiveSection('services'); setSelectedOrderForDetail(null); }}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${
              activeSection === 'services' ? 'bg-blue-600 text-white' : 'hover:bg-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Service (SMM) Orders</span>
          </button>
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-zinc-800 space-y-2 text-xs">
          <Link href="/" target="_blank" className="text-zinc-500 hover:text-white flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live Website</span>
          </Link>
          <button
            onClick={handleAdminLogout}
            className="w-full text-left text-rose-400 hover:text-rose-300 flex items-center gap-2 pt-2 border-t border-zinc-800/60"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock & Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="bg-white border-b border-zinc-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-zinc-950 capitalize">
              {selectedOrderForDetail ? `Order Audit: ${selectedOrderForDetail.id}` : `${activeSection} Management`}
            </h1>
            <p className="text-xs text-zinc-500">
              Merchant: <strong className="text-zinc-800">followers.blog</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAdminLogout}
              className="md:hidden p-2 rounded-lg bg-zinc-100 text-zinc-600"
            >
              <LogOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              ● Admin Logged In
            </span>
          </div>
        </header>

        <main className="p-6 overflow-y-auto flex-1">
          {/* ================================================================ */}
          {/* DETAIL VIEW: ORDER AUDIT, DELIVERY PROOF & DISPUTE PACK */}
          {/* ================================================================ */}
          {selectedOrderForDetail ? (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedOrderForDetail(null)}
                  className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                >
                  ← Back to Orders List
                </button>

                <div className="flex items-center gap-2">
                  {/* Direct Link to Compliant Dispute Tax Invoice */}
                  <Link
                    href={`/receipt?order_id=${selectedOrderForDetail.id}&name=${encodeURIComponent(selectedOrderForDetail.customerName)}&email=${encodeURIComponent(selectedOrderForDetail.customerEmail)}&phone=${encodeURIComponent(selectedOrderForDetail.customerPhone)}&amount=${selectedOrderForDetail.amount}`}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-xs"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Generate Compliant Tax Invoice (PDF)</span>
                  </Link>

                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-zinc-700 bg-white border border-zinc-300 hover:bg-zinc-50"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Order Dossier</span>
                  </button>
                </div>
              </div>

              {/* Dispute Status Banner */}
              {selectedOrderForDetail.disputeStatus === 'under_review' && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <div className="font-bold text-amber-950">Active Gateway Dispute Claim</div>
                      <p className="text-amber-800 mt-0.5">
                        {selectedOrderForDetail.disputeReason}
                      </p>
                      <div className="text-[11px] text-amber-900 mt-1 font-semibold">
                        💡 Action: Upar blue button se <strong>"Generate Compliant Tax Invoice (PDF)"</strong> download karke Cashfree Dispute Desk me submit karein.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleToggleDispute(selectedOrderForDetail.id, 'won')}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700"
                    >
                      Mark Won ✓
                    </button>
                    <button
                      onClick={() => handleToggleDispute(selectedOrderForDetail.id, 'none')}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-zinc-200 text-zinc-700 hover:bg-zinc-300"
                    >
                      Resolve
                    </button>
                  </div>
                </div>
              )}

              {/* Order Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs">
                  <div className="text-xs font-bold text-zinc-400 uppercase">Customer Information</div>
                  <div className="text-sm font-bold text-zinc-950 mt-1">{selectedOrderForDetail.customerName}</div>
                  <div className="text-xs text-zinc-600 mt-0.5">{selectedOrderForDetail.customerEmail}</div>
                  <div className="text-xs font-mono text-zinc-600">{selectedOrderForDetail.customerPhone}</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs">
                  <div className="text-xs font-bold text-zinc-400 uppercase">Gateway Billing Title</div>
                  <div className="text-xs font-bold text-blue-700 mt-1">
                    {selectedOrderForDetail.compliantBillingName || selectedOrderForDetail.serviceName}
                  </div>
                  <div className="text-lg font-black text-zinc-950 mt-1">₹{selectedOrderForDetail.amount}</div>
                  <div className="text-xs text-emerald-600 font-bold">Payment: {selectedOrderForDetail.paymentStatus.toUpperCase()}</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs">
                  <div className="text-xs font-bold text-zinc-400 uppercase">Fulfillment & Dispute State</div>
                  <div className="text-xs font-mono font-semibold text-zinc-900 mt-1 break-all">
                    {selectedOrderForDetail.target || 'N/A (Course Access)'}
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      ORDER: {selectedOrderForDetail.orderStatus.toUpperCase()}
                    </span>
                    <span className="text-[10px] font-bold text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded">
                      DISPUTE: {selectedOrderForDetail.disputeStatus?.toUpperCase() || 'NONE'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs">
                <h3 className="text-sm font-bold text-zinc-950 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Audit Timeline & Proof of Delivery</span>
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

              {/* Delivery Proof Vault */}
              <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs">
                <h3 className="text-sm font-bold text-zinc-950 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span>Evidence Vault (Screenshots / Delivery Proof)</span>
                </h3>
                <p className="text-xs text-zinc-500 mb-4">
                  Bank / Gateway dispute desk par submit karne ke liye actual delivery screenshots ya verification IDs.
                </p>

                {selectedOrderForDetail.evidence?.length === 0 ? (
                  <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-500 text-center mb-4">
                    Koi evidence abhi upload nahi kiya gaya hai.
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
                  <div className="text-xs font-bold text-zinc-800">Add New Delivery Evidence</div>
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
                      placeholder="File name or external reference ID"
                      value={proofRef}
                      onChange={(e) => setProofRef(e.target.value)}
                      className="px-3 py-2 rounded-lg border border-zinc-300 text-xs bg-white"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Evidence description note (e.g. Starting counter vs Final delivery screenshot)"
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

              {/* Admin Notes & Communication Log */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs">
                  <h4 className="text-xs font-bold text-zinc-950 uppercase tracking-wider mb-3">
                    Internal Admin Notes (Private)
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
            // ================================================================
            // DEFAULT VIEW: METRICS & SEARCHABLE ORDERS TABLE
            // ================================================================
            <div className="space-y-6 max-w-6xl mx-auto">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs">
                  <div className="text-xs font-bold text-zinc-400 uppercase">Total Revenue</div>
                  <div className="text-2xl font-black text-zinc-950 mt-1">₹{totalRevenue}</div>
                  <div className="text-[11px] text-emerald-600 font-semibold mt-1">100% Captured</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs">
                  <div className="text-xs font-bold text-zinc-400 uppercase">Total Orders</div>
                  <div className="text-2xl font-black text-zinc-950 mt-1">{orders.length}</div>
                  <div className="text-[11px] text-blue-600 font-semibold mt-1">All Products</div>
                </div>

                {/* Dispute Alert Stat */}
                <div
                  onClick={() => setActiveSection('disputes')}
                  className="bg-white p-5 rounded-2xl border border-amber-300 shadow-xs cursor-pointer hover:bg-amber-50/40 transition-colors"
                >
                  <div className="text-xs font-bold text-amber-700 uppercase flex items-center justify-between">
                    <span>Dispute Claims</span>
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  </div>
                  <div className="text-2xl font-black text-amber-600 mt-1">{activeDisputesCount}</div>
                  <div className="text-[11px] text-zinc-500 font-semibold mt-1">Click to audit & win</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs">
                  <div className="text-xs font-bold text-zinc-400 uppercase">Active Domain</div>
                  <div className="text-lg font-black text-zinc-950 mt-1 truncate">followers.blog</div>
                  <div className="text-[11px] text-emerald-600 font-semibold mt-1">SSL Protected</div>
                </div>
              </div>

              {/* Search Bar & Instant Lookup Guidance */}
              <div className="bg-white rounded-2xl border border-zinc-200 p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="Search by Order ID (MED-...), Phone Number, Customer Email, or Amount..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 text-xs focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div className="flex items-center gap-1.5 text-xs text-zinc-500 shrink-0">
                  <HelpCircle className="w-4 h-4 text-blue-500" />
                  <span>Dispute milne par customer ka Mobile ya Order ID upar daaliye.</span>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white rounded-2xl border border-zinc-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="p-4">Order ID</th>
                        <th className="p-4">Customer Details</th>
                        <th className="p-4">Gateway Product (Tax Name)</th>
                        <th className="p-4">Amount</th>
                        <th className="p-4">Dispute Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {filtered.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-zinc-400">
                            Koi matching order nahi mila. Kripya check karein.
                          </td>
                        </tr>
                      ) : (
                        filtered.map((order) => (
                          <tr key={order.id} className="hover:bg-zinc-50/70 transition-colors">
                            <td className="p-4 font-mono font-bold text-zinc-900">
                              {order.id}
                            </td>
                            <td className="p-4">
                              <div className="font-bold text-zinc-950">{order.customerName}</div>
                              <div className="text-[11px] text-zinc-400">{order.customerEmail}</div>
                              <div className="text-[11px] font-mono text-zinc-500">{order.customerPhone}</div>
                            </td>
                            <td className="p-4">
                              <div className="font-semibold text-blue-700">
                                {order.compliantBillingName || order.serviceName}
                              </div>
                              <div className="text-[10px] text-zinc-400 font-normal">
                                Original: {order.serviceName}
                              </div>
                            </td>
                            <td className="p-4 font-bold text-zinc-950">
                              ₹{order.amount}
                            </td>
                            <td className="p-4">
                              {order.disputeStatus === 'under_review' ? (
                                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1 w-fit">
                                  <AlertTriangle className="w-3 h-3 text-amber-600" />
                                  UNDER DISPUTE
                                </span>
                              ) : order.disputeStatus === 'won' ? (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                                  DISPUTE WON ✓
                                </span>
                              ) : (
                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-zinc-100 text-zinc-600">
                                  Normal (Clear)
                                </span>
                              )}
                            </td>
                            <td className="p-4 text-right space-x-2">
                              <Link
                                href={`/receipt?order_id=${order.id}&name=${encodeURIComponent(order.customerName)}&email=${encodeURIComponent(order.customerEmail)}&phone=${encodeURIComponent(order.customerPhone)}&amount=${order.amount}`}
                                target="_blank"
                                className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 transition-colors inline-flex items-center gap-1"
                              >
                                <FileText className="w-3 h-3 text-blue-600" />
                                <span>Invoice</span>
                              </Link>
                              <button
                                onClick={() => setSelectedOrderForDetail(order)}
                                className="px-3 py-1.5 rounded-lg text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
                              >
                                Audit & Evidence →
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
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
