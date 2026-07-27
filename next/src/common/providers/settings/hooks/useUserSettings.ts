'use client';

import { useCurrentUser } from '@/common/hooks/useCurrentUser';
import { useLocalStorage } from '@/common/hooks/useLocalStorage';
import { FONT_SIZE_LIST, FONT_TYPE_LIST, FontSize, FontType, Setting, THEME_NAME_LIST, ThemeName } from '@/common/types/setting';
import { useCallback } from 'react';

export const useUserSettings = () => {
  const { data: user } = useCurrentUser();
  const key = `took:${user?.email}:setting`;

  const { value: setting, setStoredValue: setSetting } = useLocalStorage<Setting>(key, {
    font: {
      size: '15px',
      type: 'type1',
    },
    themeName: 'blue',
  });
  const fontSize = setting?.font?.size;
  const fontType = setting?.font?.type;
  const themeName = setting?.themeName;

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

  const setThemeName = useCallback((themeName: ThemeName) => {
    if (THEME_NAME_LIST.includes(themeName)) {
      setSetting((prev) => ({
        ...prev,
        themeName
      }));
    }
  }, [setSetting]);

  return {
    fontSize,
    fontType,
    themeName,
    setFontSize,
    setFontType,
    setThemeName,
  };
};
