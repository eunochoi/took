'use server';

import { prisma } from '../../../../lib/prisma';
import { getAuth } from '../../auth/getAuth';
import type { ActionResult } from '../types';
import type { HabitMonthParams, HabitMonthlyStatus } from './types';
import { createAuthErrorResult, createServerErrorResult, getMonthRange, parseHabitId } from './utils';

export const getHabitMonthlyStatus = async ({ id, month }: HabitMonthParams): Promise<ActionResult<HabitMonthlyStatus[]>> => {
  try {
    const auth = await getAuth();
    if (!auth.ok) return createAuthErrorResult(auth);

    const habitId = parseHabitId(id);
    if (!habitId) {
      return { ok: false, code: 'INVALID_HABIT_ID', message: 'id는 필수입니다.' };
    }

    const { startDate, endDate } = getMonthRange(month);
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
      select: {
        date: true,
        diaryHabits: {
          where: { habitId },
          select: {
            habit: {
              select: { name: true },
            },
          },
        },
      },
    });

    return {
      ok: true,
      data: diaries.map((diary) => ({
        date: diary.date,
        Habits: diary.diaryHabits.map(({ habit }) => ({ name: habit.name })),
      })),
    };
  } catch (error) {
    if (error instanceof Error && error.message === 'INVALID_MONTH') {
      return { ok: false, code: 'INVALID_MONTH', message: '월 형식이 올바르지 않습니다. (yyyy-MM)' };
    }

    console.error(error);
    return createServerErrorResult();
  }
};
