'use client';

import { useEffect } from 'react';
import { getThemeBackgroundColor } from '../utils/getThemeBackgroundColor';

export const useApplyThemeColor = (themeColor: string) => {
  useEffect(() => {
    const bgColor = getThemeBackgroundColor(themeColor);
    document.body.style.backgroundColor = bgColor;
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
  }, [themeColor]);
};
