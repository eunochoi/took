'use server';

import { prisma } from '../../../../lib/prisma';
import { getAuth } from '../../auth/getAuth';
import type { ActionResult } from '../types';
import type { CheckHabitParams } from './types';
import { createAuthErrorResult, createServerErrorResult, validateDateFormat } from './utils';
import { getHabitDateAccess } from './utils/datePolicy';

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
    const { canEdit, isFuture } = await getHabitDateAccess(date);
    if (!canEdit) {
      return {
        ok: false,
        code: isFuture ? 'FUTURE_HABIT_DATE' : 'HABIT_DATE_NOT_EDITABLE',
        message: isFuture
          ? '미래 날짜의 습관은 체크할 수 없습니다.'
          : '습관은 오늘을 포함한 최근 4일만 변경할 수 있습니다.',
      };
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

      // Diary와 Habit의 암시적 N:M 연결에 habit을 추가한다.
      // 이미 연결되어 있으면 Prisma가 같은 연결을 중복으로 만들지 않는다.
      await tx.diary.update({
        where: { id: diary.id },
        data: {
          habits: {
            connect: { id: habit.id },
          },
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
