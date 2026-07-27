export const FONT_SIZE_LIST = ['14px', '15px', '16px'] as const;
export const FONT_TYPE_LIST = ['type1', 'type2', 'type3'] as const;

export const THEME_NAME_LIST = ['blue', 'green', 'purple', 'pink', 'yellow', 'grey'] as const;
export const THEME_ACCENT_LIST = ['#8CADE2', '#83c6b6', '#979FC7', '#eda5b1', '#f9c74f', '#8f8f8f'] as const;
export const THEME_BG_LIST = ['#eaf1f9', '#eefaf6', '#ededf7', '#f6ebed', '#fcf5e7', '#f2f2f2'] as const;

export type FontSize = typeof FONT_SIZE_LIST[number];
export type FontType = typeof FONT_TYPE_LIST[number];

export type ThemeName = typeof THEME_NAME_LIST[number];
export type ThemeAccent = typeof THEME_ACCENT_LIST[number];
export type ThemeBG = typeof THEME_BG_LIST[number];

export const THEME_VALUE: Record<ThemeName, { accent: ThemeAccent, bg: ThemeBG }> = {
  'blue': {
    'accent': '#8CADE2',
    'bg': '#eaf1f9'
  },
  'green': {
    'accent': '#83c6b6',
    'bg': '#eefaf6'
  },
  'purple': {
    'accent': '#979FC7',
    'bg': '#ededf7'
  },
  'pink': {
    'accent': '#eda5b1',
    'bg': '#f6ebed'
  },
  'yellow': {
    'accent': '#f9c74f',
    'bg': '#fcf5e7'
  },
  'grey': {
    'accent': '#8f8f8f',
    'bg': '#f2f2f2'
  }
} as const;


//took:[email]:setting, localStorage value type
export interface Setting {
  font: {
    size: FontSize;
    type: FontType;
  };
  themeName: ThemeName;
};
export interface SettingsContextType {
  font: {
    size: FontSize;
    type: FontType;
    setFontSize: (size: FontSize) => void;
    setFontType: (type: FontType) => void;
  },
  theme: {
    themeName: ThemeName;
    setThemeName: (themeName: ThemeName) => void;
  }
}
export interface SettingSetter {
  setFontSize: (size: FontSize) => void;
  setFontType: (type: FontType) => void;
  setThemeName: (themeName: ThemeName) => void;
}