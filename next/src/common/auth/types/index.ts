export const AUTH_ERROR_CODE = {
  needLogin: 'LOGIN_REQUIRED',
  expiredAccessToken: 'ACCESS_TOKEN_EXPIRED',
} as const;

export type AuthErrorCode = typeof AUTH_ERROR_CODE[keyof typeof AUTH_ERROR_CODE];
