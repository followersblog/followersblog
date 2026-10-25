'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Printer, ShieldCheck, CheckCircle2, FileText, ArrowLeft } from 'lucide-react';

function ReceiptContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id') || 'MED-849102-AI7Z';
  const name = searchParams.get('name') || 'Valued Customer';
  const email = searchParams.get('email') || 'customer@followers.blog';
  const phone = searchParams.get('phone') || '+91 98XXXXXXXX';
  const amount = searchParams.get('amount') || '299';
  const date = searchParams.get('date') || new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  // Compliant naming: Course/Consultation instead of SMM
  const isCourse = orderId.startsWith('CRS');
  const itemName = isCourse
    ? 'AI Website Building — 3-Hour Live Interactive Practical Class'
    : `Digital Creator Media Strategy & Growth Training Program (Tier ₹${amount})`;

  const itemCategory = isCourse
    ? 'Digital Education & E-Learning Workshop'
    : 'Creator Marketing Strategy & Digital Asset Bundle';

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 font-sans text-zinc-900">
      {/* Action Bar (Hidden when printing) */}
      <div className="flex items-center justify-between mb-6 print:hidden">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-zinc-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save Tax Invoice (PDF)</span>
        </button>
      </div>

      {/* Official Invoice Card */}
      <div className="bg-white rounded-3xl border border-zinc-200 p-8 sm:p-12 shadow-sm text-left space-y-8 print:border-none print:shadow-none print:p-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200">
          <div>
            <div className="text-2xl font-black tracking-tight text-zinc-950">
              Followers<span className="text-blue-600">.blog</span>
            </div>
            <p className="text-xs text-zinc-500 font-semibold mt-0.5">
              Digital E-Learning & Media Consultation Platform
            </p>
            <p className="text-[11px] text-zinc-400">
              Official Desk: support@followers.blog • https://followers.blog
            </p>
          </div>

          <div className="sm:text-right">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 mb-1">
              PAID & COMPLETED
            </span>
            <div className="text-xs text-zinc-500">Invoice Ref:</div>
            <div className="text-sm font-mono font-bold text-zinc-950">{orderId}</div>
          </div>
        </div>

        {/* Invoice Meta Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div>
            <div className="font-bold text-zinc-400 uppercase tracking-wider text-[10px] mb-1">
              Billed To (Customer Information)
            </div>
            <div className="font-bold text-zinc-900 text-sm">{name}</div>
            <div className="text-zinc-600 mt-0.5">Email: {email}</div>
            <div className="text-zinc-600">Phone: {phone}</div>
          </div>

          <div className="sm:text-right">
            <div className="font-bold text-zinc-400 uppercase tracking-wider text-[10px] mb-1">
              Payment & Dispatch Info
            </div>
            <div className="text-zinc-700"><strong>Date of Issue:</strong> {date}</div>
            <div className="text-zinc-700"><strong>Payment Gateway:</strong> Cashfree Payments (Verified 256-Bit SSL)</div>
            <div className="text-zinc-700"><strong>Delivery Mode:</strong> Electronic / Digital Access Dispatched</div>
          </div>
        </div>

        {/* Item Table */}
        <div className="border border-zinc-200 rounded-2xl overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-zinc-50 text-zinc-500 font-bold uppercase text-[10px] border-b border-zinc-200">
              <tr>
                <th className="p-4">Item & Description</th>
                <th className="p-4">Classification</th>
                <th className="p-4 text-right">Amount (INR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              <tr>
                <td className="p-4">
                  <div className="font-bold text-zinc-950 text-sm">{itemName}</div>
                  <div className="text-zinc-500 text-[11px] mt-0.5">
                    Full digital course assets, curriculum frameworks, and creator consulting delivery.
                  </div>
                </td>
                <td className="p-4 text-zinc-600 text-[11px]">
                  {itemCategory}
                </td>
                <td className="p-4 text-right font-black text-sm text-zinc-950">
                  ₹{amount}.00
                </td>
              </tr>
            </tbody>
            <tfoot className="bg-zinc-50/70 border-t border-zinc-200">
              <tr>
                <td colSpan={2} className="p-4 text-right font-bold text-zinc-700 uppercase text-xs">
                  Total Paid:
                </td>
                <td className="p-4 text-right font-black text-base text-blue-600">
                  ₹{amount}.00
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* ================================================================== */}
        {/* DISPUTE & CHARGEBACK PROTECTION LEGAL CLAUSE (CRITICAL FOR GATEWAYS) */}
        {/* ================================================================== */}
        <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 text-left space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-800 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Official Gateway & Banking Notice (Chargeback Defense)</span>
          </div>
          <p className="text-[11px] text-zinc-600 leading-relaxed">
            This document certifies the successful electronic delivery and fulfillment of digital educational curriculum and creator consultation assets provided by <strong>Followers.blog</strong>. 
            The customer affirmed consent to the Terms of Service and Digital Goods Refund Policy prior to checkout. As these educational assets are non-tangible and dispatched instantly, claims of &ldquo;services not rendered&rdquo; or unauthorized billing disputes are refuted by digital timestamp logs and SMS/WhatsApp contact verification records.
          </p>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-400 gap-2">
          <div>Followers.blog • Computer Generated Tax Invoice • No Signature Required</div>
          <div>Authorized Electronic Voucher</div>
        </div>
      </div>
    </div>
  );
}

export default function ReceiptPage() {
  return (
    <div className="min-h-screen bg-zinc-100/70 py-6">
      <Suspense fallback={<div className="text-center py-20">Loading invoice...</div>}>
        <ReceiptContent />
      </Suspense>
    </div>
  );
}
