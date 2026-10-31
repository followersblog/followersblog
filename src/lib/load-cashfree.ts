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

  if (cashfreePromise) {
    return cashfreePromise;
  }

  cashfreePromise = new Promise((resolve) => {
    // If window.Cashfree appears within 2 seconds (e.g. from RootLayout Script)
    const checkInterval = setInterval(() => {
      if ((window as any).Cashfree) {
        clearInterval(checkInterval);
        resolve((window as any).Cashfree);
      }
    }, 25);

    // If script tag already exists in DOM
    const existing = document.querySelector('script[src*="cashfree.js"]');
    if (existing) {
      existing.addEventListener('load', () => {
        clearInterval(checkInterval);
        resolve((window as any).Cashfree || null);
      });
      // Safety timeout after 2.5s
      setTimeout(() => {
        clearInterval(checkInterval);
        resolve((window as any).Cashfree || null);
      }, 2500);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
    script.async = true;
    script.onload = () => {
      clearInterval(checkInterval);
      resolve((window as any).Cashfree || null);
    };
    script.onerror = () => {
      clearInterval(checkInterval);
      cashfreePromise = null;
      resolve(null);
    };
    document.body.appendChild(script);
  });

  return cashfreePromise;
};
