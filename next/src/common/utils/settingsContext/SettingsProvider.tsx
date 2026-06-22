// src/providers/SettingsProvider.tsx
'use client';

import { ReactNode, useMemo } from 'react';
import { useApplyFontSize } from './hooks/useApplyFontSize';
import { useApplyFontType } from './hooks/useApplyFontType';
import { useApplyThemeColor } from './hooks/useApplyThemeColor';
import { useUserSettings } from './hooks/useUserSettings';
import { SettingsContext } from './SettingsContext';

export function SettingsProvider({ children }: { children: ReactNode }) {
  const {
    fontSize,
    fontType,
    themeColor,
    setFontSize,
    setFontType,
    setThemeColor,
  } = useUserSettings();

  useApplyThemeColor(themeColor);
  useApplyFontSize(fontSize);
  useApplyFontType(fontType);

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
      {children}
    </SettingsContext.Provider >
  );
}
