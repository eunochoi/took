'use server';

import { clearAccessRefreshToken } from '../../auth/token';
import type { ActionResult } from '../types';

export const logout = async (): Promise<ActionResult<string>> => {
  await clearAccessRefreshToken();
  return { ok: true, data: '로그아웃 완료' };
};
