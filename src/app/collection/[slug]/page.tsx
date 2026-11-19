'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { CLOTHING_PRODUCTS, ClothingProduct } from '@/data/clothing';
import { Flame, ChevronRight, Filter, Sparkles } from 'lucide-react';

export default function CollectionPage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'all';

  const [genderFilter, setGenderFilter] = useState<'all' | 'men' | 'women'>('all');
  const [selectedProduct, setSelectedProduct] = useState<ClothingProduct | null>(null);

  // Dynamic collection header and filtering
  let title = 'All Streetwear Drops';
  let subtitle = 'Explore the entire high-demand streetwear catalog directly at factory prices.';
  let filteredList = CLOTHING_PRODUCTS;

  if (slug === 'bape') {
    title = 'BAPE Shark 1st Copy Archive';
    subtitle = 'Authentic 7A Master Quality BAPE Shark full zip hoodies with double custom zippers and chenille patches.';
    filteredList = CLOTHING_PRODUCTS.filter((p) => p.collectionType === 'bape');
  } else if (slug === 'men') {
    title = "Men's Streetwear & Drips";
    subtitle = 'Heavyweight 240+ GSM Boxy Tees, Waffle Cuban Shirts & Baggy Parachute Cargos.';
    filteredList = CLOTHING_PRODUCTS.filter((p) => p.category === 'men' || p.category === 'unisex');
  } else if (slug === 'women') {
    title = "Women's Aesthetic Fits";
    subtitle = 'Pinterest Y2K Tops, Flared Ribbed Co-Ords, High-Waisted Korean Trousers & Floral Dresses.';
    filteredList = CLOTHING_PRODUCTS.filter((p) => p.category === 'women' || p.category === 'unisex');
  } else if (slug === 'oversized-tees') {
    title = 'Heavyweight Oversized Tees';
    subtitle = 'Tokyo Cyber Drop-Shoulder, ESSENTIALS FOG replicas & vintage acid wash graphics.';
    filteredList = CLOTHING_PRODUCTS.filter((p) => p.collectionType === 'oversized-tees');
  } else if (slug === 'cargos') {
    title = 'Tactical Cargos & Korean Trousers';
    subtitle = '6-Pocket Harajuku Utility Pants, Parachute Cinch Cords, and High-Waist Pleated Bottoms.';
    filteredList = CLOTHING_PRODUCTS.filter((p) => p.collectionType === 'cargos');
  } else if (slug === 'deals') {
    title = 'High Velocity Deals & Combos';
    subtitle = 'Every single drop under ₹599. Buy any 2 clothes and get Flat ₹150 OFF auto applied.';
    filteredList = CLOTHING_PRODUCTS.filter((p) => p.discountPrice <= 599);
  }

  // Secondary gender filter inside collection
  if (genderFilter !== 'all') {
    filteredList = filteredList.filter((p) => p.category === genderFilter || p.category === 'unisex');
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 mb-6">
          <Link href="/" className="hover:text-red-600">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-zinc-950 uppercase font-black">{slug}</span>
        </div>

        {/* Collection Header Banner */}
        <div className="bg-zinc-950 text-white rounded-3xl p-6 sm:p-10 mb-10 border border-zinc-800 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 fill-white" /> Live Collection Drop
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight uppercase">
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium">
              {subtitle}
            </p>
          </div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-zinc-200">
          <p className="text-xs font-black uppercase tracking-wider text-zinc-600">
            Showing <span className="text-zinc-950 font-black">{filteredList.length}</span> Outfits
          </p>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-zinc-500 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            <div className="flex items-center bg-zinc-200/80 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setGenderFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  genderFilter === 'all'
                    ? 'bg-white text-zinc-950 shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setGenderFilter('men')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  genderFilter === 'men'
                    ? 'bg-white text-zinc-950 shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                Men
              </button>
              <button
                onClick={() => setGenderFilter('women')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  genderFilter === 'women'
                    ? 'bg-white text-zinc-950 shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                Women
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredList.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
