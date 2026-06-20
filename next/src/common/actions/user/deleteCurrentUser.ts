'use server';

import { prisma } from '../../../../lib/prisma';
import { getAuth } from '../../auth/getAuth';
import { clearAccessRefreshToken } from '../../auth/token';
import type { ActionResult } from '../types';
import { createAuthErrorResult, createServerErrorResult } from './utils';

export const deleteCurrentUser = async (): Promise<ActionResult<string>> => {
  try {
    const auth = await getAuth();
    if (!auth.ok) return createAuthErrorResult(auth);

    await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { email: auth.email },
        select: { id: true },
      });

      if (!user) {
        throw new Error('USER_NOT_FOUND');
      }

      const diaries = await tx.diary.findMany({
        where: { userId: user.id },
        select: { id: true },
      });
      const diaryIds = diaries.map((diary) => diary.id);

      if (diaryIds.length > 0) {
        await tx.image.deleteMany({
          where: { diaryId: { in: diaryIds } },
        });
        await tx.diaryHabit.deleteMany({
          where: { diaryId: { in: diaryIds } },
        });
      }

      await tx.diary.deleteMany({
        where: { userId: user.id },
      });
      await tx.habit.deleteMany({
        where: { userId: user.id },
      });
      await tx.user.delete({
        where: { id: user.id },
      });
    });

    await clearAccessRefreshToken();
    return { ok: true, data: '탈퇴가 완료되었습니다.' };
  } catch (error) {
    if (error instanceof Error && error.message === 'USER_NOT_FOUND') {
      return {
        ok: false,
        code: 'USER_NOT_FOUND',
        message: '존재하지 않는 유저입니다.',
      };
    }
    console.error(error);
    return createServerErrorResult();
  }
};
