'use server';

import { prisma } from '../../../../lib/prisma';
import { getAuth } from '../../auth/getAuth';
import type { ActionResult } from '../types';
import type { CurrentUser } from './types';
import { createAuthErrorResult, createServerErrorResult } from './utils';

export const getCurrentUser = async (): Promise<ActionResult<CurrentUser>> => {
  try {
    const auth = await getAuth();
    if (!auth.ok) return createAuthErrorResult(auth);

    const user = await prisma.user.findUnique({
      where: { email: auth.email },
      select: {
        id: true,
        email: true,
        provider: true,
        currentStreakDays: true,
        longestStreakDays: true,
        createdAt: true,
      },
    });

    if (!user) {
      return {
        ok: false,
        code: 'USER_NOT_FOUND',
        message: '유저를 찾을 수 없습니다.',
      };
    }

    return { ok: true, data: user };
  } catch (error) {
    console.error(error);
    return createServerErrorResult();
  }
};
