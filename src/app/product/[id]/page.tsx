'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { CLOTHING_PRODUCTS, ClothingProduct, STORE_PROMOS } from '@/data/clothing';
import {
  Flame,
  Star,
  Truck,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  ChevronRight,
  CheckCircle2,
  Tag,
  Share2,
  Lock
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const product: ClothingProduct =
    CLOTHING_PRODUCTS.find((p) => p.id === id) || CLOTHING_PRODUCTS[0];

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [quantity, setQuantity] = useState(1);

  const discountPercent = Math.round(
    ((product.originalPrice - product.discountPrice) / product.originalPrice) * 100
  );

  const relatedProducts = CLOTHING_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  const handleBuyNow = () => {
    router.push(
      `/checkout?productId=${product.id}&size=${selectedSize}&qty=${quantity}`
    );
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 mb-6">
          <Link href="/" className="hover:text-red-600">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/collection/${product.collectionType}`} className="hover:text-red-600 capitalize">
            {product.collectionType.replace('-', ' ')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-zinc-950 font-black truncate max-w-xs">{product.name}</span>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Multi-Angle High-Definition Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="aspect-4/5 w-full rounded-3xl overflow-hidden bg-white border border-zinc-200 shadow-xs relative">
              <img
                src={product.images[activeImgIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {/* Tag Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
                {product.isFirstCopy ? (
                  <span className="bg-red-600 text-white font-black text-xs px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-md flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 fill-white" /> 7A MASTER QUALITY / 1ST COPY
                  </span>
                ) : (
                  <span className="bg-zinc-950 text-white font-black text-xs px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-md">
                    {product.badge}
                  </span>
                )}
                <span className="bg-emerald-600 text-white font-black text-xs px-2.5 py-1 rounded-md">
                  {discountPercent}% OFF FACTORY RATE
                </span>
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIndex(idx)}
                  className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                    activeImgIndex === idx
                      ? 'border-red-600 scale-95 shadow-md'
                      : 'border-zinc-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: High Conversion Buy Box */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-zinc-200 p-6 sm:p-8 space-y-6 shadow-xs">
            
            {/* Header info */}
            <div className="space-y-2 border-b border-zinc-100 pb-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-black text-red-600 uppercase tracking-widest">
                  {product.brandTag}
                </span>
                <span className="flex items-center gap-1 text-amber-500 font-extrabold text-xs">
                  <Star className="w-4 h-4 fill-amber-500" /> {product.rating} ({product.reviewsCount} Reviews)
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-zinc-950 leading-snug">
                {product.name}
              </h1>

              <p className="text-xs text-zinc-500 font-medium">
                {product.edition}
              </p>

              {/* Price & Coupon */}
              <div className="pt-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-black text-red-600">
                    ₹{product.discountPrice}
                  </span>
                  <span className="text-base text-zinc-400 line-through">
                    ₹{product.originalPrice}
                  </span>
                  <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    Save ₹{product.originalPrice - product.discountPrice}
                  </span>
                </div>
                
                <div className="mt-2.5 p-2.5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-bold flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-4 h-4 text-amber-600 shrink-0" />
                    Extra ₹100 Flat OFF auto-applied at checkout!
                  </span>
                  <span className="font-mono bg-white px-2 py-0.5 rounded text-[11px] border border-amber-300">
                    WELCOME10
                  </span>
                </div>
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-black uppercase">
                <span className="text-zinc-800">
                  Select Size: <span className="text-red-600">{selectedSize}</span>
                </span>
                <span className="text-zinc-400">Standard Streetwear Fit</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`min-w-12 px-4 py-2 text-xs font-black rounded-xl border transition-all ${
                      selectedSize === sz
                        ? 'bg-zinc-950 text-white border-zinc-950 shadow-md'
                        : 'bg-white text-zinc-800 border-zinc-200 hover:border-zinc-400'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Option */}
            {product.colors.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-black uppercase text-zinc-800 block">
                  Color: <span className="text-zinc-600">{selectedColor}</span>
                </span>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-7 h-7 rounded-full border-2 transition-all ${
                        selectedColor === c.name
                          ? 'border-red-600 scale-110 shadow-sm'
                          : 'border-white ring-1 ring-zinc-300'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-black uppercase text-zinc-800">Quantity:</span>
              <div className="flex items-center border border-zinc-200 rounded-xl overflow-hidden bg-zinc-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-zinc-700 hover:bg-zinc-200 font-bold"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-sm font-black text-zinc-950">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-zinc-700 hover:bg-zinc-200 font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Combo Trigger */}
            {quantity >= 2 ? (
              <p className="text-xs font-extrabold text-emerald-600 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 text-center">
                🎉 Combo Applied: You will get Extra ₹150 OFF at checkout!
              </p>
            ) : (
              <p className="text-xs font-bold text-amber-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-center">
                ⚡ Tip: Add 1 more item & get FLAT ₹150 OFF instantly!
              </p>
            )}

            {/* CTA Button */}
            <button
              onClick={handleBuyNow}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-red-600 via-red-500 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-black text-base uppercase tracking-wider shadow-lg shadow-red-500/20 transition-all transform active:scale-98 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Buy Now • ₹{product.discountPrice * quantity}</span>
            </button>

            {/* Trust Badges */}
            <div className="space-y-2.5 pt-4 border-t border-zinc-100 text-xs text-zinc-600 font-medium">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>3–5 Days Express Delivery</strong> across India with live tracking</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RotateCcw className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>100% Instant Refund:</strong> 1-click order cancellation before dispatch</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span><strong>1st Copy Transparency:</strong> Exact master replica craft guaranteed</span>
              </div>
            </div>

            {/* Features checklist */}
            <div className="space-y-2 pt-4 border-t border-zinc-100 text-xs text-zinc-700">
              <h4 className="font-black uppercase text-zinc-950">Product Specifications:</h4>
              {product.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Related Drops */}
        <div className="mt-16 pt-12 border-t border-zinc-200">
          <h2 className="text-2xl font-black text-zinc-950 mb-6">
            Frequently Bought Together Drops
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
