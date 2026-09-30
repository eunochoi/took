'use client';

import { signOut } from 'next-auth/react';

import type { ActionResult } from '../actions/types';
import { AUTH_ERROR_CODE, type AuthActionError } from './types';

interface AuthActionOptions {
  redirectOnAuthError?: boolean;
}

let accessTokenRefreshPromise: Promise<boolean> | null = null;

// 로그인 화면으로 이동
const goToLogin = () => {
  if (window.location.pathname !== '/login') {
    window.location.replace('/login');
  }
};

// refreshToken으로 accessToken 재발급 요청
const requestAccessTokenRefresh = async () => {
  const response = await fetch('/api/auth/refresh', {
    method: 'POST',
    credentials: 'include',
  });

  if (response.ok) return true;
  if (response.status === 401) return false;

  throw new Error('로그인 상태를 확인하지 못했습니다. 다시 시도해주세요.');
};

// 같은 브라우저 탭에서 동시에 발생한 refresh 요청을 하나로 합침
const requestAccessTokenRefreshWithLock = async () => {
  if (!accessTokenRefreshPromise) {
    accessTokenRefreshPromise = requestAccessTokenRefresh().finally(() => {
      accessTokenRefreshPromise = null;
    });
  }

  return accessTokenRefreshPromise;
};

// 클라이언트단에서 로그인 여부 확인후 엑세스 토큰 리프레시 관리
export const authAction = async <T,>(
  action: () => Promise<ActionResult<T>>,
  options: AuthActionOptions = {},
): Promise<T> => {
  const { redirectOnAuthError = true } = options;
  const result = await action();

  if (result.ok) {
    return result.data;
  }

  const needLogin = result.code === AUTH_ERROR_CODE.needLogin;
  const accessTokenExpired = result.code === AUTH_ERROR_CODE.expiredAccessToken;
  const shouldAttemptAccessTokenRefresh = needLogin || accessTokenExpired;

  if (shouldAttemptAccessTokenRefresh) {
    const refreshed = await requestAccessTokenRefreshWithLock();

    if (refreshed) {
      const retryResult = await action();

      if (retryResult.ok) {
        return retryResult.data;
      }

      const retryNeedLogin = retryResult.code === AUTH_ERROR_CODE.needLogin;
      const retryAccessTokenExpired = retryResult.code === AUTH_ERROR_CODE.expiredAccessToken;

      if (retryNeedLogin || retryAccessTokenExpired) {
        await signOut({ redirect: false });
        if (redirectOnAuthError) {
          goToLogin();
        }
      }

      if (retryNeedLogin || retryAccessTokenExpired) {
        const error: AuthActionError = new Error(retryResult.message);
        error.code = AUTH_ERROR_CODE.needLogin;
        throw error;
      }

      throw new Error(retryResult.message);
    }
  }

  if (needLogin || accessTokenExpired) {
    await signOut({ redirect: false });
    if (redirectOnAuthError) {
      goToLogin();
    }
    const error: AuthActionError = new Error(result.message);
    error.code = AUTH_ERROR_CODE.needLogin;
    throw error;
  }

  throw new Error(result.message);
};
