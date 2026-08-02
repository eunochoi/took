export const THEME_NAME_LIST = [
  'blue',
  'green',
  'purple',
  'pink',
  'yellow',
  'grey',
] as const;

export const THEME_ACCENT_LIST = [
  '140 173 226',
  '131 198 182',
  '151 159 199',
  '237 165 177',
  '249 199 79',
  '143 143 143',
] as const;

export const THEME_BG_LIST = [
  '240 247 255',
  '238 250 246',
  '237 237 247',
  '249 241 242',
  '255 248 234',
  '242 242 242',
] as const;

export const THEME_BG_DARK_MODE = `38 38 38`;

export const THEME_MODE_LIST = ['밝게', '어둡게'] as const;

// 이메일 없이 로딩 화면에서 접근하는 로컬 테마 설정
export const THEME_LOCAL_STORAGE_KEY = 'took:local:theme';

export type ThemeName = typeof THEME_NAME_LIST[number];
export type ThemeAccent = typeof THEME_ACCENT_LIST[number];
export type ThemeBG = typeof THEME_BG_LIST[number];
export type ThemeMode = typeof THEME_MODE_LIST[number];

export interface ThemePreference {
  mode: ThemeMode;
  theme: ThemeName;
}

export const THEME_VALUE: Record<
  ThemeName,
  {
    accent: ThemeAccent;
    bg: ThemeBG;
  }
> = {
  blue: {
    accent: '140 173 226',
    bg: '240 247 255',
  },
  green: {
    accent: '131 198 182',
    bg: '238 250 246',
  },
  purple: {
    accent: '151 159 199',
    bg: '237 237 247',
  },
  pink: {
    accent: '237 165 177',
    bg: '249 241 242',
  },
  yellow: {
    accent: '249 199 79',
    bg: '255 248 234',
  },
  grey: {
    accent: '143 143 143',
    bg: '242 242 242',
  },
} as const;
