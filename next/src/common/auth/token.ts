import jwt, { type JwtPayload } from 'jsonwebtoken'
import { cookies } from 'next/headers'

import { getEnvValue } from '@/common/utils/getEnvValue'

export type AuthTokenPayload = {
  email: string
  provider: string
}

export const authTokenIssuer = 'took'
export const accessTokenMaxAge = 5 * 60
export const refreshTokenMaxAge = 7 * 24 * 60 * 60
const accessTokenPath = '/'
const refreshTokenPath = '/api/auth/refresh'

// 토큰에서 로그인에 필요한 값만 꺼냄
export const parseAuthTokenPayload = (decoded: string | JwtPayload): AuthTokenPayload => {
  if (
    typeof decoded === 'string' ||
    typeof decoded.email !== 'string' ||
    typeof decoded.provider !== 'string'
  ) {
    throw new Error('Invalid auth token payload.')
  }

  return {
    email: decoded.email,
    provider: decoded.provider,
  }
}

// 쿠키 옵션 공통 설정
const createCookieOptions = (path: string, maxAge: number) => {
  const secure = process.env.NODE_ENV === 'production'
  const domain = getEnvValue('NEXT_PUBLIC_DOMAIN').trim()

  return {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    maxAge,
    path,
    domain,
  } as const
}

// 로그인 성공 시 access / refresh 토큰 저장
export const setAccessRefreshToken = async (payload: AuthTokenPayload) => {
  const cookieStore = await cookies()
  const accessToken = jwt.sign(payload, getEnvValue('ACCESS_SECRET_KEY'), {
    expiresIn: accessTokenMaxAge,
    issuer: authTokenIssuer,
  })
  const refreshToken = jwt.sign(payload, getEnvValue('REFRESH_SECRET_KEY'), {
    expiresIn: refreshTokenMaxAge,
    issuer: authTokenIssuer,
  })

  cookieStore.set('accessToken', accessToken, createCookieOptions(accessTokenPath, accessTokenMaxAge))
  cookieStore.set('refreshToken', refreshToken, createCookieOptions(refreshTokenPath, refreshTokenMaxAge))
}

// refresh 이후 access 토큰만 다시 저장
export const refreshAccessToken = async (payload: AuthTokenPayload) => {
  const cookieStore = await cookies()
  const accessToken = jwt.sign(payload, getEnvValue('ACCESS_SECRET_KEY'), {
    expiresIn: accessTokenMaxAge,
    issuer: authTokenIssuer,
  })

  cookieStore.set('accessToken', accessToken, createCookieOptions(accessTokenPath, accessTokenMaxAge))

  return accessToken
}

// 로그아웃, 토큰 오류 시 access / refresh 토큰 제거
export const clearAccessRefreshToken = async () => {
  const cookieStore = await cookies()

  cookieStore.set('accessToken', '', createCookieOptions(accessTokenPath, 0))
  cookieStore.set('refreshToken', '', createCookieOptions(refreshTokenPath, 0))
}
