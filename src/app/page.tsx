'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CLOTHING_PRODUCTS, ClothingProduct, STORE_PROMOS } from '@/data/clothing';
import {
  Sparkles,
  ShoppingBag,
  Flame,
  Star,
  Truck,
  RotateCcw,
  ShieldCheck,
  Tag,
  ArrowRight,
  Zap,
  CheckCircle2,
  ChevronRight,
  Eye,
  Heart
} from 'lucide-react';

export default function ClothingHomePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'all' | 'men' | 'women'>('all');
  const [selectedProductForModal, setSelectedProductForModal] = useState<ClothingProduct | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>('');

  const filteredProducts = activeTab === 'all'
    ? CLOTHING_PRODUCTS
    : CLOTHING_PRODUCTS.filter((p) => p.category === activeTab || p.category === 'unisex');

  const bapeProduct = CLOTHING_PRODUCTS.find((p) => p.isFirstCopy) || CLOTHING_PRODUCTS[0];

  const openProductQuickView = (product: ClothingProduct) => {
    setSelectedProductForModal(product);
    setActiveImageIndex(0);
    setSelectedSize(product.sizes[0] || 'M');
  };

  const handleDirectBuy = (product: ClothingProduct, size?: string) => {
    const chosenSize = size || product.sizes[0] || 'M';
    router.push(`/checkout?productId=${product.id}&size=${chosenSize}&qty=1`);
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col selection:bg-red-500 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION: High Conversion Urgency */}
        <section className="relative overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-zinc-800">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Headline */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-black uppercase tracking-wider animate-pulse">
                  <Flame className="w-4 h-4 text-red-500" />
                  Flash Drop • Under ₹499 - ₹599 Streetwear Sale
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none">
                  Top Trending Drops <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-rose-500">
                    At Unbeatable Factory Rates
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-zinc-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Heavyweight Oversized Tees, Korean Trousers, Aesthetic Fits & Master 1st Copies. Dispatched in 24 hrs with 100% instant refund guarantee!
                </p>

                {/* Offer Callouts */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="bg-zinc-800/80 p-3 rounded-xl border border-zinc-700/60 text-left">
                    <p className="text-xs text-zinc-400 font-semibold uppercase">First Order</p>
                    <p className="text-sm sm:text-base font-extrabold text-amber-400">FLAT ₹100 OFF</p>
                    <p className="text-[10px] text-zinc-400">Auto code: WELCOME10</p>
                  </div>

                  <div className="bg-zinc-800/80 p-3 rounded-xl border border-zinc-700/60 text-left">
                    <p className="text-xs text-zinc-400 font-semibold uppercase">Combo Offer</p>
                    <p className="text-sm sm:text-base font-extrabold text-red-400">BUY 2 GET ₹150 OFF</p>
                    <p className="text-[10px] text-zinc-400">Mix any Men & Women fit</p>
                  </div>

                  <div className="col-span-2 sm:col-span-1 bg-zinc-800/80 p-3 rounded-xl border border-zinc-700/60 text-left">
                    <p className="text-xs text-zinc-400 font-semibold uppercase">Super Fast</p>
                    <p className="text-sm sm:text-base font-extrabold text-emerald-400">3-5 DAYS DELIVERY</p>
                    <p className="text-[10px] text-zinc-400">Pan-India express shipping</p>
                  </div>
                </div>

                {/* Hero CTAs */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3">
                  <a
                    href="#all-products"
                    className="px-7 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 font-extrabold text-white text-sm shadow-lg shadow-red-600/30 transition-transform active:scale-95 flex items-center gap-2"
                  >
                    <span>Shop All Fits Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <a
                    href="#bape-drop"
                    className="px-6 py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 font-bold text-zinc-200 text-sm border border-zinc-700 transition-colors flex items-center gap-2"
                  >
                    <Flame className="w-4 h-4 text-red-500" />
                    <span>View BAPE Shark (1st Copy)</span>
                  </a>
                </div>
              </div>

              {/* Right Hero Visual Feature */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-2xl overflow-hidden border border-zinc-700 shadow-2xl bg-zinc-900 group">
                  <div className="relative aspect-4/5 sm:aspect-square lg:aspect-4/5 w-full overflow-hidden">
                    <img
                      src={bapeProduct.images[0]}
                      alt="Featured Drop"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  </div>

                  {/* Badge */}
                  <div className="absolute top-4 left-4 bg-red-600 text-white font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    7A Quality / 1st Copy Edition
                  </div>

                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-amber-300 font-bold text-xs px-2.5 py-1 rounded-lg border border-amber-400/30 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    4.9 (428 reviews)
                  </div>

                  {/* Product overlay card */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-zinc-900/90 backdrop-blur-md border border-zinc-700/80">
                    <h3 className="text-base font-bold text-white line-clamp-1">
                      {bapeProduct.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Master replica street jacket with full zip hood
                    </p>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-800">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-black text-red-500">
                            ₹{bapeProduct.discountPrice}
                          </span>
                          <span className="text-xs text-zinc-500 line-through">
                            ₹{bapeProduct.originalPrice}
                          </span>
                        </div>
                        <span className="text-[10px] text-emerald-400 font-bold">
                          Save ₹{bapeProduct.originalPrice - bapeProduct.discountPrice} Today
                        </span>
                      </div>

                      <button
                        onClick={() => handleDirectBuy(bapeProduct)}
                        className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-black shadow-md transition-transform active:scale-95"
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

        {/* TRUST BANNER: 4 Pillars of High Sales */}
        <section className="bg-white border-b border-zinc-200 py-6 px-4 sm:px-6 lg:px-8 shadow-xs">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-2">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-zinc-900">3-5 Days Delivery</p>
                <p className="text-[11px] text-zinc-500">Fast pan-India dispatch</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-zinc-900">100% Instant Refund</p>
                <p className="text-[11px] text-zinc-500">1-click order cancellation</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-zinc-900">1st Copy Transparency</p>
                <p className="text-[11px] text-zinc-500">7A Master replica tags</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-zinc-900">Under ₹499 - ₹599</p>
                <p className="text-[11px] text-zinc-500">Unbeatable factory pricing</p>
              </div>
            </div>
          </div>
        </section>

        {/* SPOTLIGHT: BAPE Shark Jacket Drop (1st Copy Special) */}
        <section id="bape-drop" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-zinc-100">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 text-white rounded-3xl p-6 sm:p-10 border border-zinc-800 shadow-xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Images Preview Slider */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900">
                    <img
                      src={bapeProduct.images[0]}
                      alt="BAPE Shark Jacket 1st copy"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-red-600 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                      7A Quality / 1st Copy
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {bapeProduct.images.map((img, idx) => (
                      <div
                        key={idx}
                        className="aspect-square rounded-xl overflow-hidden border border-zinc-800 hover:border-red-500 transition-colors"
                      >
                        <img src={img} alt="BAPE Angle" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Details & Direct Buy */}
                <div className="lg:col-span-6 space-y-5">
                  <div className="inline-block px-3 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-black uppercase">
                    ⭐ Master First Copy Special Drop
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-black text-white">
                    {bapeProduct.name}
                  </h2>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    Aapko original 30,000+ ki jacket lene ki koi zarurat nahi! Ye <strong className="text-white font-bold">1st Copy / 7A Master Quality</strong> replica same heavy cotton fleece, signature shark mask zipper aur custom street camo print ke sath aati hai. Transparency ke sath bataya gaya hai taki koi confuse na ho.
                  </p>

                  <div className="flex items-center gap-3 py-2">
                    <span className="text-3xl sm:text-4xl font-black text-red-500">
                      ₹{bapeProduct.discountPrice}
                    </span>
                    <span className="text-base text-zinc-500 line-through">
                      ₹{bapeProduct.originalPrice}
                    </span>
                    <span className="text-xs font-extrabold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                      80% OFF (Factory Rate)
                    </span>
                  </div>

                  {/* Highlights list */}
                  <div className="space-y-2 border-t border-zinc-800 pt-4 text-xs text-zinc-300">
                    {bapeProduct.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Buy Button */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      onClick={() => handleDirectBuy(bapeProduct)}
                      className="w-full sm:w-auto flex-1 py-4 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-base shadow-lg shadow-red-600/30 transition-all transform active:scale-98 flex items-center justify-center gap-2"
                    >
                      <span>Order BAPE Shark Jacket (₹{bapeProduct.discountPrice})</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => openProductQuickView(bapeProduct)}
                      className="w-full sm:w-auto py-4 px-6 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-sm border border-zinc-700"
                    >
                      View All Angles
                    </button>
                  </div>

                  <p className="text-[11px] text-zinc-400 flex items-center gap-1.5 justify-center sm:justify-start">
                    <Truck className="w-3.5 h-3.5 text-emerald-400" />
                    Delivered in 3-5 days • Full Instant Refund if canceled
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ALL PRODUCTS CATALOG: Men & Women */}
        <section id="all-products" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
                Trending Streetwear & Outfits
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                Highest selling fits on Instagram & Pinterest • Prices starting at just ₹289!
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center bg-zinc-200/80 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'all'
                    ? 'bg-white text-zinc-900 shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                All Outfits ({CLOTHING_PRODUCTS.length})
              </button>
              <button
                id="shop-men"
                onClick={() => setActiveTab('men')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'men'
                    ? 'bg-white text-zinc-900 shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                Men's Drips
              </button>
              <button
                id="shop-women"
                onClick={() => setActiveTab('women')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'women'
                    ? 'bg-white text-zinc-900 shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                Women's Fits
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col group"
              >
                {/* Image Container with Badge */}
                <div className="relative aspect-4/5 w-full bg-zinc-100 overflow-hidden">
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Badge */}
                  {prod.badge && (
                    <div className="absolute top-3 left-3 bg-zinc-900 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                      {prod.badge}
                    </div>
                  )}

                  {/* Quick Angle View Button */}
                  <button
                    onClick={() => openProductQuickView(prod)}
                    className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-zinc-800 p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-md text-xs font-bold flex items-center gap-1"
                    title="View 2-3 Photos"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Photos</span>
                  </button>
                </div>

                {/* Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-zinc-500 mb-1">
                      <span className="font-semibold uppercase tracking-wider">{prod.type}</span>
                      <span className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3 h-3 fill-amber-500" />
                        {prod.rating} ({prod.reviewsCount})
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-zinc-900 line-clamp-2 group-hover:text-red-600 transition-colors">
                      {prod.name}
                    </h3>
                  </div>

                  <div>
                    {/* Live Buyer Count */}
                    <p className="text-[10px] font-medium text-emerald-600 flex items-center gap-1 mb-2">
                      <Flame className="w-3 h-3 text-red-500 shrink-0" />
                      <span>{prod.boughtInLastHour} people ordered in last hour</span>
                    </p>

                    {/* Price and Buy Button */}
                    <div className="flex items-center justify-between pt-2 border-t border-zinc-100">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-lg font-black text-red-600">
                            ₹{prod.discountPrice}
                          </span>
                          <span className="text-xs text-zinc-400 line-through">
                            ₹{prod.originalPrice}
                          </span>
                        </div>
                        <span className="text-[10px] text-emerald-600 font-bold">
                          {Math.round(((prod.originalPrice - prod.discountPrice) / prod.originalPrice) * 100)}% OFF
                        </span>
                      </div>

                      <button
                        onClick={() => handleDirectBuy(prod)}
                        className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-red-600 text-white text-xs font-bold transition-colors shadow-xs"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROMO / COMBO SECTION */}
        <section id="offers" className="py-12 bg-gradient-to-r from-red-600 to-amber-600 text-white px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider">
              <Zap className="w-4 h-4 text-yellow-300" />
              Special High-Volume Combo
            </div>

            <h2 className="text-3xl sm:text-4xl font-black">
              BUY ANY 2 CLOTHES & GET FLAT ₹150 OFF INSTANTLY!
            </h2>

            <p className="text-sm text-red-100 max-w-xl mx-auto">
              Discount automatically checkout page par minus ho jata hai. Combine oversized tees with cargos, BAPE jacket, or dresses!
            </p>

            <div className="pt-2">
              <a
                href="#all-products"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-red-600 font-black text-sm shadow-xl hover:bg-zinc-100 transition-all transform active:scale-95"
              >
                <span>Pick Your Combo Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* QUICK VIEW MULTI-IMAGE MODAL */}
      {selectedProductForModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative">
            <button
              onClick={() => setSelectedProductForModal(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-800 text-sm font-bold bg-zinc-100 w-8 h-8 rounded-full flex items-center justify-center"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
              {/* Image gallery */}
              <div className="space-y-3">
                <div className="aspect-square w-full rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200">
                  <img
                    src={selectedProductForModal.images[activeImageIndex]}
                    alt={selectedProductForModal.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Thumbnails */}
                <div className="flex gap-2">
                  {selectedProductForModal.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImageIndex(i)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImageIndex === i ? 'border-red-600 scale-95' : 'border-zinc-200 opacity-70'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-4">
                {selectedProductForModal.badge && (
                  <span className="text-xs font-black text-red-600 bg-red-50 px-2.5 py-1 rounded-full uppercase">
                    {selectedProductForModal.badge}
                  </span>
                )}

                <h3 className="text-xl font-black text-zinc-900">
                  {selectedProductForModal.name}
                </h3>

                <p className="text-xs text-zinc-600 leading-relaxed">
                  {selectedProductForModal.description}
                </p>

                <div className="flex items-center gap-3">
                  <span className="text-2xl font-black text-red-600">
                    ₹{selectedProductForModal.discountPrice}
                  </span>
                  <span className="text-sm text-zinc-400 line-through">
                    ₹{selectedProductForModal.originalPrice}
                  </span>
                </div>

                {/* Size picker */}
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase mb-2">
                    Select Size:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedProductForModal.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                          selectedSize === sz
                            ? 'bg-zinc-900 text-white border-zinc-900'
                            : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Direct Buy */}
                <button
                  onClick={() => {
                    handleDirectBuy(selectedProductForModal, selectedSize);
                  }}
                  className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Buy Now for ₹{selectedProductForModal.discountPrice}</span>
                </button>

                <div className="text-[11px] text-zinc-500 space-y-1">
                  <p>✓ 3-5 Days Express Delivery with full live tracking</p>
                  <p>✓ 100% Instant Refund on cancellation</p>
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
