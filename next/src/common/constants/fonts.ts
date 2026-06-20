export const FONTS = {
  PRETENDARD: 'Pretendard Variable',
  BMJUA: 'BMJUA',
} as const;

export type FontName = typeof FONTS[keyof typeof FONTS];
