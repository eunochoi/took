import { THEME_BG_COLORS } from '../SettingsContext';

export const getThemeBackgroundColor = (themeColor: string) => {
  return THEME_BG_COLORS[themeColor] || '#f3f7fc';
};
