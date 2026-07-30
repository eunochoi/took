import { ThemeMode, ThemeName } from "./theme";

export const FONT_SIZE_LIST = ['작게', '보통', '크게'] as const;
export const FONT_TYPE_LIST = ['타입1', '타입2', '타입3'] as const;

export type FontSize = typeof FONT_SIZE_LIST[number];
export type FontType = typeof FONT_TYPE_LIST[number];

//took:[email]:setting, localStorage value type
export interface LocalSettingValue {
  font: {
    size: FontSize;
    type: FontType;
  };
  theme: {
    accent: ThemeName;
    mode: ThemeMode;
  }
};
export interface SettingsContextType {
  font: {
    size: FontSize;
    type: FontType;
    setFontSize: (size: FontSize) => void;
    setFontType: (type: FontType) => void;
  },
  theme: {
    accent: ThemeName;
    mode: ThemeMode
    setAccent: (themeName: ThemeName) => void;
    setMode: (themeMode: ThemeMode) => void;
  }
}