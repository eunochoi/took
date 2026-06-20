'use client'

import { signOut } from 'next-auth/react'

import { AUTH_ERROR_CODE, type ActionResult } from './types'

// 로그인 화면으로 이동
const goToLogin = () => {
  if (window.location.pathname !== '/login') {
    window.location.replace('/login')
  }
}

// refreshToken으로 accessToken 재발급 요청
const requestAccessTokenRefresh = async () => {
  const response = await fetch('/api/auth/refresh', {
    method: 'POST',
    credentials: 'include',
  })

  return response.ok
}

// 클라이언트단에서 로그인 여부 확인후 엑세스 토큰 리프레시 관리
export const authAction = async <T,>(
  action: () => Promise<ActionResult<T>>,
): Promise<T> => {
  const result = await action()

  if (result.ok) {
    return result.data
  }

  const needLogin = result.code === AUTH_ERROR_CODE.needLogin
  const accessTokenExpired = result.code === AUTH_ERROR_CODE.expiredAccessToken
  const canRefreshAccessToken = needLogin || accessTokenExpired

  if (canRefreshAccessToken) {
    const refreshed = await requestAccessTokenRefresh()

    if (refreshed) {
      const retryResult = await action()

      if (retryResult.ok) {
        return retryResult.data
      }

      const retryNeedLogin = retryResult.code === AUTH_ERROR_CODE.needLogin
      const retryAccessTokenExpired = retryResult.code === AUTH_ERROR_CODE.expiredAccessToken

      if (retryNeedLogin || retryAccessTokenExpired) {
        await signOut({ redirect: false })
        goToLogin()
      }

      throw new Error(retryResult.message)
    }
  }

  if (needLogin || accessTokenExpired) {
    await signOut({ redirect: false })
    goToLogin()
  }

  throw new Error(result.message)
}
