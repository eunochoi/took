'use server';

import { cookies } from 'next/headers';

import { getAuth } from '../../auth/getAuth';
import { clearAccessRefreshToken, revokeRefreshSession, revokeSessionByRefreshToken } from '../../auth/token';
import type { ActionResult } from '../types';

export const logout = async (): Promise<ActionResult<string>> => {
  const auth = await getAuth();

  if (auth.ok) {
    await revokeRefreshSession(auth.sessionId);
  } else {
    const refreshToken = (await cookies()).get('refreshToken')?.value;
    if (refreshToken) {
      await revokeSessionByRefreshToken(refreshToken);
    }
  }

  await clearAccessRefreshToken();
  return { ok: true, data: '로그아웃 완료' };
};
