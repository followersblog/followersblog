'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import {
  CLOTHING_PRODUCTS,
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
  ChevronRight,
  Gift,
  Filter
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'all' | 'under249' | 'premium499'>('all');
  const [selectedProduct, setSelectedProduct] = useState<ClothingProduct | null>(null);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');

  // Filter products by tab
  let displayedProducts = CLOTHING_PRODUCTS;
  if (activeTab === 'under249') {
    displayedProducts = CLOTHING_PRODUCTS.filter((p) => p.discountPrice <= 300);
  } else if (activeTab === 'premium499') {
    displayedProducts = CLOTHING_PRODUCTS.filter((p) => p.discountPrice > 300);
  }

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
        
        {/* COMPACT HIGH-CONVERSION SALES BANNER (Zero boring text, pure offer) */}
        <section className="bg-zinc-950 text-white border-b border-zinc-900 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-widest animate-pulse">
                <Flame className="w-3.5 h-3.5 fill-white" /> VIRAL INSTAGRAM HOODIE ARCHIVE 2026
              </div>
              <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
                Trending Hoodies Drop • Starting ₹249
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 font-medium">
                3D Ribcage Horn Hoodies, Asian Dragons, Layered Coats & Spider Y2K Fits.
              </p>
            </div>

            {/* BOGO & Coupon Chips */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="bg-red-600 text-white px-4 py-2.5 rounded-2xl flex items-center gap-2 shadow-md">
                <Gift className="w-5 h-5 text-yellow-300" />
                <div className="text-left">
                  <p className="text-xs font-black uppercase">BUY 1 GET 1 FREE</p>
                  <p className="text-[10px] text-red-100">Add 2, 2nd is 100% Free</p>
                </div>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 text-white px-4 py-2.5 rounded-2xl flex items-center gap-2">
                <Percent className="w-5 h-5 text-amber-400" />
                <div className="text-left">
                  <p className="text-xs font-black uppercase text-amber-400">EXTRA OFF AT CHECKOUT</p>
                  <p className="text-[10px] text-zinc-400">₹50 OFF (₹249) • ₹100 OFF (₹499)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST ICONS STRIP */}
        <div className="bg-white border-b border-zinc-200 py-3.5 px-4 sm:px-6 lg:px-8 shadow-xs">
          <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-black text-zinc-800">
              <Truck className="w-4 h-4 text-red-600" />
              <span>3-5 Days Express Delivery</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-black text-zinc-800">
              <RotateCcw className="w-4 h-4 text-emerald-600" />
              <span>100% Instant Refund</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-black text-zinc-800">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Transparent 7A Master Quality</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-black text-zinc-800">
              <Gift className="w-4 h-4 text-amber-600" />
              <span>BOGO Live (Buy 1 Get 1 Free)</span>
            </div>
          </div>
        </div>

        {/* MAIN HOODIE SHOWCASE LISTING FEED */}
        <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Filter Tabs Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-zinc-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-zinc-950 uppercase tracking-tight flex items-center gap-2">
                <span>Featured Hoodies Collection</span>
                <span className="text-xs bg-red-100 text-red-700 px-2.5 py-0.5 rounded-full font-bold">
                  {displayedProducts.length} Live Drops
                </span>
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                Click on any hoodie to select size and order directly in 1-click.
              </p>
            </div>

            {/* Price Filter Segment */}
            <div className="flex items-center bg-zinc-200/80 p-1 rounded-2xl text-xs font-black uppercase">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeTab === 'all'
                    ? 'bg-zinc-950 text-white shadow-xs'
                    : 'text-zinc-700 hover:text-black'
                }`}
              >
                All Hoodies
              </button>
              <button
                onClick={() => setActiveTab('under249')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeTab === 'under249'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-zinc-700 hover:text-black'
                }`}
              >
                ₹249 Drops (Save ₹50)
              </button>
              <button
                onClick={() => setActiveTab('premium499')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeTab === 'premium499'
                    ? 'bg-zinc-950 text-white shadow-xs'
                    : 'text-zinc-700 hover:text-black'
                }`}
              >
                ₹499 Premium (Save ₹100)
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={handleOpenQuickView}
              />
            ))}
          </div>
        </section>

        {/* BOTTOM PROMO TICKER */}
        <section className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white py-10 px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <p className="text-xs font-black uppercase tracking-widest bg-black/20 inline-block px-3 py-1 rounded-full">
            🔥 HIGH DEMAND SALE
          </p>
          <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
            BUY 1 HOODIE & GET 2ND HOODIE 100% FREE!
          </h3>
          <p className="text-xs sm:text-sm text-red-100 max-w-lg mx-auto font-medium">
            Simply add 2 hoodies to your order at checkout — the cost of the 2nd hoodie is automatically deducted!
          </p>
        </section>

      </main>

      {/* QUICK VIEW MULTI-IMAGE MODAL */}
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
                  <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    {selectedProduct.discountPrice <= 300 ? 'Extra ₹50 OFF' : 'Extra ₹100 OFF'}
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
                    3-5 days delivery • Tracked Courier
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
