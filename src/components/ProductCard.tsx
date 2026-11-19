'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ClothingProduct } from '@/data/clothing';
import { Star, Flame, Eye, ShoppingBag, CheckCircle2, ShieldCheck, Truck } from 'lucide-react';

interface ProductCardProps {
  product: ClothingProduct;
  onQuickView?: (product: ClothingProduct) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const router = useRouter();
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const discountPercent = Math.round(
    ((product.originalPrice - product.discountPrice) / product.originalPrice) * 100
  );

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/checkout?productId=${product.id}&size=${product.sizes[0] || 'M'}&qty=1`);
  };

  return (
    <div className="group bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-zinc-300 transition-all flex flex-col justify-between">
      {/* Image Gallery Container */}
      <div className="relative aspect-4/5 w-full bg-zinc-100 overflow-hidden cursor-pointer">
        <Link href={`/product/${product.id}`}>
          <img
            src={product.images[activeImgIndex] || product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start z-10 pointer-events-none">
          {product.isFirstCopy ? (
            <span className="bg-red-600 text-white font-black text-[9px] sm:text-[10px] px-2.5 py-1 rounded-md tracking-wider uppercase shadow-md flex items-center gap-1">
              <Flame className="w-3 h-3 fill-white" /> 1ST COPY 7A
            </span>
          ) : (
            <span className="bg-zinc-950 text-white font-black text-[9px] sm:text-[10px] px-2.5 py-1 rounded-md tracking-wider uppercase shadow-md">
              {product.badge}
            </span>
          )}
          <span className="bg-black/60 backdrop-blur-md text-white text-[9px] font-bold px-2 py-0.5 rounded">
            {discountPercent}% OFF
          </span>
        </div>

        {/* Multi-photo dot indicator preview */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-3 flex gap-1 z-10">
            {product.images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImgIndex(i);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeImgIndex === i ? 'bg-red-600 w-4' : 'bg-white/80'
                }`}
                title={`View Photo ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Quick View Button */}
        {onQuickView && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md text-zinc-900 p-2 rounded-xl text-xs font-bold shadow-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 hover:bg-white"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">2-3 Angles</span>
          </button>
        )}
      </div>

      {/* Details Box */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-zinc-500">
            <span className="text-red-600 font-black">{product.brandTag}</span>
            <span className="flex items-center gap-1 text-amber-500">
              <Star className="w-3 h-3 fill-amber-500" />
              {product.rating} ({product.reviewsCount})
            </span>
          </div>

          <Link href={`/product/${product.id}`} className="block">
            <h3 className="text-sm sm:text-base font-extrabold text-zinc-950 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>

          <p className="text-[11px] text-zinc-500 line-clamp-1 font-medium">
            {product.edition}
          </p>
        </div>

        {/* Social Proof + Price + Action */}
        <div className="space-y-3 pt-2 border-t border-zinc-100">
          <div className="flex items-center justify-between text-[10px] text-emerald-600 font-semibold">
            <span className="flex items-center gap-1">
              <Flame className="w-3 h-3 text-red-500 shrink-0" />
              {product.boughtInLastHour} bought in last hour
            </span>
            <span className="text-zinc-400">Only {product.stockLeft} left</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-black text-red-600">
                  ₹{product.discountPrice}
                </span>
                <span className="text-xs text-zinc-400 line-through">
                  ₹{product.originalPrice}
                </span>
              </div>
              <p className="text-[10px] text-zinc-500">
                + Extra ₹100 OFF with code <strong className="text-zinc-800">WELCOME10</strong>
              </p>
            </div>

            <button
              type="button"
              onClick={handleBuyNow}
              className="px-4 py-2.5 rounded-xl bg-zinc-950 hover:bg-red-600 text-white font-black text-xs uppercase tracking-wider transition-all transform active:scale-95 shadow-xs flex items-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Buy</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
