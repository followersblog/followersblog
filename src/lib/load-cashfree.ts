/**
 * Helper to dynamically load Cashfree SDK v3 with promise caching & instant resolution
 */
let cashfreePromise: Promise<any> | null = null;

export const loadCashfreeScript = (): Promise<any> => {
  if (typeof window === 'undefined') {
    return Promise.resolve(null);
  }

  // If already loaded on window, resolve instantly
  if ((window as any).Cashfree) {
    return Promise.resolve((window as any).Cashfree);
  }

  // If already loading in flight, return the existing active Promise
  if (cashfreePromise) {
    return cashfreePromise;
  }

  cashfreePromise = new Promise((resolve) => {
    // Check if script tag already exists in DOM
    const existing = document.querySelector('script[src*="cashfree.js"]');
    if (existing) {
      existing.addEventListener('load', () => resolve((window as any).Cashfree || null));
      existing.addEventListener('error', () => {
        cashfreePromise = null;
        resolve(null);
      });
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
    script.async = true;
    script.onload = () => resolve((window as any).Cashfree || null);
    script.onerror = () => {
      cashfreePromise = null;
      resolve(null);
    };
    document.body.appendChild(script);
  });

  return cashfreePromise;
};
