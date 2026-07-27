'use client';

import { THEME_VALUE, ThemeName } from '@/common/types/setting';
import { useEffect } from 'react';

export const useApplyThemeColor = (themeName: ThemeName) => {
  useEffect(() => {
    const themeColor = THEME_VALUE[themeName].accent;
    const bgColor = THEME_VALUE[themeName].bg;
    document.body.style.backgroundColor = bgColor;
    document.documentElement.style.setProperty('--theme-color', themeColor);
    document.documentElement.style.setProperty('--theme-bg', bgColor);

    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.setAttribute('content', bgColor);

    if (typeof window !== 'undefined' && (window as any).ReactNativeWebView) {
      (window as any).ReactNativeWebView.postMessage(JSON.stringify({
        type: 'THEME_CHANGE',
        color: bgColor,
        style: 'dark'
      }));
    }
  }, [themeName]);
};
