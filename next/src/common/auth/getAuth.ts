import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

import { AUTH_ERROR_CODE } from '@/common/actions/types'
import { getEnvValue } from '@/common/utils/getEnvValue'

import { authTokenIssuer, parseAuthTokenPayload } from './token'

export type AuthErrorCode = typeof AUTH_ERROR_CODE[keyof typeof AUTH_ERROR_CODE]

export type AuthResult =
  | { ok: true; email: string; provider: string }
  | { ok: false; code: AuthErrorCode; message: string }

export const getAuth = async (): Promise<AuthResult> => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  if (!accessToken) {
    return {
      ok: false,
      code: AUTH_ERROR_CODE.needLogin,
      message: '로그인이 필요합니다.',
    }
  }

  try {
    const decoded = jwt.verify(accessToken, getEnvValue('ACCESS_SECRET_KEY'), {
      issuer: authTokenIssuer,
    })

    return {
      ok: true,
      ...parseAuthTokenPayload(decoded),
    }
  } catch (error) {
    if (error instanceof Error && error.name === 'TokenExpiredError') {
      return {
        ok: false,
        code: AUTH_ERROR_CODE.expiredAccessToken,
        message: '로그인이 만료되었습니다.',
      }
    }

    return {
      ok: false,
      code: AUTH_ERROR_CODE.needLogin,
      message: '유효하지 않은 토큰입니다.',
    }
  }
}
