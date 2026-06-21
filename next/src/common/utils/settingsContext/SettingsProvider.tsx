// src/providers/SettingsProvider.tsx
'use client';

import { ReactNode, useMemo } from 'react';
import { ThemeProvider } from 'styled-components';
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
  useApplyFontType(fontType);

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
