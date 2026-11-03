/**
 * Helper to dynamically load and initialize Cashfree SDK v3 with instant resolution & zero lag
 */
let cashfreePromise: Promise<any> | null = null;
let cachedInstance: any = null;

export const loadCashfreeScript = (): Promise<any> => {
  if (typeof window === 'undefined') {
    return Promise.resolve(null);
  }

  // 1. If already loaded on window, resolve immediately
  if ((window as any).Cashfree) {
    return Promise.resolve((window as any).Cashfree);
  }

  if (cashfreePromise) {
    return cashfreePromise;
  }

  cashfreePromise = new Promise((resolve) => {
    let attempts = 0;
    const maxAttempts = 50; // 50 * 40ms = 2 seconds max poll

    const interval = setInterval(() => {
      attempts++;
      if ((window as any).Cashfree) {
        clearInterval(interval);
        resolve((window as any).Cashfree);
        return;
      }
      if (attempts >= maxAttempts) {
        clearInterval(interval);
        resolve((window as any).Cashfree || null);
      }
    }, 40);

    // If script is not in DOM yet, inject it
    const existing = document.querySelector('script[src*="cashfree.js"]');
    if (!existing) {
      const script = document.createElement('script');
      script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
      script.async = true;
      script.onload = () => {
        clearInterval(interval);
        resolve((window as any).Cashfree || null);
      };
      script.onerror = () => {
        clearInterval(interval);
        cashfreePromise = null;
        resolve(null);
      };
      document.head.appendChild(script);
    }
  });

  return cashfreePromise;
};

export const getCashfreeInstance = async (mode: string = 'production') => {
  if (cachedInstance) return cachedInstance;
  const Cashfree = await loadCashfreeScript();
  if (Cashfree && typeof Cashfree === 'function') {
    try {
      cachedInstance = Cashfree({ mode });
      return cachedInstance;
    } catch (e) {
      console.warn('Cashfree initialization error:', e);
    }
  }
  return null;
};
