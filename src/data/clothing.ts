export interface ClothingProduct {
  id: string;
  name: string;
  brandTag: string;
  edition: string;
  category: 'men' | 'women' | 'unisex';
  collectionType: 'hoodies' | 'bape' | 'oversized-tees' | 'cargos';
  originalPrice: number;
  discountPrice: number; // ₹249 for standard, ₹499 for premium drops
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
  // --- 1. NEW VIRAL INSTAGRAM HOODIES (CROPPED FROM USER'S SCREENSHOTS) ---
  
  // 1. Devil Ribcage Embossed Horn Hoodie (Red / White) - ₹249
  {
    id: 'devil-ribcage-embossed-hoodie',
    name: '3D Embossed Devil Skeleton Horn Full-Zip Hoodie (Red Flame)',
    brandTag: 'HARAJUKU UNDERGROUND',
    edition: 'High-Density 3D Chenille Bones & Padded Horns',
    category: 'unisex',
    collectionType: 'hoodies',
    originalPrice: 1499,
    discountPrice: 249,
    rating: 4.9,
    reviewsCount: 684,
    badge: 'VIRAL REELS DROP 🔥',
    images: [
      '/hoodies/hoodie-devil-skeleton-white-red.jpg',
      '/hoodies/hoodie-devil-purple-black.jpg',
      '/hoodies/media_1795100941963_b9b67cf1.jpg'
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Flame Red & White', hex: '#dc2626' },
      { name: 'Neon Purple & Black', hex: '#7c3aed' }
    ],
    description: 'The viral 3D embossed devil skeleton bone hoodie seen all over Reels & TikTok. Features custom padded devil horns on the hood, plush raised ribcage bones on chest and sleeves, and heavy brushed cotton fleece.',
    features: [
      '3D Padded Devil Horns built into hood',
      'Plush Chenille Ribcage & Arm Bones',
      'Heavyweight 320 GSM Bio-Washed Cotton Fleece',
      'Full-Length Smooth Glide Metal Zipper'
    ],
    stockLeft: 4,
    boughtInLastHour: 78,
    trendingRank: 1
  },

  // 2. Itachi Sharingan & Ribcage Embroidered Hoodie - ₹499 (Premium Drop)
  {
    id: 'itachi-sharingan-ribcage-hoodie',
    name: 'Akatsuki Sharingan & Half-Skeleton Heavy Fleece Hoodie',
    brandTag: 'ANIME ARCHIVE TOKYO',
    edition: 'Split Half-Skeleton & Mangekyo Eye Embroidery',
    category: 'unisex',
    collectionType: 'hoodies',
    originalPrice: 2499,
    discountPrice: 499,
    rating: 5.0,
    reviewsCount: 812,
    badge: 'LIMITED PREMIUM DROP ⭐',
    isFirstCopy: true,
    images: [
      '/hoodies/hoodie-itachi-sharingan.jpg',
      '/hoodies/hoodie-anime-rinnegan-sage.jpg',
      '/hoodies/media_1795100941963_b9b67cf1.jpg'
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Blood Crimson & Beige', hex: '#881337' },
      { name: 'Sage Green & Rinnegan Lilac', hex: '#4d7c0f' }
    ],
    description: 'Masterwork split-panel design featuring high-density 3D embossed ribcage bones on the right and an intricately embroidered Sharingan eye with distressed cloud edging on the left.',
    features: [
      'Split Two-Tone Contrast Cut-and-Sew Panels',
      'High-Density 3D Raised Bones on Right Chest',
      'Precision Satin-Stitch Sharingan Eye Embroidery',
      'Thick Double-Layer Fleece Hood'
    ],
    stockLeft: 3,
    boughtInLastHour: 94,
    trendingRank: 2
  },

  // 3. Spider Venom Web Zip-Up Hoodie (White & Silver) - ₹249
  {
    id: 'spider-venom-web-white-hoodie',
    name: 'Cyber Spider Web Distressed Full-Zip Hoodie (Pure White)',
    brandTag: 'Y2K CYBER WEAR',
    edition: 'Metallic Silver Embroidered Webbing & Venom Stars',
    category: 'unisex',
    collectionType: 'hoodies',
    originalPrice: 1299,
    discountPrice: 249,
    rating: 4.8,
    reviewsCount: 520,
    badge: 'UNDER ₹249 BESTSELLER 🔥',
    images: [
      '/hoodies/hoodie-spider-white.jpg',
      '/hoodies/hoodie-spider-black-red.jpg',
      '/hoodies/media_1795100941963_b9b67cf1.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Frost White & Silver', hex: '#f8fafc' },
      { name: 'Jet Black & Spider Red', hex: '#0f172a' }
    ],
    description: 'Signature Y2K spiderweb design with silver metallic webbing stretching across the chest, pockets, and sleeves. Relaxed boxy streetwear fit.',
    features: [
      'Subtle Metallic Gloss Web Embroidery',
      'Double Front Kangaroo Pockets with Corner Webbing',
      'Ultra Soft 300 GSM Brushed Interior',
      'Pre-shrunk, machine wash safe'
    ],
    stockLeft: 6,
    boughtInLastHour: 59,
    trendingRank: 3
  },

  // 4. Asian Dragon Bamboo Button-Knotted Hoodie - ₹499 (Premium Asian Streetwear)
  {
    id: 'asian-dragon-frog-button-hoodie',
    name: 'Oriental Golden Dragon Embroidered Frog-Button Hoodie',
    brandTag: 'EAST DIVISION STUDIOS',
    edition: 'Traditional Knot Fasteners & Gold Thread Dragon',
    category: 'unisex',
    collectionType: 'hoodies',
    originalPrice: 2299,
    discountPrice: 499,
    rating: 4.9,
    reviewsCount: 467,
    badge: 'EDITORIAL DROP ⭐',
    isFirstCopy: true,
    images: [
      '/hoodies/hoodie-dragon-rust-red.jpg',
      '/hoodies/hoodie-dragon-washed-black.jpg',
      '/hoodies/hoodie-dragon-navy-blue.jpg',
      '/hoodies/hoodie-dragon-cream-bamboo.jpg'
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Rust Brick Red', hex: '#991b1b' },
      { name: 'Washed Charcoal Black', hex: '#27272a' },
      { name: 'Indigo Navy', hex: '#1e3a5f' },
      { name: 'Cream Bamboo Sand', hex: '#fef3c7' }
    ],
    description: 'Fusing modern streetwear with ancient Oriental elegance. Features handcrafted Chinese frog button knot closures down the front placket, gold-threaded dragon and auspicious cloud embroidery, and adjustable hem drawstrings.',
    features: [
      'Handcrafted Frog Knot Button Closures + Full Zip Underneath',
      'Intricate Gold Thread Dragon & Cloud Embroidery',
      'Colorblock Curved Sleeve Inserts',
      'Cinch Bottom Drawstrings for Custom Crop Fall'
    ],
    stockLeft: 5,
    boughtInLastHour: 68,
    trendingRank: 4
  },

  // 5. Layered Denim & Corduroy Double Jacket Hoodie - ₹499 (High Streetwear)
  {
    id: 'layered-denim-fleece-jacket-hoodie',
    name: 'Vintage Washed Double-Layer Jacket Hoodie Hybrid',
    brandTag: 'TOKYO STREET LAB',
    edition: 'Built-in Double Layer: Outer Denim Coat + Inner Fleece Hood',
    category: 'men',
    collectionType: 'hoodies',
    originalPrice: 2599,
    discountPrice: 499,
    rating: 5.0,
    reviewsCount: 390,
    badge: 'HIGH STEEZE DROP 🔥',
    images: [
      '/hoodies/hoodie-layered-tan-jacket.jpg',
      '/hoodies/hoodie-layered-cream-jacket.jpg',
      '/hoodies/hoodie-layered-navy-jacket.jpg',
      '/hoodies/hoodie-layered-charcoal-jacket.jpg'
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Vintage Washed Tobacco Tan', hex: '#78350f' },
      { name: 'Ecru Bone Cream', hex: '#fdfbf7' },
      { name: 'Midnight Deep Navy', hex: '#0f172a' },
      { name: 'Washed Acid Charcoal', hex: '#374151' }
    ],
    description: 'The illusion of a 2-piece layered outfit in one seamless luxury garment. Combines a heavy washed cotton denim jacket silhouette over a contrast inner hoodie.',
    features: [
      '2-in-1 Layered Construction (Jacket collar + Hooded inner)',
      'Distressed Mineral Acid Wash finish',
      'Dual zipper chest and side welt pockets',
      'Insulated brushed interior for cold weather warmth'
    ],
    stockLeft: 3,
    boughtInLastHour: 82,
    trendingRank: 5
  },

  // 6. Mythical Japanese Red Sun Dragon Graphic Zip-Up - ₹249
  {
    id: 'japanese-red-sun-dragon-zip-hoodie',
    name: 'Japanese Red Sun Ryu Dragon Graphic Full-Zip Hoodie (Cream)',
    brandTag: 'TOKYO STREET DIVISION',
    edition: 'High-Density Back & Front Dragon Art',
    category: 'unisex',
    collectionType: 'hoodies',
    originalPrice: 1399,
    discountPrice: 249,
    rating: 4.8,
    reviewsCount: 442,
    badge: 'INSTAGRAM HIT 🔥',
    images: [
      '/hoodies/hoodie-printed-dragon-red-sun.jpg',
      '/hoodies/hoodie-printed-electric-blue.jpg',
      '/hoodies/hoodie-printed-gothic-chrome-black.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Vintage Cream & Red Sun', hex: '#fef3c7' },
      { name: 'Cobalt Cyber Blue', hex: '#1e40af' },
      { name: 'Gothic Chrome Black', hex: '#09090b' }
    ],
    description: 'Eye-catching traditional Japanese dragon wrapping across the chest and back with vivid Rising Sun backdrop. Heavyweight drape with ribbed cuffs and hem.',
    features: [
      'High-Density Screenprint that resists cracking',
      'Double-ply warm hood with metal tipped drawstrings',
      'Relaxed boxy street fall'
    ],
    stockLeft: 7,
    boughtInLastHour: 53
  },

  // 7. Cyber Chrome Gothic Cross Washed Hoodie (Burgundy) - ₹249
  {
    id: 'cyber-gothic-cross-burgundy-hoodie',
    name: 'Cyber Gothic Chrome Cross Acid Washed Zip-Up (Burgundy)',
    brandTag: 'CYBERPUNK DISTRICT',
    edition: 'Liquid Chrome Cross Artwork & Flame Sleeves',
    category: 'unisex',
    collectionType: 'hoodies',
    originalPrice: 1299,
    discountPrice: 249,
    rating: 4.9,
    reviewsCount: 318,
    badge: 'HOT DROP ⚡',
    images: [
      '/hoodies/hoodie-printed-cross-burgundy.jpg',
      '/hoodies/hoodie-printed-gothic-chrome-black.jpg',
      '/hoodies/media_1795100806949_775972b1.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Acid Washed Burgundy', hex: '#4c0519' },
      { name: 'Stealth Noir Black', hex: '#18181b' }
    ],
    description: 'Liquid chrome futuristic gothic crucifix on deep washed burgundy fleece. Sleek sleeve flame prints create an unmistakable aesthetic.',
    features: [
      'Liquid Chrome High Definition Print',
      'Sleeve Flame Accents from wrist to shoulder',
      'Soft brushed fleece interior'
    ],
    stockLeft: 5,
    boughtInLastHour: 41
  },

  // 8. Cyber Wing Curved Panel Zip Hoodie (Sky Blue & Navy) - ₹249
  {
    id: 'cyber-wing-curved-panel-hoodie',
    name: 'Tribal Cyber Wing Panel Cut-and-Sew Full Zip (Sky Blue)',
    brandTag: 'Y2K UNDERGROUND',
    edition: 'Multi-Piece Curved Cut-and-Sew Fleece Panels',
    category: 'unisex',
    collectionType: 'hoodies',
    originalPrice: 1399,
    discountPrice: 249,
    rating: 4.8,
    reviewsCount: 375,
    badge: 'Y2K AESTHETIC 🔥',
    images: [
      '/hoodies/hoodie-cyber-wing-blue.jpg',
      '/hoodies/hoodie-cyber-wing-maroon.jpg',
      '/hoodies/media_1795100806945_20426fe8.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Electric Sky & Navy', hex: '#38bdf8' },
      { name: 'Oxblood Maroon & Cream', hex: '#881337' }
    ],
    description: 'Distinctive curved tribal wing panels sewn across the chest and down both sleeves. 100% cut-and-sew panels (not cheap prints).',
    features: [
      'Genuine Contrast Cut-and-Sew Panels',
      'Y2K Boxy Drop-Shoulder Silhouette',
      'Heavy Metal Zipper with O-Ring Pull'
    ],
    stockLeft: 8,
    boughtInLastHour: 34
  },

  // 9. Minimalist Embroidered Star & Dragon Pullover Hoodie - ₹249
  {
    id: 'star-dragon-curved-pullover-hoodie',
    name: 'Seoul Minimalist Curved Panel Pullover Hoodie (Mocha)',
    brandTag: 'SEOUL RETRO LAB',
    edition: 'Curved Contrast Panel & Delicate Star Embroidery',
    category: 'unisex',
    collectionType: 'hoodies',
    originalPrice: 1299,
    discountPrice: 249,
    rating: 4.9,
    reviewsCount: 429,
    badge: 'MINIMAL CHIC ✨',
    images: [
      '/hoodies/hoodie-pullover-mocha-curved.jpg',
      '/hoodies/hoodie-pullover-star-distressed.jpg',
      '/hoodies/hoodie-pullover-bone-minimal.jpg',
      '/hoodies/hoodie-pullover-dragon-chest.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Mocha Tan & Oatmeal', hex: '#78350f' },
      { name: 'Vintage Distressed Sand', hex: '#d6d3d1' },
      { name: 'Bone Cream Minimal', hex: '#fef3c7' }
    ],
    description: 'Clean aesthetic oversized pullover with elegant curved side panels, embroidered micro-star accents on sleeves, and kangaroo front pouch.',
    features: [
      'Dense 310 GSM Ringspun Combed Fleece',
      'Precision Satin Star Sleeve Embroidery',
      'Double-Layer Relaxed Fall Hood'
    ],
    stockLeft: 6,
    boughtInLastHour: 47
  },

  // 10. BAPE Shark Camo Full Zip (1st Copy) - ₹499 (Premium Master Copy)
  {
    id: 'bape-shark-green-camo-hoodie',
    name: 'BAPE 1st Camo Shark Full-Zip Streetwear Hoodie (Green)',
    brandTag: 'A BATHING APE ®',
    edition: '7A Master Replica / 1st Copy (Exact Fabric & Tags)',
    category: 'unisex',
    collectionType: 'bape',
    originalPrice: 2499,
    discountPrice: 489,
    rating: 4.9,
    reviewsCount: 521,
    badge: '1ST COPY 7A QUALITY',
    isFirstCopy: true,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Classic Green Camo', hex: '#4b5320' },
      { name: 'City Camo Black', hex: '#1c1917' }
    ],
    description: 'Iconic BAPE Shark Full Zip Jacket in 1st Camo. Heavyweight 340 GSM brush fleece, double full-length face zipper that zips over the hood, chenille WGM patch, and woven tags.',
    features: [
      '1st Copy Master Craft (Shark felt print & WGM patch)',
      'Dual Full-Face Zippers',
      'Heavy 340 GSM Bio-Washed Cotton Fleece'
    ],
    stockLeft: 3,
    boughtInLastHour: 58
  }
];

export const STORE_PROMOS = {
  firstOrderCoupon: 'WELCOME10',
  firstOrderDiscountText: '₹50 OFF on ₹249 items | ₹100 OFF on ₹499 items!',
  bogoOffer: 'BUY 1 GET 1 FREE (BUY ANY 2 HOODIES & GET 2ND ONE 100% FREE!)',
  deliveryDays: '3-5 Days Express Tracked Delivery across India',
  cancellationPolicy: '100% Instant Refund On Cancellation - No Questions Asked'
};
