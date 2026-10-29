/**
 * Helper to dynamically load Cashfree SDK v3
 */
export const loadCashfreeScript = (): Promise<any> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(null);
      return;
    }

    if ((window as any).Cashfree) {
      resolve((window as any).Cashfree);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
    script.async = true;
    script.onload = () => resolve((window as any).Cashfree || null);
    script.onerror = () => resolve(null);
    document.body.appendChild(script);
  });
};
