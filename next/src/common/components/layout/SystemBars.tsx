'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/** Keep native system icons readable as the app theme or route changes. */
export const SystemBars = () => {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const applySystemBars = () => {
      // Intro/login have a fixed light surface even when the saved app theme is dark.
      const isDark = pathname !== '/' && pathname !== '/login' && root.dataset.themeMode === '어둡게';
      const bridge = (window as Window & {
        ReactNativeWebView?: { postMessage: (message: string) => void };
      }).ReactNativeWebView;
      bridge?.postMessage(JSON.stringify({
        type: 'THEME_CHANGE',
        style: isDark ? 'light' : 'dark',
      }));
    };

    applySystemBars();
    const observer = new MutationObserver(applySystemBars);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ['data-theme-mode'],
    });
    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  return null;
};
