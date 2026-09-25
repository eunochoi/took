'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/** Browser fallback color and native icon contrast; neither adds page padding. */
export const SystemBars = () => {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const applySystemBars = () => {
      const accentLight = getComputedStyle(root).getPropertyValue('--theme-accent-light').trim();
      if (!accentLight) return;

      const color = `rgb(${accentLight})`;
      document.getElementById('theme-color')?.setAttribute('content', color);

      // Intro/login have a fixed light surface even when the saved app theme is dark.
      const isDark = pathname !== '/' && pathname !== '/login' && root.dataset.themeMode === '어둡게';
      const bridge = (window as Window & {
        ReactNativeWebView?: { postMessage: (message: string) => void };
      }).ReactNativeWebView;
      bridge?.postMessage(JSON.stringify({
        type: 'THEME_CHANGE',
        color,
        style: isDark ? 'light' : 'dark',
      }));
    };

    applySystemBars();
    const observer = new MutationObserver(applySystemBars);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ['data-theme-accent', 'data-theme-mode'],
    });
    window.addEventListener('took-native-ready', applySystemBars);
    return () => {
      observer.disconnect();
      window.removeEventListener('took-native-ready', applySystemBars);
    };
  }, [pathname]);

  return null;
};
