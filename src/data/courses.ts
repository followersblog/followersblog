import { CourseAddon, CourseModule, FaqItem } from '@/types';

export const COURSE_DETAILS = {
  id: 'ai-website-course',
  name: 'AI Website Building — 3 Hour Complete Practical Class',
  tagline: 'AI Se Professional Website Banana Seekho — Sirf 3 Ghante Mein',
  subheading: 'AI tools aur practical workflow ki help se zero se ek professional, production-ready website build karna seekhiye.',
  price: 1499,
  originalPrice: 3999,
  duration: '3 Ghante (Live Practical Workshop)',
  format: 'Live Interactive Workshop + Project Recording',
  language: 'Hinglish (Hindi + English Simple Flow)',
  level: 'Zero to Intermediate (No Prior Coding Experience Needed)',
  nextBatchDate: 'Upcoming Sunday',
  nextBatchTime: '4:00 PM - 7:00 PM IST',
};

export const COURSE_MODULES: CourseModule[] = [
  {
    number: '01',
    title: 'AI Website Development Introduction',
    description: 'Modern AI web development ecosystem, prompt engineering for web projects, aur tooling setup.',
    topics: ['Traditional vs AI Web Development', 'Choosing the right tools', 'Setting up your development space'],
  },
  {
    number: '02',
    title: 'Website Planning & Structure',
    description: 'Sitemap planning, wireframing, architecture aur high-converting page structures plan karna.',
    topics: ['Conversion architecture', 'User flow design', 'Asset & typography planning'],
  },
  {
    number: '03',
    title: 'Antigravity AI Se Website Build Karna',
    description: 'Autonomous AI coding tools aur workflows ke sath high-speed web apps generate karna.',
    topics: ['Prompt engineering for web components', 'Iterative refining', 'Bug fixing with AI'],
  },
  {
    number: '04',
    title: 'Premium UI/UX & Responsive Design',
    description: 'Clean modern aesthetics, white premium theme principles, animations, aur mobile optimization.',
    topics: ['Mobile-first layout tricks', 'Tailwind CSS utility mastery', 'Micro-interactions & UX feedback'],
  },
  {
    number: '05',
    title: 'Frontend Development & Components',
    description: 'React aur Next.js components, state management, interactive modals, tabs, aur sliders.',
    topics: ['Component reusability', 'Interactive client components', 'Performance & fast loading'],
  },
  {
    number: '06',
    title: 'Supabase & Database Basics',
    description: 'Cloud Postgres database setup, tables, columns, relationships, aur Row Level Security (RLS).',
    topics: ['Supabase project creation', 'Schema design & SQL editor', 'Safe database querying'],
  },
  {
    number: '07',
    title: 'Backend & API Concepts',
    description: 'Next.js server routes, server actions, handling form submissions, aur secure validations.',
    topics: ['API route handlers', 'Form submission & validation', 'Securing sensitive keys in .env'],
  },
  {
    number: '08',
    title: 'Payment Integration (Cashfree)',
    description: 'Payment gateway setup, order token generation, server-side verification, aur webhooks.',
    topics: ['Cashfree PG architecture', 'Client & server handshake', 'Handling success & failure states safely'],
  },
  {
    number: '09',
    title: 'Testing & Production Deployment',
    description: 'Deploying to Vercel, connecting custom domains, SSL configuration, aur SEO metadata setup.',
    topics: ['GitHub version control push', 'Vercel 1-click CI/CD', 'DNS & custom domain linking'],
  },
  {
    number: '10',
    title: 'Real Website Project (End-to-End)',
    description: 'Zero se live deployment tak ek poora actual project aapke samne step-by-step complete kiya jayega.',
    topics: ['Live coding session', 'Testing in real browsers', 'Q&A and student project reviews'],
  },
];

export const COURSE_ADDONS: CourseAddon[] = [
  {
    id: 'addon-prompt-pack',
    name: 'Premium AI Prompt Pack',
    description: 'Ready-to-use tested prompts for landing pages, copy, design systems, and troubleshooting.',
    price: 99,
  },
  {
    id: 'addon-starter-kit',
    name: 'Website Starter Kit',
    description: 'Production-ready Next.js & Tailwind UI templates, boilerplate code, and resource pack.',
    price: 250,
  },
  {
    id: 'addon-setup-assist',
    name: '1-on-1 Setup Assistance',
    description: 'Personalized 30-minute guidance to help you setup your environment, domain, or Supabase DB.',
    price: 499,
  },
];

export const COURSE_BENEFITS = [
  {
    title: 'AI Se Website Structure Banana',
    description: 'Bina kisi confusion ke accurate prompt daal kar clean architectural structure create karna seekhenge.',
  },
  {
    title: 'AI Prompts Effectively Use Karna',
    description: 'Vague prompts ke badle precise, production-grade prompts likhna jo exact results deliver karein.',
  },
  {
    title: 'Professional Landing Pages Create Karna',
    description: 'High-converting, clean, modern SaaS visual aesthetic aur copy structuring master karein.',
  },
  {
    title: '100% Responsive Websites Banana',
    description: 'Desktop, tablet aur mobile devices par pixel-perfect look aur fluid responsiveness ensure karein.',
  },
  {
    title: 'Supabase Database Connect Karna',
    description: 'Users, orders aur content store karne ke liye modern backend database seamlessly integrate karein.',
  },
  {
    title: 'Backend Workflows Samajhna',
    description: 'Server actions, webhooks aur secure business logic ko bina complex backend setup ke chalana.',
  },
  {
    title: 'Custom Domain & Vercel Deployment',
    description: 'Live internet par apni website ko 5 minutes mein custom domain ke sath live launch karein.',
  },
  {
    title: 'Real-World Project Workflow',
    description: 'Freelancing projects aur personal startups ke liye end-to-end repeatable workflow adopt karein.',
  },
];

export const WHO_IS_THIS_FOR = [
  {
    role: 'Beginners & Non-Coders',
    description: 'Jinhe coding ka experience nahi hai lekin modern AI tools use karke websites build karna chahte hain.',
    tag: 'No Code/Low Code',
  },
  {
    role: 'Freelancers & Agency Owners',
    description: 'Jo clients ke liye websites banane ka delivery time 2 weeks se ghata kar 1 din karna chahte hain.',
    tag: 'High ROI',
  },
  {
    role: 'Students & Job Seekers',
    description: 'Jo apne resume mein real modern web projects aur high-demand AI skills showcase karna chahte hain.',
    tag: 'Career Growth',
  },
  {
    role: 'Digital Creators & Founders',
    description: 'Jo apne products, courses, ya services ke liye khud instantly landing pages launch karna chahte hain.',
    tag: 'Fast Launch',
  },
  {
    role: 'Small Business Owners',
    description: 'Jo expensive agency charges bachakar khud apni modern digital business presence build karna chahte hain.',
    tag: 'Cost Saver',
  },
  {
    role: 'Tech Enthusiasts',
    description: 'Jo AI assisted coding tools ke real-world potential ko hands-on explore karna chahte hain.',
    tag: 'Future-Proof',
  },
];

export const WHATS_INCLUDED = [
  '3-Hour Live Intensive Practical Workshop',
  'Step-by-step repeatable AI building workflow',
  'Full recording access for future reference',
  'Real live project built from zero to live URL',
  'Curated prompt cheatsheet for web generation',
  'Supabase DB & Payment gateway integration roadmap',
  'Deployment & Custom Domain linking guide',
  'Private Telegram community access for questions',
];

export interface CreatorEditingTier {
  id: string;
  level: string;
  name: string;
  price: number;
  originalPrice: number;
  badge?: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export const CREATOR_EDITING_TIERS: CreatorEditingTier[] = [
  {
    id: 'edit-tier-49',
    level: 'Tier 1 • Starter',
    name: 'Fast-Track Mobile Video Editing & Reels Hooks Pack',
    price: 49,
    originalPrice: 149,
    badge: '⚡ STARTER LEVEL',
    description: 'Beginner essential: Mobile editing workflow, 250+ viral reels hook formulas, caption hacks, and CapCut quick-export presets.',
    features: [
      '📱 250+ Viral Hook Templates',
      '⚡ CapCut & VN Export Presets',
      '🎯 Instant Electronic Dispatch',
      '🔒 100% Practical Beginner Blueprint',
    ],
  },
  {
    id: 'edit-tier-99',
    level: 'Tier 2 • Audio & Color',
    name: 'Cinematic Color Grading LUTs & Audio Preset Toolkit',
    price: 99,
    originalPrice: 299,
    badge: '⚡ POPULAR',
    description: 'Transform mobile footage: 50+ cinematic color grading LUTs (Moody, Teal & Orange, Clean Urban) plus podcast-grade voice clarity EQ presets.',
    features: [
      '🎨 50+ Cinematic Video LUTs',
      '🎙️ Podcast Voice Clarifier Presets',
      '📱 Works on CapCut, VN & Premiere',
      '🔄 Lifetime Updates & Guide Included',
    ],
  },
  {
    id: 'edit-tier-199',
    level: 'Tier 3 • Viral Masterclass',
    name: 'Reels & Short-Form Video Editing Masterclass',
    price: 199,
    originalPrice: 499,
    badge: '🔥 BEST VALUE',
    popular: true,
    description: 'Master retention editing: Pacing, jump cuts, zoom keyframes, sound design layering, and viral b-roll selection techniques.',
    features: [
      '🎬 Full Retention Editing Framework',
      '⚡ Zoom Keyframing & SFX Library',
      '📈 Boost Audience Watch Time',
      '⭐ High Retention Creator Workflow',
    ],
  },
  {
    id: 'edit-tier-250',
    level: 'Tier 4 • Content Machine',
    name: '30-Day Content Repurposing & Viral Template Kit',
    price: 250,
    originalPrice: 750,
    badge: '⚡ CREATOR CHOICE',
    description: 'Turn 1 video into 10 formats: Carousel generators, text-to-reel animations, storytelling templates, and workflow automation guides.',
    features: [
      '📦 30-Day Viral Content Calendar',
      '🔄 10x Content Repurposing Guide',
      '🎨 Canva & Figma Reel Templates',
      '🔒 Ready-to-Publish Formats',
    ],
  },
  {
    id: 'edit-tier-350',
    level: 'Tier 5 • Motion Graphics',
    name: 'Motion Graphics, Kinetic Typography & SFX Asset Suite',
    price: 350,
    originalPrice: 1000,
    badge: '⚡ PRO SUITE',
    description: 'High-end creator visuals: 500+ sound effects (whooshes, pops, risers, bass drops), kinetic subtitle presets, and animated sticker overlays.',
    features: [
      '🎵 500+ Royalty-Free SFX Library',
      '✨ Kinetic Subtitle Presets',
      '🎬 4K Overlay Transitions & Stickers',
      '⭐ Priority Creator Support',
    ],
  },
  {
    id: 'edit-tier-500',
    level: 'Tier 6 • Commercial Pro',
    name: 'End-to-End Creator Strategy & Commercial Video Production',
    price: 500,
    originalPrice: 1500,
    badge: '⭐ AGENCY LEVEL',
    description: 'Commercial video editing standard: Multi-cam syncing, client pitch deck templates, branding color science, and high-ticket portfolio frameworks.',
    features: [
      '💼 Commercial Video Production Guide',
      '🎥 Multi-Cam & Audio Sync Mastery',
      '📄 Client Pitch Deck & Contract Kit',
      '🎯 Agency-Grade Deliverables',
    ],
  },
  {
    id: 'edit-tier-600',
    level: 'Tier 7 • VIP Academy',
    name: 'VIP All-Access Video Editing Academy & Strategy Consultation',
    price: 600,
    originalPrice: 1999,
    badge: '👑 VIP ALL-ACCESS',
    description: 'The complete creator bundle: Instant access to ALL 6 previous video editing tiers, LUTs, SFX suites, templates, plus 1-on-1 media consultation review.',
    features: [
      '👑 All Level 1–6 Packs Included (All-in-One)',
      '🤝 1-on-1 Creator Profile & Editing Audit',
      '🚀 Priority WhatsApp Creator Helpdesk',
      '🔒 Full Commercial License Included',
    ],
  },
];

export const COURSE_FAQS: FaqItem[] = [
  {
    question: 'Kya is class ke liye coding aani zaroori hai?',
    answer: 'Nahi! Ye workshop specifically beginners aur practical builders ke liye design ki gayi hai. Hum modern AI tools aur natural language prompts ka use karte hain, isliye kisi prior coding background ki zaroorat nahi hai.',
  },
  {
    question: 'Class kis time aur platform par hogi?',
    answer: 'Class Google Meet / Zoom par live conduct ki jaati hai. Checkout ke turant baad aapko dashboard aur email par exact date, time aur joining instructions mil jayenge.',
  },
  {
    question: 'Agar main live session miss kar doon toh?',
    answer: 'Aapko class ki high-definition complete recording aur saare resource materials dashboard mein permanently available milenge, taaki aap kabhi bhi repeat dekh sakein.',
  },
  {
    question: 'Class ke baad agar koi doubt ho toh support milega?',
    answer: 'Haan! Saare enrolled students ko private community group aur support portal ka access milta hai jahan aap apne doubts aur project questions pooch sakte hain.',
  },
  {
    question: 'Add-ons lena zaroori hai kya?',
    answer: 'Bilkul nahi! Add-ons bilkul optional hain. Main ₹1499 course apne aap mein complete practical class hai. Agar aapko pre-made prompts ya extra starter kit chahiye toh aap add kar sakte hain.',
  },
  {
    question: 'Payment ke baad access kaise milega?',
    answer: 'Payment successful hote hi aapko instant Course Dashboard access mil jayega jisme live session link, syllabus notes aur community access links uplabdh honge.',
  },
];
