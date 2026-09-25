'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const STATIC_THEME_PATHS = new Set([
  '/',
  '/login',
  '/privacy',
  '/account-deletion',
]);

const STATIC_THEME_COLOR = '240 247 255';

type WebViewBridge = {
  postMessage: (message: string) => void;
};

export const SystemBars = () => {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;

    const applySystemBars = () => {
      const isStaticThemePage = STATIC_THEME_PATHS.has(pathname);

      const colorParts = isStaticThemePage
        ? STATIC_THEME_COLOR
        : getComputedStyle(root)
          .getPropertyValue('--theme-accent-light')
          .trim();

      const color = `rgb(${colorParts.split(/\s+/).join(', ')})`;

      document
        .getElementById('theme-color')
        ?.setAttribute('content', color);

      const bridge = (
        window as Window & {
          ReactNativeWebView?: WebViewBridge;
        }
      ).ReactNativeWebView;

      if (!bridge) return;

      const useLightStatusBarIcons =
        !isStaticThemePage &&
        root.dataset.themeMode === '어둡게';

      bridge.postMessage(
        JSON.stringify({
          type: 'THEME_CHANGE',
          color,
          style: useLightStatusBarIcons ? 'light' : 'dark',
        }),
      );
    };

    applySystemBars();

    const observer = new MutationObserver(applySystemBars);

    observer.observe(root, {
      attributes: true,
      attributeFilter: ['data-theme-mode', 'data-theme-accent'],
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
};