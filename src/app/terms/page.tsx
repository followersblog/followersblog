import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white py-12 sm:py-20 text-zinc-800 font-sans">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="border-b border-zinc-200 pb-6">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Compliance & Legal</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 mt-1">
              Terms and Conditions
            </h1>
            <p className="text-xs text-zinc-500 mt-1">Last Updated: October 2026</p>
          </div>

          <section className="space-y-4 text-sm leading-relaxed text-zinc-600">
            <h2 className="text-lg font-bold text-zinc-950">1. Acceptance of Terms</h2>
            <p>
              By accessing and using <strong>Followers.blog</strong> (&ldquo;Website&rdquo;, &ldquo;Platform&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;), you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our website or purchase our digital educational workshops, strategy guides, or creator consultation programs.
            </p>

            <h2 className="text-lg font-bold text-zinc-950">2. Educational Services & Digital Products</h2>
            <p>
              Followers.blog provides digital educational courses, practical live workshops (including the 3-Hour AI Website Building Practical Class), prompt packs, design templates, and digital marketing consultation assets. All course materials, video recordings, prompts, code frameworks, and digital boilerplates are protected by intellectual property laws and are intended solely for the personal educational use of the enrolled student.
            </p>

            <h2 className="text-lg font-bold text-zinc-950">3. User Obligations & Accurate Information</h2>
            <p>
              When purchasing digital education modules or workshop admissions, you agree to provide truthful, accurate, and complete contact information (Full Name, active Email, and Phone number). We never ask for, nor should you ever disclose, any third-party account passwords.
            </p>

            <h2 className="text-lg font-bold text-zinc-950">4. Payments, Pricing & Billing</h2>
            <p>
              All prices listed on Followers.blog are denominated in Indian Rupees (INR) and are inclusive of applicable taxes unless specified otherwise. Payments are securely processed through verified payment partners (including Cashfree Payments). By initiating a payment, you authorize our payment partner to charge the specified amount to your selected payment method.
            </p>

            <h2 className="text-lg font-bold text-zinc-950">5. Delivery & Fulfillment Timelines</h2>
            <p>
              Digital educational access details (webinar links, classroom portal credentials, syllabus resources) are dispatched immediately upon electronic payment confirmation. For custom digital marketing consultations and strategy packs, fulfillment is completed electronically via your student portal and registered email within 24 to 72 hours.
            </p>

            <h2 className="text-lg font-bold text-zinc-950">6. Limitation of Liability</h2>
            <p>
              In no event shall Followers.blog, its instructors, or affiliates be liable for any indirect, incidental, or consequential damages arising from the implementation of our educational training materials.
            </p>

            <h2 className="text-lg font-bold text-zinc-950">7. Contact Information</h2>
            <p>
              For legal inquiries or clarifications regarding these Terms, please contact: <br />
              <strong>Email:</strong> support@followers.blog <br />
              <strong>Official Website:</strong> https://follower.blog <br />
              <strong>Registered Address:</strong> 237-3 Mayakund, Rishikesh, Dehradun, Uttarakhand - 249201, India
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
