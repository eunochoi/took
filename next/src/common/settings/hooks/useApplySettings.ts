'use client';

import { FontSize, FontType, ThemeMode, ThemeName } from '@/common/types/setting';
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
  }, [accent]);

  //apply theme mode
  // useEffect(() => {
  //   document.documentElement.dataset.themeMode = themeName;
  // }, [themeName]);
};
