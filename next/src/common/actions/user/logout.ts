'use server';

import { cookies } from 'next/headers';

import { getAuth } from '../../auth/getAuth';
import { clearAccessRefreshToken, revokeRefreshSession, revokeSessionByRefreshToken } from '../../auth/token';
import type { ActionResult } from '../types';

export const logout = async (): Promise<ActionResult<string>> => {
  const auth = await getAuth();
  const refreshToken = (await cookies()).get('refreshToken')?.value;

  // access token이 유효하면 현재 access token이 가리키는 세션을 폐기한다.
  if (auth.ok) {
    await revokeRefreshSession(auth.sessionId);
  }

  // access/refresh 쿠키가 서로 다른 세션을 가리키는 예외 상황에서도
  // refresh token이 가리키는 세션을 별도로 폐기한다.
  if (refreshToken) {
    await revokeSessionByRefreshToken(refreshToken);
  }

  // DB 세션 폐기 후 브라우저의 인증 쿠키를 삭제한다.
  await clearAccessRefreshToken();
  return { ok: true, data: '로그아웃 완료' };
};
