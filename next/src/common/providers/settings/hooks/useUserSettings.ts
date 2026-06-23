'use client';

import { useCallback } from 'react';
import { useCurrentUser } from '@/common/hooks/useCurrentUser';
import { useLocalStorage } from '@/common/hooks/useLocalStorage';
import { LocalUserStorage } from '@/common/types';
import { FONT_SIZE_LIST, FONT_TYPE_LIST, FontType, THEME_COLORS } from '../SettingsContext';

export const useUserSettings = () => {
  const { data: user } = useCurrentUser();
  const userStorageKey = user?.email;

  const { value: userSettings, setStoredValue: setUserSettings } = useLocalStorage<LocalUserStorage>(userStorageKey, {});
  const fontSize = userSettings?.fontSize ?? FONT_SIZE_LIST[1];
  const fontType = userSettings?.fontType ?? FONT_TYPE_LIST[0];
  const themeColor = userSettings?.themeColor ?? THEME_COLORS[0];

  const setFontSize = useCallback((size: string) => {
    if (FONT_SIZE_LIST.includes(size)) {
      setUserSettings((prev) => ({ ...prev, fontSize: size }));
    }
  }, [setUserSettings]);

  const setFontType = useCallback((type: FontType) => {
    if (FONT_TYPE_LIST.includes(type)) {
      setUserSettings((prev) => ({ ...prev, fontType: type }));
    }
  }, [setUserSettings]);

  const setThemeColor = useCallback((color: string) => {
    if (THEME_COLORS.includes(color)) {
      setUserSettings((prev) => ({ ...prev, themeColor: color }));
    }
  }, [setUserSettings]);

  return {
    fontSize,
    fontType,
    themeColor,
    setFontSize,
    setFontType,
    setThemeColor,
  };
};
