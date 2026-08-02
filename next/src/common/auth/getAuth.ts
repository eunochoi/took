import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

import { getEnvValue } from '@/common/utils/getEnvValue'
import { prisma } from '../../../lib/prisma'

import { authTokenIssuer, parseAuthTokenPayload } from './token'
import { AUTH_ERROR_CODE, type AuthErrorCode } from './types'

export type AuthResult =
  | { ok: true; email: string; provider: string; userId: number; sessionId: string }
  | { ok: false; code: AuthErrorCode; message: string }

//accessToken check and server refreshSession in server action
//getAuth가 false 결과를 전달하면 authAction에서 리프레시 토큰을 이용한 엑세스 토큰 갱신을 처리
//getAuth에서 엑세스 토큰 갱신까지 같이 다루지는 않음
export const getAuth = async (): Promise<AuthResult> => {
  // 1. 브라우저가 보낸 access token 쿠키를 읽는다.
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
    // 2. JWT 자체를 검증한다.
    //    서명, issuer, 허용 알고리즘, JWT의 exp를 여기서 확인한다.
    const decodedAccessToken = jwt.verify(accessToken, getEnvValue('ACCESS_SECRET_KEY'), {
      issuer: authTokenIssuer,
      algorithms: ['HS256'],
    })

    // 3. access token payload에 서비스 인증에 필요한 값이 있는지 확인한다.
    const accessTokenPayload = parseAuthTokenPayload(decodedAccessToken)

    // 4. JWT가 가리키는 로그인 세션을 DB에서 조회한다.
    //    JWT가 유효해도 DB 세션이 폐기되었으면 인증을 허용하지 않는다.
    const session = await prisma.refreshSession.findUnique({
      where: { sessionId: accessTokenPayload.sessionId },
      select: {
        userId: true,
        revokedAt: true,
        absoluteSessionExpiresAt: true,
      },
    })

    if (!session) {
      return {
        ok: false,
        code: AUTH_ERROR_CODE.needLogin,
        message: '로그인 세션을 찾을 수 없습니다.',
      }
    }

    // 5. 서버에서 폐기한 세션인지 확인한다.
    //    로그아웃이나 refresh token 재사용 탐지 직후 access token을 차단할 수 있다.
    if (session.revokedAt) {
      return {
        ok: false,
        code: AUTH_ERROR_CODE.needLogin,
        message: '로그인 세션이 폐기되었습니다.',
      }
    }

    // 6. 최초 로그인 시 정한 서버 세션의 절대 만료 시각을 확인한다.
    if (session.absoluteSessionExpiresAt <= new Date()) {
      return {
        ok: false,
        code: AUTH_ERROR_CODE.needLogin,
        message: '로그인 세션이 만료되었습니다.',
      }
    }

    // 7. JWT 검증과 서버 세션 검증을 모두 통과한 경우에만 인증 성공으로 반환한다.
    return {
      ok: true,
      email: accessTokenPayload.email,
      provider: accessTokenPayload.provider,
      userId: session.userId,
      sessionId: accessTokenPayload.sessionId,
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
