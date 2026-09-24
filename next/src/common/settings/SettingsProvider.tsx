// src/providers/SettingsProvider.tsx
'use client';

import { ReactNode, useMemo } from 'react';
import { useApplySettings } from './hooks/useApplySettings';
import { useUserSettings } from './hooks/useUserSettings';
import { SettingsContext } from './SettingsContext';

export function SettingsProvider({ children }: { children: ReactNode }) {
  //load setting value, setter in local storage
  const {
    emotionIconStyle,
    setEmotionIconStyle,
    fontSize,
    fontType,
    accent,
    mode,
    setFontSize,
    setFontType,
    setAccent,
    setMode,
  } = useUserSettings();

  //apply setting value
  useApplySettings({
    fontSize, fontType, accent, mode
  });

  const value = useMemo(() => ({
    emotionIcon: {
      style: emotionIconStyle,
      setStyle: setEmotionIconStyle,
    },
    font: {
      size: fontSize,
      type: fontType,
      setFontSize,
      setFontType,
    },
    theme: {
      accent,
      mode,
      setAccent,
      setMode,
    }
  }), [emotionIconStyle, setEmotionIconStyle, fontSize, fontType, accent, mode, setFontSize, setFontType, setAccent, setMode]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider >
  );
}
