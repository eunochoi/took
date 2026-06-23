import { createContext } from 'react';

export const FONT_SIZE_LIST = ['13px', '14px', '15px', '16px', '17px'];
export const FONT_TYPE_LIST = ['type1', 'type2', 'type3'] as const;
export type FontType = typeof FONT_TYPE_LIST[number];

export const THEME_COLORS = ['#8CADE2', '#83c6b6', '#979FC7', '#eda5b1', '#f9c74f', '#8f8f8f'];
export const THEME_COLORS_NAME = ['blue', 'green', 'purple', 'pink', 'yellow', 'grey'];
// 배경색
export const THEME_BG_COLORS: Record<string, string> = {
  '#979FC7': '#ededf7',
  '#8CADE2': '#eaf1f9',
  '#83c6b6': '#eefaf6',
  '#eda5b1': '#f6ebed',
  '#f9c74f': '#fcf5e7',
  '#8f8f8f': '#f2f2f2',
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