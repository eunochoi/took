'use client';

import { FontSize, FontType, THEME_VALUE, ThemeMode, ThemeName } from '@/common/types/setting';
import { useEffect } from 'react';

interface useApplySettingsProps {
  accent: ThemeName;
  mode: ThemeMode;
  fontSize: FontSize;
  fontType: FontType;
}

//apply hook 통합 및 속성 선택자를 이용해서 테마를 변경하도록 수정
export const useApplySettings = ({ accent, mode, fontSize, fontType }: useApplySettingsProps) => {
  // apply font size
  useEffect(() => {
    document.documentElement.dataset.fontSize = fontSize;
  }, [fontSize]);
  // apply font type
  useEffect(() => {
    document.documentElement.dataset.fontType = fontType;
  }, [fontType]);
  // apply accent Color
  useEffect(() => {
    document.documentElement.dataset.themeAccent = accent;
    const bgColor = THEME_VALUE[accent].accent;
    //apply status bar color for web
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.setAttribute('content', bgColor);
    //apply status bar color for ReactNativeWeb
    if (typeof window !== 'undefined' && (window as any).ReactNativeWebView) {
      (window as any).ReactNativeWebView.postMessage(JSON.stringify({
        type: 'THEME_CHANGE',
        color: bgColor,
        style: 'dark'
      }));
    }
  }, [accent]);

  //apply theme mode
  useEffect(() => {
    document.documentElement.dataset.themeMode = mode;
  }, [mode]);
};
