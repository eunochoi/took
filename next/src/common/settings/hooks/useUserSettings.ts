'use client';

import { useCurrentUser } from '@/common/hooks/useCurrentUser';
import { useLocalStorage } from '@/common/hooks/useLocalStorage';
import { FONT_SIZE_LIST, FONT_TYPE_LIST, FontSize, FontType, LocalSettingValue, THEME_MODE_LIST, THEME_NAME_LIST, ThemeMode, ThemeName } from '@/common/types/setting';
import { useCallback } from 'react';

export const useUserSettings = () => {
  const { data: user } = useCurrentUser();
  const key = `took:${user?.email}:setting`;

  const { value: setting, setStoredValue: setSetting } = useLocalStorage<LocalSettingValue>(key, {
    font: {
      size: '보통',
      type: '타입1',
    },
    theme: {
      accent: 'blue',
      mode: '밝게',
    }
  });
  const fontSize = setting?.font?.size;
  const fontType = setting?.font?.type;
  const accent = setting?.theme?.accent;
  const mode = setting?.theme?.mode;

  const setFontSize = useCallback((size: FontSize) => {
    if (FONT_SIZE_LIST.includes(size)) {
      setSetting((prev) => ({
        ...prev,
        font: {
          ...(prev.font),
          size,
        }
      }));
    }
  }, [setSetting]);

  const setFontType = useCallback((type: FontType) => {
    if (FONT_TYPE_LIST.includes(type)) {
      setSetting((prev) => ({
        ...prev,
        font: {
          ...(prev.font),
          type,
        }
      }));
    }
  }, [setSetting]);

  const setAccent = useCallback((themeName: ThemeName) => {
    if (THEME_NAME_LIST.includes(themeName)) {
      setSetting((prev) => ({
        ...prev,
        theme: {
          ...(prev.theme),
          accent: themeName,
        }
      }));
    }
  }, [setSetting]);
  const setMode = useCallback((themeMode: ThemeMode) => {
    if (THEME_MODE_LIST.includes(themeMode)) {
      setSetting((prev) => ({
        ...prev,
        theme: {
          ...(prev.theme),
          mode: themeMode
        }
      }));
    }
  }, [setSetting]);

  return {
    fontSize,
    fontType,
    accent,
    mode,
    setFontSize,
    setFontType,
    setAccent,
    setMode,
  };
};
