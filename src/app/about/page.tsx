import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Sparkles, Code2, Rocket, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white py-12 sm:py-20 text-zinc-800 font-sans">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="border-b border-zinc-200 pb-6 text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Our Mission
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 mt-2">
              About Followers.blog
            </h1>
            <p className="text-sm text-zinc-600 mt-2">
              Empowering next-generation digital creators, freelancers, and businesses with modern AI website development skills and social growth infrastructure.
            </p>
          </div>

          <div className="space-y-6 text-sm text-zinc-600 leading-relaxed">
            <p>
              Founded in 2026, <strong>Followers.blog</strong> was built on a simple vision: web development should no longer take months of complex coding syntax. With modern autonomous AI tooling and rapid full-stack frameworks like Next.js and Supabase, anyone can bring their digital ideas to life in hours.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200">
                <Code2 className="w-6 h-6 text-blue-600 mb-2" />
                <h3 className="font-bold text-zinc-900 text-sm mb-1">Practical Education</h3>
                <p className="text-xs text-zinc-500">
                  Hands-on 3-hour live workshops teaching real-world AI coding, Supabase databases, and deployment.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200">
                <Rocket className="w-6 h-6 text-indigo-600 mb-2" />
                <h3 className="font-bold text-zinc-900 text-sm mb-1">Creator Acceleration</h3>
                <p className="text-xs text-zinc-500">
                  High-retention social growth packages designed to help creators gain initial traction safely.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200">
                <ShieldCheck className="w-6 h-6 text-emerald-600 mb-2" />
                <h3 className="font-bold text-zinc-900 text-sm mb-1">Transparency & Trust</h3>
                <p className="text-xs text-zinc-500">
                  Zero fake countdowns, clear honest pricing, and dedicated customer support via Telegram & Email.
                </p>
              </div>
            </div>

            <h2 className="text-lg font-bold text-zinc-950">Our Commitment</h2>
            <p>
              Whether you are an aspiring freelancer looking to deliver high-ticket websites to clients, a student looking to master modern generative AI coding, or a creator growing their channel reach, Followers.blog provides the exact tools, templates, and community to accelerate your journey.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
