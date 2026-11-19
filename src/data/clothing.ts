export interface ClothingProduct {
  id: string;
  name: string;
  tagline: string;
  category: 'men' | 'women' | 'unisex';
  type: string;
  originalPrice: number;
  discountPrice: number;
  rating: number;
  reviewsCount: number;
  badge?: string; // e.g. "7A Quality / 1st Copy", "Bestseller 🔥", "Trending"
  isFirstCopy?: boolean;
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  description: string;
  features: string[];
  stockLeft: number;
  boughtInLastHour: number;
}

export const CLOTHING_PRODUCTS: ClothingProduct[] = [
  // 1. BAPE Shark Full Zip Jacket (Requested 1st Copy under 499 - 599)
  {
    id: 'bape-shark-camo-hoodie-jacket',
    name: 'BAPE Shark Camo Full-Zip Streetwear Jacket',
    tagline: '7A Master Quality / 1st Copy Replica Edition',
    category: 'unisex',
    type: 'Jackets & Hoodies',
    originalPrice: 2499,
    discountPrice: 489,
    rating: 4.9,
    reviewsCount: 428,
    badge: '7A Quality / 1st Copy',
    isFirstCopy: true,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Camo Green', hex: '#3d4734' },
      { name: 'Stealth Black', hex: '#18181b' },
      { name: 'Camo Purple', hex: '#581c87' }
    ],
    description: 'Iconic street-culture full-zip shark hood jacket with heavyweight fleece fabric, double custom zip, and authentic first copy detailing. High durability stitching with ultra-comfy streetwear fit.',
    features: [
      '1st Copy Master Craft (7A Quality Tested)',
      'Heavyweight 320 GSM Cotton-Poly Blend',
      'Full Zipper Face Shield Mask Cut',
      'Pre-shrunk, Bio-washed & Machine Wash Safe'
    ],
    stockLeft: 4,
    boughtInLastHour: 32
  },

  // 2. Men: Heavyweight 240 GSM Oversized Acid Wash Tee
  {
    id: 'men-oversized-acid-wash-tee',
    name: 'Tokyo Cyber Heavyweight Acid Wash Oversized Tee',
    tagline: '240 GSM Super Combed Bio-Washed Luxury Cotton',
    category: 'men',
    type: 'T-Shirts',
    originalPrice: 1299,
    discountPrice: 299,
    rating: 4.8,
    reviewsCount: 312,
    badge: 'Bestseller 🔥',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Washed Charcoal', hex: '#27272a' },
      { name: 'Vintage Stone', hex: '#71717a' },
      { name: 'Mocha Brown', hex: '#44342d' }
    ],
    description: 'Authentic drop shoulder oversized boxy cut. Screen printed high-density graphic that never cracks or fades. Perfect for casual streetwear style.',
    features: [
      '240 GSM 100% Combed Ringspun Cotton',
      'Drop-Shoulder Boxy Street Silhouette',
      'Ribbed Anti-Sag Collar',
      'Zero shrinkage after wash guarantee'
    ],
    stockLeft: 7,
    boughtInLastHour: 19
  },

  // 3. Men: 6-Pocket Tactical Street Cargo Pants
  {
    id: 'men-tactical-cargo-pants',
    name: 'Harajuku Baggy 6-Pocket Tactical Cargo Pants',
    tagline: 'Relaxed Fit Street Trousers with Adjustable Ankle Straps',
    category: 'men',
    type: 'Bottoms',
    originalPrice: 1999,
    discountPrice: 599,
    rating: 4.9,
    reviewsCount: 189,
    badge: 'Trending Now',
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['30', '32', '34', '36'],
    colors: [
      { name: 'Matte Olive', hex: '#3f4e3f' },
      { name: 'Obsidian Black', hex: '#09090b' },
      { name: 'Desert Khaki', hex: '#a38b6d' }
    ],
    description: 'Heavy duty ripstop cotton tactical pants with deep snap button utility pockets. Modern wide-leg silhouette that flows over any sneakers.',
    features: [
      'Reinforced Knee & Pocket Stitching',
      'Adjustable Hem Drawstrings for Custom Cinch',
      'Breathable Twill Cotton Blend',
      'Elastic Back Waistband for all-day comfort'
    ],
    stockLeft: 3,
    boughtInLastHour: 24
  },

  // 4. Men: Korean Minimalist Textured Cuban Shirt
  {
    id: 'men-korean-textured-cuban-shirt',
    name: 'Seoul Relaxed Waffle-Knit Cuban Collar Shirt',
    tagline: 'Breathable Textured Fabric for Summer & Club Outfits',
    category: 'men',
    type: 'Shirts',
    originalPrice: 1499,
    discountPrice: 399,
    rating: 4.7,
    reviewsCount: 154,
    badge: 'Popular',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Oatmeal Ivory', hex: '#e8e5de' },
      { name: 'Midnight Navy', hex: '#1e293b' },
      { name: 'Sage Green', hex: '#627264' }
    ],
    description: 'Soft textured waffle-knit resort shirt with relaxed Cuban open collar. Premium wooden finish buttons and airy fabric designed for peak aesthetic styling.',
    features: [
      'Lightweight Air-Woven Texture Fabric',
      'Relaxed Drop Shoulder Cut',
      'Wrinkle-Resistant Easy Care Material',
      'Pairs seamlessly with Cargos & Chinos'
    ],
    stockLeft: 5,
    boughtInLastHour: 11
  },

  // 5. Women: Pinterest Aesthetic Butterfly Oversized Tee
  {
    id: 'women-aesthetic-oversized-graphic-tee',
    name: 'Subtle Y2K Butterfly Vintage Wash Oversized Tee',
    tagline: 'Slouchy Soft-Drape Aesthetic Casual Daily Wear',
    category: 'women',
    type: 'T-Shirts',
    originalPrice: 1199,
    discountPrice: 289,
    rating: 4.9,
    reviewsCount: 382,
    badge: 'Trending #1 🔥',
    images: [
      'https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Vintage Washed Black', hex: '#1f2937' },
      { name: 'Baby Pink', hex: '#fbcfe8' },
      { name: 'Vanilla Cream', hex: '#fef3c7' }
    ],
    description: 'Ultra-trendy boyfriend slouch fit graphic tee. Features soft combed cotton with distressed vintage detailing and eco-friendly water-based soft touch print.',
    features: [
      '100% Super Combed Feather-Touch Cotton',
      'Drop-Shoulder Silhouette loved on Instagram & Pinterest',
      'Pre-washed to eliminate shrinking',
      'Breathable, lightweight all-day comfort'
    ],
    stockLeft: 6,
    boughtInLastHour: 41
  },

  // 6. Women: High-Waisted Korean Wide-Leg Tailored Trousers
  {
    id: 'women-high-waist-wide-leg-trousers',
    name: 'Studio Pleated High-Waisted Wide-Leg Trousers',
    tagline: 'Effortless Korean Clean Aesthetic with Slanted Pockets',
    category: 'women',
    type: 'Bottoms',
    originalPrice: 1799,
    discountPrice: 499,
    rating: 4.8,
    reviewsCount: 247,
    badge: 'Best Seller',
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['26', '28', '30', '32'],
    colors: [
      { name: 'Espresso Latte', hex: '#78350f' },
      { name: 'Cloud Grey', hex: '#9ca3af' },
      { name: 'Classic Black', hex: '#0f172a' }
    ],
    description: 'The viral high-waist drape trousers seen everywhere on Reels. Creates an elongated silhouette with deep front pleats and fluid fabric motion.',
    features: [
      'Premium Fluid Crepe-Viscose Poly Blend',
      'High Elastic Comfort Waistband with Belt Loops',
      'Wrinkle-Defying Hang & Flow',
      'Deep functional side pockets'
    ],
    stockLeft: 4,
    boughtInLastHour: 28
  },

  // 7. Women: Ribbed Knit 2-Piece Minimalist Co-Ord Set
  {
    id: 'women-ribbed-knit-co-ord-set',
    name: 'Monochrome Ribbed Knit Crop & Flared Pant Co-Ord',
    tagline: 'Two-Piece High-Stretch Set for Travel & Loungewear',
    category: 'women',
    type: 'Co-Ords',
    originalPrice: 2299,
    discountPrice: 599,
    rating: 4.9,
    reviewsCount: 198,
    badge: 'Hot Deal ⚡',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Caramel Tan', hex: '#b45309' },
      { name: 'Olive Green', hex: '#4d7c0f' },
      { name: 'Jet Black', hex: '#0a0a0a' }
    ],
    description: 'Effortless 2-piece set featuring a snug sleeveless mock top and matching high-waisted micro-rib flared trousers with incredible 4-way stretch.',
    features: [
      'Ultra Soft Micro-Ribbed Spandex Cotton',
      'Includes Both Top and Bottom Trouser',
      'Non-see-through high density weave',
      'Flatters all body types with flexible shaping'
    ],
    stockLeft: 5,
    boughtInLastHour: 17
  },

  // 8. Women: Floral Tiered Cottagecore Flowy Dress
  {
    id: 'women-floral-cottagecore-dress',
    name: 'French Chic Puff-Sleeve Floral Midi Dress',
    tagline: 'Lightweight Chiffon Fabric with Adjustable Tie Back',
    category: 'women',
    type: 'Dresses',
    originalPrice: 1699,
    discountPrice: 449,
    rating: 4.8,
    reviewsCount: 163,
    badge: 'Viral',
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Lavender Blush', hex: '#e9d5ff' },
      { name: 'Pastel Blue', hex: '#bae6fd' },
      { name: 'Emerald Daisy', hex: '#065f46' }
    ],
    description: 'Charming French cottagecore aesthetic midi dress with sweetheart neckline, smocked elastic bust, and delicate floral prints.',
    features: [
      'Breathable Soft Chiffon with Full Lining',
      'Smocked Elastic Bust stretches for perfect fit',
      'Puff Elastic Sleeves (Wear on or off-shoulder)',
      'Machine washable on gentle cycle'
    ],
    stockLeft: 8,
    boughtInLastHour: 15
  }
];

export const STORE_PROMOS = {
  firstOrderCoupon: 'WELCOME10',
  firstOrderDiscountText: 'Extra ₹100 Flat OFF auto-applied at checkout!',
  bogoOffer: 'BUY 2 ITEMS & GET FLAT ₹150 OFF INSTANTLY!',
  deliveryDays: '3-5 Days Express Delivery across India',
  cancellationPolicy: '100% Instant Refund on Cancellation - No questions asked!'
};
