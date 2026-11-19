export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || '2172718233636359';

export const pageview = () => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'PageView');
  }
};

export const event = (name: string, options: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', name, options);
  }
};
