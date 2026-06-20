export const AUTH_ERROR_CODE = {
  needLogin: 'LOGIN_REQUIRED',
  expiredAccessToken: 'ACCESS_TOKEN_EXPIRED',
} as const

export type AuthActionErrorCode = typeof AUTH_ERROR_CODE[keyof typeof AUTH_ERROR_CODE]

export type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; code: AuthActionErrorCode | string; message: string }
