import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RefundPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white py-12 sm:py-20 text-zinc-800 font-sans">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="border-b border-zinc-200 pb-6">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Customer Assurance</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 mt-1">
              Refund & Cancellation Policy
            </h1>
            <p className="text-xs text-zinc-500 mt-1">Last Updated: October 2026</p>
          </div>

          <section className="space-y-4 text-sm leading-relaxed text-zinc-600">
            <h2 className="text-lg font-bold text-zinc-950">1. Digital Course Cancellation & Refund</h2>
            <p>
              At <strong>Followers.blog</strong>, we are committed to providing top-quality education through our <strong>AI Website Building Practical Class</strong>.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Pre-Class Cancellation:</strong> If you request cancellation at least 12 hours before the scheduled live class, you will receive a <strong>100% full refund</strong> with no questions asked.
              </li>
              <li>
                <strong>Session Rescheduling:</strong> If you are unable to attend the live session, you may request a free transfer to the next available batch or access the complete HD video recording and code repository.
              </li>
              <li>
                <strong>Class Postponement:</strong> In the rare event that Followers.blog cancels or postpones a scheduled class, enrolled students are offered the choice of an immediate 100% refund or an automatic transfer to the rescheduled date.
              </li>
            </ul>

            <h2 className="text-lg font-bold text-zinc-950">2. Digital Marketing Strategy & Creator Asset Bundles</h2>
            <p>
              For our digital creator toolkits, marketing strategy guides, and downloadable template packs:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Non-Delivery Guarantee:</strong> If your purchased digital assets or strategy report is not delivered to your student dashboard or registered email within 72 hours, a full 100% refund will be issued.
              </li>
              <li>
                <strong>Content Quality Guarantee:</strong> If the digital materials received do not match the specified syllabus outline, our support desk provides free revisions and replacement modules.
              </li>
            </ul>

            <h2 className="text-lg font-bold text-zinc-950">3. Refund Processing Timelines</h2>
            <p>
              Approved refunds are initiated immediately and credited back to the original source account (UPI, Debit/Credit Card, NetBanking) via our payment gateway partner Cashfree within <strong>3 to 7 business days</strong>.
            </p>

            <h2 className="text-lg font-bold text-zinc-950">4. How to Request a Refund</h2>
            <p>
              To submit a refund or cancellation request, please email our support desk at <strong>support@followers.blog</strong> with your <strong>Order ID</strong> and registered email address.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
