// src/providers/SettingsProvider.tsx
'use client';

import { useCurrentUser } from '@/common/hooks/useCurrentUser';
import { useLocalStorage } from '@/common/hooks/useLocalStorage';
import { LocalUserStorage } from '@/common/types';
import { ReactNode, useCallback, useEffect, useMemo } from 'react';
import { ThemeProvider } from 'styled-components';
import { FONT_SIZE_LIST, FONT_TYPE_LIST, FontType, SettingsContext, THEME_BG_COLORS, THEME_COLORS } from './SettingsContext';

export function SettingsProvider({ children }: { children: ReactNode }) {
  const { data: user } = useCurrentUser();
  const currentUserEmail = user?.email ?? '';

  const { storedValue: settings, setValue: setSettings } = useLocalStorage<LocalUserStorage>(currentUserEmail, {});
  const fontSize = settings?.fontSize ?? FONT_SIZE_LIST[1];
  const fontType = settings?.fontType ?? FONT_TYPE_LIST[0];
  const themeColor = settings?.themeColor ?? THEME_COLORS[0];

  const setFontSize = useCallback((size: string) => {
    if (FONT_SIZE_LIST.includes(size)) {
      setSettings((prev) => ({ ...prev, fontSize: size }));
    }
  }, [setSettings]);

  const setFontType = useCallback((type: FontType) => {
    if (FONT_TYPE_LIST.includes(type)) {
      setSettings((prev) => ({ ...prev, fontType: type }));
    }
  }, [setSettings]);

  const setThemeColor = useCallback((color: string) => {
    if (THEME_COLORS.includes(color)) {
      setSettings((prev) => ({ ...prev, themeColor: color }));
    }
  }, [setSettings]);

  useEffect(() => {
    const bgColor = THEME_BG_COLORS[themeColor] || '#f3f7fc';
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

  useEffect(() => {
    const currentFontType = settings?.fontType ?? FONT_TYPE_LIST[0];
    document.body.classList.remove('font-type2', 'font-type3');

    if (currentFontType === 'type2') {
      document.body.classList.add('font-type2');
    } else if (currentFontType === 'type3') {
      document.body.classList.add('font-type3');
    }
  }, [settings?.fontType]);

  const theme = useMemo(() => ({
    themeColor: themeColor,
    fontSize: fontSize
  }), [themeColor, fontSize]);


  const value = useMemo(() => ({
    fontSize,
    fontType,
    themeColor,
    setFontSize,
    setFontType,
    setThemeColor,
  }), [fontSize, fontType, themeColor, setFontSize, setFontType, setThemeColor]);

  return (
    <SettingsContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </SettingsContext.Provider >
  );
}
