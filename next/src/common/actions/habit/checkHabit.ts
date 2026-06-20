'use server';

import { prisma } from '../../../../lib/prisma';
import { getAuth } from '../../auth/getAuth';
import type { ActionResult } from '../types';
import type { CheckHabitParams } from './types';
import { createAuthErrorResult, createServerErrorResult, validateDateFormat } from './utils';

export const checkHabit = async ({ habitId, date }: CheckHabitParams): Promise<ActionResult<string>> => {
  try {
    const auth = await getAuth();
    if (!auth.ok) return createAuthErrorResult(auth);

    if (habitId == null || date == null) {
      return { ok: false, code: 'INVALID_HABIT_CHECK_INPUT', message: 'habitId와 date는 필수입니다.' };
    }
    if (!validateDateFormat(date)) {
      return { ok: false, code: 'INVALID_DATE', message: '날짜 형식이 올바르지 않습니다. (yyyy-MM-dd)' };
    }

    await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { email: auth.email },
        select: { id: true },
      });
      if (!user) throw new Error('USER_NOT_FOUND');

      const habit = await tx.habit.findFirst({
        where: { email: auth.email, id: habitId },
        select: { id: true },
      });
      if (!habit) throw new Error('HABIT_NOT_FOUND');

      const diary = await tx.diary.upsert({
        where: {
          userId_date: {
            userId: user.id,
            date,
          },
        },
        update: {},
        create: {
          visible: false,
          userId: user.id,
          email: auth.email,
          emotion: 0,
          date,
          text: '-',
        },
        select: { id: true },
      });

      await tx.diaryHabit.upsert({
        where: {
          habitId_diaryId: {
            habitId: habit.id,
            diaryId: diary.id,
          },
        },
        update: {},
        create: {
          habitId: habit.id,
          diaryId: diary.id,
        },
      });
    });

    return { ok: true, data: 'checked' };
  } catch (error) {
    if (error instanceof Error && error.message === 'USER_NOT_FOUND') {
      return { ok: false, code: 'USER_NOT_FOUND', message: '유저 정보가 존재하지 않습니다.' };
    }
    if (error instanceof Error && error.message === 'HABIT_NOT_FOUND') {
      return { ok: false, code: 'HABIT_NOT_FOUND', message: '습관이 존재하지 않습니다.' };
    }

    console.error(error);
    return createServerErrorResult();
  }
};
