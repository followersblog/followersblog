export interface ClothingProduct {
  id: string;
  name: string;
  brandTag: string; // e.g. "BAPE A BATHING APE", "ESSENTIALS FEAR OF GOD", "ZARA MAN", "H&M DIVIDED", "OFF-WHITE C/O VIRGIL"
  edition: string; // e.g. "7A Master Replica / 1st Copy", "Export Surplus Stock", "Heavyweight 280 GSM Drop"
  category: 'men' | 'women' | 'unisex';
  collectionType: 'bape' | 'oversized-tees' | 'cargos' | 'korean-shirts' | 'women-coords' | 'women-dresses';
  originalPrice: number;
  discountPrice: number;
  rating: number;
  reviewsCount: number;
  badge: string;
  isFirstCopy?: boolean;
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  description: string;
  features: string[];
  stockLeft: number;
  boughtInLastHour: number;
  trendingRank?: number;
}

export const CLOTHING_PRODUCTS: ClothingProduct[] = [
  // 1. BAPE Camo Shark Full Zip Hoodie (Real exact Bape shark hoodie shots)
  {
    id: 'bape-shark-green-camo-hoodie',
    name: 'BAPE 1st Camo Shark Full-Zip Hoodie Jacket (Green)',
    brandTag: 'A BATHING APE ®',
    edition: '7A Master Replica / 1st Copy (Identical Fabric & Tags)',
    category: 'unisex',
    collectionType: 'bape',
    originalPrice: 2499,
    discountPrice: 489,
    rating: 4.9,
    reviewsCount: 521,
    badge: '1ST COPY 7A QUALITY',
    isFirstCopy: true,
    trendingRank: 1,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Classic Green Camo', hex: '#4b5320' },
      { name: 'City Camo Black', hex: '#1c1917' },
      { name: 'Tokyo Purple Camo', hex: '#581c87' }
    ],
    description: 'The world-famous BAPE Shark Full Zip Jacket in iconic Green 1st Camo. Features custom heavyweight 340 GSM brush-back cotton fleece, double full-length face zipper that zips all the way over the hood, chenille WGM patch on right side, tiger embroidery on left side, and exact 1st copy woven wash tags.',
    features: [
      'Authentic 1st Copy Details (Shark mouth felt print & WGM chenille patch)',
      'Dual Full-Face YKK Style Metal Zippers',
      'Heavy 340 GSM Bio-Washed Cotton Fleece',
      'Washable & zero color bleed tested'
    ],
    stockLeft: 3,
    boughtInLastHour: 47
  },

  // 2. BAPE Shark Blackout Night Camo Jacket
  {
    id: 'bape-shark-blackout-hoodie',
    name: 'BAPE Blackout Midnight Shark Full-Zip Tactical Jacket',
    brandTag: 'A BATHING APE ®',
    edition: '7A Master Replica / 1st Copy',
    category: 'unisex',
    collectionType: 'bape',
    originalPrice: 2599,
    discountPrice: 499,
    rating: 5.0,
    reviewsCount: 384,
    badge: 'VIP DROP 🔥',
    isFirstCopy: true,
    trendingRank: 2,
    images: [
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Midnight Pitch Black', hex: '#09090b' },
      { name: 'Charcoal Shadow', hex: '#27272a' }
    ],
    description: 'Triple-black edition stealth shark hoodie. Subtle reflective eyes, heavy ribbed cuffs and hem, authentic BAPE sleeve ape head tag.',
    features: [
      'Sleeve Ape Head Woven Tag Exact Match',
      'Ultra Dense 350 GSM Fleece for perfect street fall',
      'Double custom slider zippers'
    ],
    stockLeft: 5,
    boughtInLastHour: 38
  },

  // 3. ESSENTIALS Fear Of God Heavyweight Oversized Tee
  {
    id: 'essentials-fog-oversized-tee',
    name: 'ESSENTIALS 1977 Heavyweight Oversized Boxy Tee',
    brandTag: 'FEAR OF GOD ESSENTIALS',
    edition: '1st Copy / 7A Export Surplus Edition',
    category: 'men',
    collectionType: 'oversized-tees',
    originalPrice: 1499,
    discountPrice: 299,
    rating: 4.9,
    reviewsCount: 680,
    badge: 'VIRAL REELS FIT ⚡',
    isFirstCopy: true,
    trendingRank: 3,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Oatmeal Heather', hex: '#d6d3d1' },
      { name: 'Washed Black Iron', hex: '#1c1917' },
      { name: 'Desert Taupe', hex: '#a8a29e' }
    ],
    description: 'The defining streetwear staple. Relaxed drop-shoulder silhouette, thick ribbed mock collar that never loosens, rubberized silicone back collar patch, and high density flocking chest print.',
    features: [
      '260 GSM 100% Combed Ringspun Heavy Cotton',
      'Rear Silicone Rubber ESSENTIALS Patch',
      'Thick non-sagging 1.25" neck rib',
      'Boxy drop-shoulder aesthetic drape'
    ],
    stockLeft: 4,
    boughtInLastHour: 62
  },

  // 4. Vintage Acid Washed Graphic Oversized Tee (Men/Unisex)
  {
    id: 'vintage-nirvana-acid-wash-tee',
    name: 'Vintage Acid Washed Tokyo Grunge Drop-Shoulder Tee',
    brandTag: 'STREET DIVISION LAB',
    edition: '240 GSM Bio-Washed Heavyweight Drop',
    category: 'men',
    collectionType: 'oversized-tees',
    originalPrice: 1299,
    discountPrice: 289,
    rating: 4.8,
    reviewsCount: 412,
    badge: 'BESTSELLER 🔥',
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Distressed Mineral Grey', hex: '#3f3f46' },
      { name: 'Faded Vintage Black', hex: '#18181b' }
    ],
    description: 'Artisan mineral stone washed graphic tee. Super soft hand-feel despite heavyweight drape, finished with cracked vintage screenprint.',
    features: [
      'Mineral Wash Process for unique vintage fade',
      'Pre-shrunk 100% cotton fabric',
      'Reinforced double-needle shoulder tape'
    ],
    stockLeft: 8,
    boughtInLastHour: 29
  },

  // 5. Harajuku Tactical Baggy 6-Pocket Cargos (Men)
  {
    id: 'harajuku-tactical-baggy-cargos',
    name: 'Harajuku Baggy 6-Pocket Parachute Cargo Trousers',
    brandTag: 'TECHWEAR TOKYO',
    edition: 'Heavy Cotton Ripstop Utility Fit',
    category: 'men',
    collectionType: 'cargos',
    originalPrice: 1999,
    discountPrice: 589,
    rating: 4.9,
    reviewsCount: 395,
    badge: 'VIRAL ON TIKTOK',
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['30', '32', '34', '36'],
    colors: [
      { name: 'Military Olive Green', hex: '#3f4e3f' },
      { name: 'Tactical Jet Black', hex: '#09090b' },
      { name: 'Desert Camel Sand', hex: '#a38b6d' }
    ],
    description: 'The definitive wide-leg streetwear cargo pants. Loaded with 6 3D flap pockets, ankle cinch bungee drawstrings to switch from wide-leg to jogger style, and heavy durable twill weave.',
    features: [
      '6 Heavy Tactical Flap Pockets with snap buttons',
      'Adjustable Hem Bungee Toggle Cords',
      'Elastic waist inserts for supreme mobility',
      'Fits relaxed over all Chunky Sneakers & Jordans'
    ],
    stockLeft: 6,
    boughtInLastHour: 43
  },

  // 6. Korean Relaxed Waffle-Knit Cuban Shirt (Men)
  {
    id: 'korean-waffle-knit-cuban-shirt',
    name: 'Seoul Relaxed Waffle Textured Resort Cuban Shirt',
    brandTag: 'SEOUL MINIMAL STUDIOS',
    edition: 'Air-Woven Textured Cotton Drop',
    category: 'men',
    collectionType: 'korean-shirts',
    originalPrice: 1599,
    discountPrice: 389,
    rating: 4.8,
    reviewsCount: 284,
    badge: 'HOT SUMMER FIT',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Oatmeal Vanilla Cream', hex: '#f4ede4' },
      { name: 'Deep Midnight Navy', hex: '#1e293b' },
      { name: 'Sage Pine', hex: '#526655' }
    ],
    description: 'Korean influencer favorite. Open camp-collar cuban silhouette with rich 3D waffle texture, breathable open weave, and tortoiseshell button accents.',
    features: [
      'Zero-Wrinkle Air Knit Cotton blend',
      'Cuban Open Camp Collar design',
      'Drapes gracefully without clinging'
    ],
    stockLeft: 7,
    boughtInLastHour: 25
  },

  // 7. Women: Pinterest Y2K Butterfly Acid Wash Slouchy Tee
  {
    id: 'women-y2k-butterfly-tee',
    name: 'Subtle Y2K Distressed Butterfly Boyfriend Oversized Tee',
    brandTag: 'PINTEREST STUDIO',
    edition: 'Feather-Soft Slouchy Instagram Fit',
    category: 'women',
    collectionType: 'oversized-tees',
    originalPrice: 1199,
    discountPrice: 289,
    rating: 4.9,
    reviewsCount: 512,
    badge: 'PINTEREST TREND #1 🔥',
    trendingRank: 4,
    images: [
      'https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Vintage Washed Charcoal', hex: '#27272a' },
      { name: 'Soft Baby Pink', hex: '#fce7f3' },
      { name: 'Cream Chalk', hex: '#fef3c7' }
    ],
    description: 'The exact slouchy vintage wash aesthetic seen across Pinterest boards and Reels. Ultra-soft bio-washed combed cotton with low-saturation water-based graphic.',
    features: [
      '100% Combed Feather-Touch Cotton',
      'Relaxed Drop-Shoulder Boyfriend Cut',
      'Flattering drape that tucks or hangs loose'
    ],
    stockLeft: 9,
    boughtInLastHour: 53
  },

  // 8. Women: Korean Pleated High-Waisted Drape Trousers
  {
    id: 'women-korean-pleated-wide-leg-trousers',
    name: 'Seoul Studio Deep-Pleat High-Waisted Wide Leg Trousers',
    brandTag: 'ZARA ARCHIVE STYLE',
    edition: 'Fluid Crepe Slanted Pocket Edition',
    category: 'women',
    collectionType: 'cargos',
    originalPrice: 1799,
    discountPrice: 489,
    rating: 4.9,
    reviewsCount: 420,
    badge: 'VIRAL REELS FIT 🔥',
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['26', '28', '30', '32'],
    colors: [
      { name: 'Iced Espresso Brown', hex: '#451a03' },
      { name: 'Cloud Light Slate', hex: '#94a3b8' },
      { name: 'Minimal Noir Black', hex: '#0f172a' }
    ],
    description: 'The trousers that make your legs look a mile long. Fluid drape crepe fabric with tailored twin front pleats, hidden elastic back waist for all-day comfort, and slanted clean cut pockets.',
    features: [
      'Fluid Crepe Viscose with Zero Wrinkle Hang',
      'Tailored Twin Deep Front Pleats',
      'Hidden Elastic Back for 100% waist comfort'
    ],
    stockLeft: 4,
    boughtInLastHour: 36
  },

  // 9. Women: Ribbed Knit 2-Piece Crop & Flared Pant Co-Ord Set
  {
    id: 'women-ribbed-knit-co-ord-set',
    name: 'Monochrome High-Stretch Ribbed Knit 2-Piece Co-Ord Set',
    brandTag: 'H&M TREND STUDIO',
    edition: 'Crop Top + High-Waist Flared Pant Set',
    category: 'women',
    collectionType: 'women-coords',
    originalPrice: 2299,
    discountPrice: 589,
    rating: 4.8,
    reviewsCount: 310,
    badge: 'SUPER COMBO 🔥',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Roasted Mocha Tan', hex: '#92400e' },
      { name: 'Matcha Olive', hex: '#3f6212' },
      { name: 'Jet Noir', hex: '#09090b' }
    ],
    description: 'Includes BOTH the sleeveless mock crop top and high-rise flared leg pants. Crafted from premium 4-way stretch micro-ribbed cotton that gently sculpts and flatters every silhouette.',
    features: [
      'Complete 2-Piece Matching Set included',
      'High Density Micro-Rib (Zero transparency)',
      'High-Rise Flared Leg cut'
    ],
    stockLeft: 5,
    boughtInLastHour: 27
  },

  // 10. Women: French Chic Floral Cottagecore Midi Dress
  {
    id: 'women-french-chic-floral-midi-dress',
    name: 'French Chic Sweetheart Smocked Floral Midi Dress',
    brandTag: 'PARISIAN RETRO',
    edition: 'Flowy Chiffon with Adjustable Tie Back',
    category: 'women',
    collectionType: 'women-dresses',
    originalPrice: 1799,
    discountPrice: 449,
    rating: 4.9,
    reviewsCount: 265,
    badge: 'DATE NIGHT PICK',
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Lavender Meadow', hex: '#c084fc' },
      { name: 'Daisy Emerald Green', hex: '#047857' },
      { name: 'Buttercup Yellow', hex: '#fde047' }
    ],
    description: 'Romantic vintage sweetheart neckline with stretchy smocked bodice that fits like a glove. Airy chiffon layers with delicate floral patterns and puff sleeves you can wear on or off shoulder.',
    features: [
      'Full Opaque Inner Lining included',
      'Smocked Elastic Bodice flexes with your shape',
      'Puff Sleeve 2-way styling'
    ],
    stockLeft: 7,
    boughtInLastHour: 22
  }
];

export const CURATED_COLLECTIONS = [
  {
    id: 'bape',
    title: 'BAPE 1st Copy Shark Hoodies',
    subtitle: '7A Master replicas with full face zipper & chenille patches',
    tag: '7A QUALITY / 1ST COPY',
    priceStarting: 489,
    bannerImg: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'oversized-tees',
    title: 'Heavyweight 240+ GSM Oversized Tees',
    subtitle: 'Tokyo Boxy fits, FOG 1st copies & acid wash drops',
    tag: 'MOST POPULAR',
    priceStarting: 289,
    bannerImg: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'cargos',
    title: 'Tactical Baggy Cargos & Korean Trousers',
    subtitle: 'Parachute 6-pocket pants & pleated wide leg bottoms',
    tag: 'VIRAL REELS FIT',
    priceStarting: 489,
    bannerImg: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'women-coords',
    title: "Women's Aesthetic Co-Ords & Dresses",
    subtitle: 'Pinterest matching sets, ribbed 2-piece & cottagecore midi fits',
    tag: 'INSTAGRAM PICKS',
    priceStarting: 449,
    bannerImg: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80'
  }
];

export const STORE_PROMOS = {
  firstOrderCoupon: 'WELCOME10',
  firstOrderDiscountText: 'Extra ₹100 Flat OFF auto-applied at checkout!',
  bogoOffer: 'BUY ANY 2 ITEMS & GET EXTRA ₹150 FLAT OFF INSTANTLY!',
  deliveryDays: '3-5 Days Express Tracked Delivery Across India',
  cancellationPolicy: '100% Instant Refund On Cancellation - No Questions Asked'
};
