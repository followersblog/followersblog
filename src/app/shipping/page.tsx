import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Clock, ShieldCheck, Laptop } from 'lucide-react';

export default function ShippingDeliveryPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white py-12 sm:py-20 text-zinc-800 font-sans">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="border-b border-zinc-200 pb-6">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Fulfillment & Operations</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 mt-1">
              Shipping & Delivery Policy
            </h1>
            <p className="text-xs text-zinc-500 mt-1">Last Updated: October 2026</p>
          </div>

          <section className="space-y-6 text-sm leading-relaxed text-zinc-600">
            <div>
              <h2 className="text-lg font-bold text-zinc-950 mb-2">1. Nature of Products & Electronic Delivery</h2>
              <p>
                <strong>Followers.blog</strong> provides digital educational programs, live practical workshops (including the 3-Hour AI Website Building Practical Class), downloadable development assets, and digital strategy consultations. We do NOT ship physical goods through postal courier services. All products and services are fulfilled 100% electronically.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200">
                <Laptop className="w-5 h-5 text-blue-600 mb-2" />
                <h3 className="font-bold text-zinc-900 text-sm mb-1">Live Workshop & Class Access</h3>
                <p className="text-xs text-zinc-500">
                  Access credentials, private classroom video links, and starter code repositories are dispatched instantly to your registered email upon payment confirmation.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200">
                <Clock className="w-5 h-5 text-indigo-600 mb-2" />
                <h3 className="font-bold text-zinc-900 text-sm mb-1">Digital Creator Assets & Playbooks</h3>
                <p className="text-xs text-zinc-500">
                  Custom strategy reports and prompt toolkits are delivered electronically to your registered email and dashboard within 24 to 72 business hours.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-zinc-950 mb-2">2. Delivery Confirmation & Tax Invoice</h2>
              <p>
                Immediately after successful payment processing by our payment gateway partner Cashfree, an official computer-generated Tax Invoice and order confirmation is sent to your registered email address. You can also view and print your receipt directly from our student portal.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-zinc-950 mb-2">3. Non-Delivery or Delayed Access Support</h2>
              <p>
                In the rare event that your confirmation email or digital workshop credentials do not appear in your inbox within 15 minutes of payment:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 mt-2">
                <li>Please verify your spam/promotions folder for an email from <strong>orders@followers.blog</strong>.</li>
                <li>Ensure that the email address provided during checkout was spelled correctly.</li>
                <li>Contact our 24/7 support desk at <strong>support@followers.blog</strong> with your payment transaction ID, and our operations team will immediately re-dispatch your credentials.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold text-zinc-950 mb-2">4. Contact Delivery Desk</h2>
              <p>
                For any queries regarding delivery timelines or student portal credentials, contact: <br />
                <strong>Email:</strong> support@followers.blog <br />
                <strong>Operating Desk:</strong> Monday – Sunday, 9:00 AM – 11:00 PM IST
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
