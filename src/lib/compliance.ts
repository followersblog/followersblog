/**
 * Compliance helper for matching checkout amounts to official educational products on follower.blog.
 * Guarantees 100% uniformity across Gateways, Invoices, Admin, and Dispute Statements,
 * while completely shielding SMM / bot terms from payment processors.
 */

export function getCompliantProductTitle(amount: number | string, productType?: string): string {
  const numericAmount = Math.round(Number(amount));

  if (productType === 'course' || numericAmount >= 1200) {
    return 'AI Website Building — 3-Hour Complete Practical Live Class';
  }

  // Smart Price Range Brackets: Maps EVERY possible amount to the closest official homepage tier
  if (numericAmount <= 60) {
    // ₹1 - ₹60 (e.g. ₹39, ₹49, ₹50) -> Tier 1 (₹49)
    return 'Fast-Track Mobile Video Editing & Reels Hooks Pack';
  } else if (numericAmount <= 149) {
    // ₹61 - ₹149 (e.g. ₹99, ₹100, ₹109) -> Tier 2 (₹99)
    return 'Cinematic Color Grading LUTs & Audio Preset Toolkit';
  } else if (numericAmount <= 220) {
    // ₹150 - ₹220 (e.g. ₹150, ₹180, ₹199, ₹200) -> Tier 3 (₹199)
    return 'Reels & Short-Form Video Editing Masterclass';
  } else if (numericAmount <= 299) {
    // ₹221 - ₹299 (e.g. ₹250, ₹299) -> Tier 4 (₹250)
    return '30-Day Content Repurposing & Viral Template Kit';
  } else if (numericAmount <= 420) {
    // ₹300 - ₹420 (e.g. ₹350, ₹400) -> Tier 5 (₹350)
    return 'Motion Graphics, Kinetic Typography & SFX Asset Suite';
  } else if (numericAmount <= 550) {
    // ₹421 - ₹550 (e.g. ₹450, ₹499, ₹500) -> Tier 6 (₹500)
    return 'End-to-End Creator Strategy & Commercial Video Production';
  } else {
    // ₹551 - ₹1199 (e.g. ₹599, ₹600, ₹650, ₹699, ₹799, ₹800) -> Tier 7 (₹600)
    return 'VIP All-Access Video Editing Academy & Strategy Consultation';
  }
}

export function getCompliantProductCategory(amount: number | string, productType?: string): {
  category: string;
  description: string;
} {
  const numericAmount = Math.round(Number(amount));

  if (productType === 'course' || numericAmount >= 1200) {
    return {
      category: 'Digital Education & E-Learning Workshop',
      description: '3-hour live interactive website building class, practical coding curriculum, and AI development toolkit.',
    };
  }

  if (numericAmount <= 60) {
    return {
      category: 'Creator Video Editing & Digital Curriculum',
      description: 'Beginner essential: Mobile editing workflow, 250+ viral reels hook formulas, caption hacks, and CapCut quick-export presets.',
    };
  } else if (numericAmount <= 149) {
    return {
      category: 'Digital Video LUTs & Creator Audio Presets',
      description: 'Transform mobile footage: 50+ cinematic color grading LUTs (Moody, Teal & Orange, Clean Urban) plus podcast-grade voice clarity EQ presets.',
    };
  } else if (numericAmount <= 220) {
    return {
      category: 'Short-Form Video Editing Masterclass',
      description: 'Master retention editing: Pacing, jump cuts, zoom keyframes, sound design layering, and viral b-roll selection techniques.',
    };
  } else if (numericAmount <= 299) {
    return {
      category: 'Content Repurposing & Viral Template Suite',
      description: 'Turn 1 video into 10 formats: Carousel generators, text-to-reel animations, storytelling templates, and workflow automation guides.',
    };
  } else if (numericAmount <= 420) {
    return {
      category: 'Motion Graphics & Typography Asset Suite',
      description: 'High-end creator visuals: 500+ sound effects (whooshes, pops, risers, bass drops), kinetic subtitle presets, and animated sticker overlays.',
    };
  } else if (numericAmount <= 550) {
    return {
      category: 'Commercial Production & Video Strategy Suite',
      description: 'Commercial video editing standard: Multi-cam syncing, client pitch deck templates, branding color science, and high-ticket portfolio frameworks.',
    };
  } else {
    return {
      category: 'VIP All-Access Editing Academy & Strategy Bundle',
      description: 'The complete creator bundle: Instant access to ALL 6 previous video editing tiers, LUTs, SFX suites, templates, plus 1-on-1 media consultation review.',
    };
  }
}

/**
 * Sanitizes customer name to ensure no Instagram/YouTube URLs, bot terms,
 * or handles are ever sent to payment gateways or printed on official Tax Invoices.
 * If an invalid link is provided, it intelligently derives a clean real human name
 * from their email address or falls back to 'Creator'.
 */
export function sanitizeCustomerName(name?: string, email?: string): string {
  const raw = (name || '').trim();
  const rawLower = raw.toLowerCase();

  const isSuspicious =
    !raw ||
    rawLower.includes('http') ||
    rawLower.includes('www.') ||
    rawLower.includes('.com') ||
    rawLower.includes('instagram') ||
    rawLower.includes('youtu') ||
    rawLower.includes('/') ||
    rawLower.includes('@') ||
    rawLower.includes('_') ||
    rawLower.includes('exln') ||
    rawLower.includes('utm_') ||
    raw.length > 35;

  if (isSuspicious) {
    if (email && email.includes('@') && !email.endsWith('@follower.blog') && !email.endsWith('@followers.blog')) {
      let prefix = email.split('@')[0].toLowerCase();
      prefix = prefix.replace(/\d+/g, '').replace(/[._-]+/g, ' ').trim();

      const fillers = ['official', 'films', 'channel', 'account', 'vlogs', 'production'];
      for (const f of fillers) {
        if (prefix.endsWith(f)) {
          prefix = prefix.slice(0, -f.length).trim();
        }
      }

      const words = prefix.split(/\s+/).filter((w) => w.length > 1);
      if (words.length === 1) {
        const w = words[0];
        const surnames = [
          'dhillon', 'verma', 'sharma', 'kumar', 'singh', 'yadav',
          'patel', 'gupta', 'kaur', 'mehta', 'joshi', 'ali', 'khan', 'malhotra', 'gill'
        ];
        for (const s of surnames) {
          if (w.endsWith(s) && w.length > s.length) {
            const first = w.slice(0, -s.length);
            return `${first.charAt(0).toUpperCase() + first.slice(1)} ${s.charAt(0).toUpperCase() + s.slice(1)}`;
          }
        }
        if (w.length >= 3) {
          return w.charAt(0).toUpperCase() + w.slice(1);
        }
      } else if (words.length >= 2) {
        return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      }
    }
    return 'Creator';
  }

  const clean = raw.replace(/[^a-zA-Z\s]/g, '').trim();
  if (!clean || clean.length < 2) return 'Creator';
  return clean
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}
