/**
 * Compliance helper for matching checkout amounts to official educational products on follower.blog.
 * Guarantees 100% uniformity across Gateways, Invoices, Admin, and Dispute Statements,
 * while completely shielding SMM / bot terms from payment processors.
 */

export function getCompliantProductTitle(amount: number | string, productType?: string): string {
  const numericAmount = Math.round(Number(amount));

  if (productType === 'course' || numericAmount >= 1499) {
    return 'AI Website Building — 3-Hour Complete Practical Live Class';
  }

  switch (numericAmount) {
    case 39:
    case 49:
    case 50:
      return 'Fast-Track Mobile Video Editing & Reels Hooks Pack';
    case 99:
    case 100:
    case 109:
      return 'Cinematic Color Grading LUTs & Audio Preset Toolkit';
    case 150:
    case 199:
    case 200:
      return 'Reels & Short-Form Video Editing Masterclass';
    case 250:
    case 299:
    case 300:
      return '30-Day Content Repurposing & Viral Template Kit';
    case 350:
      return 'Motion Graphics, Kinetic Typography & SFX Asset Suite';
    case 450:
    case 499:
    case 500:
      return 'End-to-End Creator Strategy & Commercial Video Production';
    case 599:
    case 600:
    case 650:
    case 699:
    case 800:
      return 'VIP All-Access Video Editing Academy & Strategy Consultation';
    default:
      return `Digital Creator Strategy Class & Media Consultation (Tier ₹${numericAmount})`;
  }
}

export function getCompliantProductCategory(amount: number | string, productType?: string): {
  category: string;
  description: string;
} {
  const numericAmount = Math.round(Number(amount));

  if (productType === 'course' || numericAmount >= 1499) {
    return {
      category: 'Digital Education & E-Learning Workshop',
      description: '3-hour live interactive website building class, practical coding curriculum, and AI development toolkit.',
    };
  }

  switch (numericAmount) {
    case 39:
    case 49:
    case 50:
      return {
        category: 'Creator Video Editing & Digital Curriculum',
        description: 'Beginner essential: Mobile editing workflow, 250+ viral reels hook formulas, caption hacks, and CapCut quick-export presets.',
      };
    case 99:
    case 100:
    case 109:
      return {
        category: 'Digital Video LUTs & Creator Audio Presets',
        description: 'Transform mobile footage: 50+ cinematic color grading LUTs (Moody, Teal & Orange, Clean Urban) plus podcast-grade voice clarity EQ presets.',
      };
    case 150:
    case 199:
    case 200:
      return {
        category: 'Short-Form Video Editing Masterclass',
        description: 'Master retention editing: Pacing, jump cuts, zoom keyframes, sound design layering, and viral b-roll selection techniques.',
      };
    case 250:
    case 299:
    case 300:
      return {
        category: 'Content Repurposing & Viral Template Suite',
        description: 'Turn 1 video into 10 formats: Carousel generators, text-to-reel animations, storytelling templates, and workflow automation guides.',
      };
    case 350:
      return {
        category: 'Motion Graphics & Typography Asset Suite',
        description: 'High-end creator visuals: 500+ sound effects (whooshes, pops, risers, bass drops), kinetic subtitle presets, and animated sticker overlays.',
      };
    case 450:
    case 499:
    case 500:
      return {
        category: 'Commercial Production & Video Strategy Suite',
        description: 'Commercial video editing standard: Multi-cam syncing, client pitch deck templates, branding color science, and high-ticket portfolio frameworks.',
      };
    case 599:
    case 600:
    case 650:
    case 699:
    case 800:
      return {
        category: 'VIP All-Access Editing Academy & Strategy Bundle',
        description: 'The complete creator bundle: Instant access to ALL 6 previous video editing tiers, LUTs, SFX suites, templates, plus 1-on-1 media consultation review.',
      };
    default:
      return {
        category: 'Creator Marketing Strategy & Digital Asset Bundle',
        description: `Full digital curriculum assets, creative framework access, and digital consultation advisory delivery (Tier ₹${numericAmount}).`,
      };
  }
}
