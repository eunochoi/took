// src/providers/SettingsProvider.tsx
'use client';

import { ReactNode, useMemo } from 'react';
import { useApplyFontSize } from './hooks/useApplyFontSize';
import { useApplyFontType } from './hooks/useApplyFontType';
import { useApplyThemeColor } from './hooks/useApplyThemeColor';
import { useUserSettings } from './hooks/useUserSettings';
import { SettingsContext } from './SettingsContext';

export function SettingsProvider({ children }: { children: ReactNode }) {
  //load setting value, setter in local storage
  const {
    fontSize,
    fontType,
    themeName,
    setFontSize,
    setFontType,
    setThemeName,
  } = useUserSettings();

  //apply setting value
  useApplyThemeColor(themeName);
  useApplyFontSize(fontSize);
  useApplyFontType(fontType);

  const value = useMemo(() => ({
    font: {
      size: fontSize,
      type: fontType,
      setFontSize,
      setFontType,
    },
    theme: {
      themeName,
      setThemeName,
    }
  }), [fontSize, fontType, themeName, setFontSize, setFontType, setThemeName]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider >
  );
}
