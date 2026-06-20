import { createContext } from 'react';

export const FONT_SIZE_LIST = ['13px', '14px', '15px', '16px', '17px'];
export const FONT_TYPE_LIST = ['type1', 'type2', 'type3'] as const;
export type FontType = typeof FONT_TYPE_LIST[number];

export const THEME_COLORS = ['#8CADE2', '#83c6b6', '#979FC7', '#eda5b1', '#f9c74f', '#8f8f8f'];
export const THEME_COLORS_NAME = ['blue', 'green', 'purple', 'pink', 'yellow', 'grey'];
// 배경색
export const THEME_BG_COLORS: Record<string, string> = {
  '#979FC7': '#f5f5fa',
  '#8CADE2': '#f3f7fc',
  '#83c6b6': '#f2faf8',
  '#eda5b1': '#fef9fa',
  '#f9c74f': '#f7f7f7',
  '#8f8f8f': '#f7f7f7',
};

interface SettingsContextType {
  fontSize: string;
  fontType: FontType;
  themeColor: string;
  setFontSize: (size: string) => void;
  setFontType: (type: FontType) => void;
  setThemeColor: (color: string) => void;
}

export const SettingsContext = createContext<SettingsContextType | null>(null);