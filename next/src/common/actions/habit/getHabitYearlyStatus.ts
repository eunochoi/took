'use server';

import { prisma } from '../../../../lib/prisma';
import { getAuth } from '../../auth/getAuth';
import type { ActionResult } from '../types';
import type { HabitYearParams } from './types';
import { createAuthErrorResult, createServerErrorResult, getYearRange, parseHabitId } from './utils';

export const getHabitYearlyStatus = async ({ id, year }: HabitYearParams): Promise<ActionResult<number[]>> => {
  try {
    const auth = await getAuth();
    if (!auth.ok) return createAuthErrorResult(auth);

    const habitId = parseHabitId(id);
    if (!habitId) {
      return { ok: false, code: 'INVALID_HABIT_ID', message: 'id는 필수입니다.' };
    }

    const { startDate, endDate } = getYearRange(year);
    const diaries = await prisma.diary.findMany({
      where: {
        email: auth.email,
        date: {
          gte: startDate,
          lte: endDate,
        },
        diaryHabits: {
          some: { habitId },
        },
      },
      select: { date: true },
    });

    const result = Array(12).fill(0);
    diaries.forEach((diary) => {
      const month = parseInt(diary.date.split('-')[1], 10) - 1;
      result[month] += 1;
    });

    return { ok: true, data: result };
  } catch (error) {
    if (error instanceof Error && error.message === 'INVALID_YEAR') {
      return { ok: false, code: 'INVALID_YEAR', message: '연도 형식이 올바르지 않습니다. (1900-2100)' };
    }

    console.error(error);
    return createServerErrorResult();
  }
};
