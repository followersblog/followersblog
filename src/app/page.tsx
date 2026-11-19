'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import {
  CLOTHING_PRODUCTS,
  CURATED_COLLECTIONS,
  ClothingProduct,
  STORE_PROMOS
} from '@/data/clothing';
import {
  Flame,
  ArrowRight,
  Truck,
  RotateCcw,
  ShieldCheck,
  Star,
  ShoppingBag,
  Percent,
  Sparkles,
  Zap,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();

  // Quick View Modal State
  const [selectedProduct, setSelectedProduct] = useState<ClothingProduct | null>(null);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');

  // Filter products by collection
  const bapeCollection = CLOTHING_PRODUCTS.filter((p) => p.collectionType === 'bape');
  const oversizedTees = CLOTHING_PRODUCTS.filter((p) => p.collectionType === 'oversized-tees');
  const cargosAndBottoms = CLOTHING_PRODUCTS.filter((p) => p.collectionType === 'cargos');
  const womenSpecial = CLOTHING_PRODUCTS.filter(
    (p) => p.category === 'women' || p.collectionType === 'women-coords' || p.collectionType === 'women-dresses'
  );

  const heroBape = bapeCollection[0] || CLOTHING_PRODUCTS[0];

  const handleOpenQuickView = (prod: ClothingProduct) => {
    setSelectedProduct(prod);
    setActiveImgIndex(0);
    setSelectedSize(prod.sizes[0] || 'M');
  };

  const handleBuyNow = (prod: ClothingProduct, size?: string) => {
    router.push(`/checkout?productId=${prod.id}&size=${size || prod.sizes[0] || 'M'}&qty=1`);
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 flex flex-col selection:bg-red-600 selection:text-white">
      <Navbar />

      <main className="flex-1">
        
        {/* HERO SECTION: Editorial High Fashion Brand Style */}
        <section className="relative bg-zinc-950 text-white overflow-hidden py-14 sm:py-24 border-b border-zinc-900">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(220,38,38,0.18)_0%,_transparent_60%)] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Editorial Copy */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-black uppercase tracking-widest animate-pulse">
                  <Flame className="w-4 h-4 text-red-500" />
                  ARCHIVE DROP 2026 • FACTORY OUTLET RATES
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none uppercase">
                  HIGH STREET <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-300">
                    MASTER DROPS
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-zinc-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                  Heavyweight 240+ GSM Boxy Cuts, Japanese Tactical Cargos, and 7A Master 1st Copies. Everything direct from factory floors under ₹499 - ₹599.
                </p>

                {/* Offer Highlights Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="bg-zinc-900/90 p-3.5 rounded-2xl border border-zinc-800 text-left">
                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">First Order</span>
                    <span className="text-base sm:text-lg font-black text-amber-400">FLAT ₹100 OFF</span>
                    <span className="text-[10px] text-zinc-400 block">Auto code: WELCOME10</span>
                  </div>

                  <div className="bg-zinc-900/90 p-3.5 rounded-2xl border border-zinc-800 text-left">
                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Combo Deal</span>
                    <span className="text-base sm:text-lg font-black text-red-400">BUY 2 GET ₹150 OFF</span>
                    <span className="text-[10px] text-zinc-400 block">Mix any 2 items</span>
                  </div>

                  <div className="col-span-2 sm:col-span-1 bg-zinc-900/90 p-3.5 rounded-2xl border border-zinc-800 text-left">
                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Pan-India</span>
                    <span className="text-base sm:text-lg font-black text-emerald-400">3-5 DAYS</span>
                    <span className="text-[10px] text-zinc-400 block">Express Tracked Delivery</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3">
                  <Link
                    href="/collection/all"
                    className="px-8 py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-red-600/30 transition-all transform active:scale-95 flex items-center gap-2"
                  >
                    <span>Shop All Outfits</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href="#bape-highlight"
                    className="px-6 py-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-bold text-sm border border-zinc-800 transition-colors flex items-center gap-2"
                  >
                    <Flame className="w-4 h-4 text-red-500" />
                    <span>BAPE Shark 1st Copy (₹489)</span>
                  </a>
                </div>
              </div>

              {/* Right Hero Product Feature */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-900 group">
                  <div className="aspect-4/5 w-full overflow-hidden relative">
                    <img
                      src={heroBape.images[0]}
                      alt="BAPE Shark Hoodie 1st Copy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                  </div>

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 bg-red-600 text-white font-black text-[10px] sm:text-xs px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 fill-white" />
                    7A MASTER QUALITY / 1ST COPY
                  </div>

                  {/* Bottom Overlay Card */}
                  <div className="absolute bottom-4 left-4 right-4 p-5 rounded-2xl bg-zinc-950/90 backdrop-blur-md border border-zinc-800">
                    <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                      <span className="font-mono text-red-400 font-bold">A BATHING APE ®</span>
                      <span className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" /> 4.9 (521)
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-white line-clamp-1">
                      {heroBape.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      Heavy 340 GSM brush fleece • Full face zipper • Sleeve ape head tag
                    </p>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-800/80">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-black text-red-500">
                            ₹{heroBape.discountPrice}
                          </span>
                          <span className="text-xs text-zinc-500 line-through">
                            ₹{heroBape.originalPrice}
                          </span>
                        </div>
                        <span className="text-[10px] text-emerald-400 font-bold">
                          100% Instant Refund if Canceled
                        </span>
                      </div>

                      <button
                        onClick={() => handleBuyNow(heroBape)}
                        className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider shadow-md transition-all active:scale-95"
                      >
                        Grab Now →
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CURATED COLLECTIONS NAVIGATION (Visual Category Grid) */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-red-600 mb-1">
                Curated Archives
              </p>
              <h2 className="text-2xl sm:text-4xl font-black text-zinc-950 tracking-tight">
                Shop By Streetwear Category
              </h2>
            </div>
            <Link
              href="/collection/all"
              className="hidden sm:flex items-center gap-1 text-xs font-black uppercase tracking-wider text-zinc-950 hover:text-red-600"
            >
              <span>View All Outfits</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CURATED_COLLECTIONS.map((col) => (
              <Link
                key={col.id}
                href={`/collection/${col.id}`}
                className="group relative rounded-3xl overflow-hidden aspect-4/5 sm:aspect-square lg:aspect-4/5 bg-zinc-950 border border-zinc-200 shadow-xs hover:shadow-xl transition-all"
              >
                <img
                  src={col.bannerImg}
                  alt={col.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-zinc-950 font-black text-[9px] px-2.5 py-1 rounded-full uppercase tracking-widest">
                  {col.tag}
                </div>

                <div className="absolute bottom-5 left-5 right-5 space-y-1">
                  <h3 className="text-lg font-black text-white group-hover:text-red-400 transition-colors leading-snug">
                    {col.title}
                  </h3>
                  <p className="text-xs text-zinc-300 line-clamp-1">
                    {col.subtitle}
                  </p>
                  <p className="text-xs font-black text-amber-400 pt-1">
                    Starting at ₹{col.priceStarting} →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 1. HIGHLIGHT: BAPE 1ST COPY ARCHIVE SECTION */}
        <section id="bape-highlight" className="py-14 sm:py-20 bg-zinc-950 text-white border-y border-zinc-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-zinc-800">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wider mb-2">
                  <Flame className="w-3.5 h-3.5 fill-white" /> EXCLUSIVE MASTER REPLICA
                </div>
                <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
                  BAPE Shark Full-Zip Hoodies (1st Copy)
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
                  Clearly tagged 1st copy so you know you're getting exact master 7A craft at an honest factory price under ₹499.
                </p>
              </div>

              <Link
                href="/collection/bape"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-black uppercase tracking-wider border border-zinc-700"
              >
                <span>Explore BAPE Archive</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
              {bapeCollection.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-zinc-900/80 rounded-3xl border border-zinc-800 overflow-hidden p-6 flex flex-col md:flex-row gap-6 items-center hover:border-zinc-700 transition-colors"
                >
                  <div className="w-full md:w-56 aspect-square rounded-2xl overflow-hidden bg-zinc-950 shrink-0 border border-zinc-800 relative">
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded uppercase">
                      7A Master Quality
                    </div>
                  </div>

                  <div className="space-y-3 flex-1 w-full">
                    <div className="flex items-center justify-between text-xs text-zinc-400">
                      <span className="font-mono text-red-400 font-bold">{prod.brandTag}</span>
                      <span className="text-amber-400 font-bold flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400" /> {prod.rating}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-white">
                      {prod.name}
                    </h3>

                    <p className="text-xs text-zinc-400 line-clamp-2">
                      {prod.description}
                    </p>

                    <div className="flex items-center gap-3 pt-2">
                      <span className="text-2xl font-black text-red-500">
                        ₹{prod.discountPrice}
                      </span>
                      <span className="text-sm text-zinc-500 line-through">
                        ₹{prod.originalPrice}
                      </span>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                        80% OFF
                      </span>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <button
                        onClick={() => handleBuyNow(prod)}
                        className="flex-1 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Order Now (₹{prod.discountPrice})</span>
                      </button>

                      <button
                        onClick={() => handleOpenQuickView(prod)}
                        className="py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold border border-zinc-700"
                      >
                        Photos
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. COLLECTION: HEAVYWEIGHT OVERSIZED TEES */}
        <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8 pb-4 border-b border-zinc-200">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-red-600 mb-1">
                Under ₹299 Drops
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
                Heavyweight 240+ GSM Oversized Tees
              </h2>
            </div>
            <Link
              href="/collection/oversized-tees"
              className="text-xs font-black uppercase tracking-wider text-zinc-950 hover:text-red-600 flex items-center gap-1"
            >
              <span>View All Tees ({oversizedTees.length})</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {oversizedTees.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onQuickView={handleOpenQuickView}
              />
            ))}
          </div>
        </section>

        {/* 3. COLLECTION: TACTICAL CARGOS & PARACHUTE PANTS */}
        <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-zinc-100/70 rounded-3xl my-6">
          <div className="flex items-end justify-between mb-8 pb-4 border-b border-zinc-200">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-red-600 mb-1">
                Bottomwear Specials
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
                Baggy Tactical Cargos & Korean Trousers
              </h2>
            </div>
            <Link
              href="/collection/cargos"
              className="text-xs font-black uppercase tracking-wider text-zinc-950 hover:text-red-600 flex items-center gap-1"
            >
              <span>View Bottoms</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cargosAndBottoms.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onQuickView={handleOpenQuickView}
              />
            ))}
          </div>
        </section>

        {/* 4. COLLECTION: WOMEN'S Y2K CO-ORDS & FLOWY DRESSES */}
        <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8 pb-4 border-b border-zinc-200">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-red-600 mb-1">
                Pinterest Aesthetics
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
                Women's Trending Co-Ords & Dresses
              </h2>
            </div>
            <Link
              href="/collection/women"
              className="text-xs font-black uppercase tracking-wider text-zinc-950 hover:text-red-600 flex items-center gap-1"
            >
              <span>View Women Fits</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {womenSpecial.slice(0, 3).map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onQuickView={handleOpenQuickView}
              />
            ))}
          </div>
        </section>

        {/* COMBO DISCOUNT BANNER */}
        <section className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white py-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/20 text-white text-xs font-black uppercase tracking-widest">
              <Zap className="w-4 h-4 text-yellow-300" /> AUTOMATIC COMBO SAVINGS
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              BUY ANY 2 CLOTHES & GET FLAT ₹150 OFF INSTANTLY!
            </h2>

            <p className="text-sm sm:text-base text-red-100 max-w-xl mx-auto font-medium">
              Mix and match BAPE Jackets, Oversized Graphic Tees, and Tactical Cargos. Discount automatically deducts at checkout!
            </p>

            <div className="pt-2">
              <Link
                href="/collection/all"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-zinc-950 hover:bg-black text-white font-black text-sm uppercase tracking-wider shadow-xl transition-all active:scale-95"
              >
                <span>Select Your 2 Items Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* MULTI-IMAGE QUICK VIEW MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-black font-bold bg-zinc-100 hover:bg-zinc-200 w-9 h-9 rounded-full flex items-center justify-center transition-colors"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
              {/* Left Photos */}
              <div className="space-y-3">
                <div className="aspect-square w-full rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200">
                  <img
                    src={selectedProduct.images[activeImgIndex]}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex gap-2">
                  {selectedProduct.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImgIndex(i)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImgIndex === i ? 'border-red-600 scale-95' : 'border-zinc-200 opacity-70'
                      }`}
                    >
                      <img src={img} alt="Angle" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-red-50 text-red-600 px-2.5 py-1 rounded-md border border-red-200">
                    {selectedProduct.badge}
                  </span>
                  <span className="text-xs font-mono text-zinc-500 font-bold">
                    {selectedProduct.brandTag}
                  </span>
                </div>

                <h3 className="text-xl font-black text-zinc-950 leading-tight">
                  {selectedProduct.name}
                </h3>

                <p className="text-xs text-zinc-600 leading-relaxed font-medium">
                  {selectedProduct.description}
                </p>

                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-red-600">
                    ₹{selectedProduct.discountPrice}
                  </span>
                  <span className="text-sm text-zinc-400 line-through">
                    ₹{selectedProduct.originalPrice}
                  </span>
                </div>

                {/* Size picker */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-zinc-700 mb-2">
                    Select Size:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-3 py-1.5 text-xs font-black rounded-lg border transition-all ${
                          selectedSize === sz
                            ? 'bg-zinc-950 text-white border-zinc-950'
                            : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleBuyNow(selectedProduct, selectedSize)}
                  className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-red-600/20 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Buy Now for ₹{selectedProduct.discountPrice}</span>
                </button>

                <div className="pt-2 text-[11px] text-zinc-500 space-y-1">
                  <p className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-emerald-600" />
                    Dispatched in 24 hrs • 3-5 days delivery
                  </p>
                  <p className="flex items-center gap-1.5">
                    <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
                    100% Instant Refund on cancellation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
