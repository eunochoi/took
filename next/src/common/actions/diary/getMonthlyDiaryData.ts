'use server';

import { prisma } from '../../../../lib/prisma';
import { getAuth } from '../../auth/getAuth';
import type { ActionResult } from '../types';
import type { MonthParams, MonthlyDiaryData } from './types';
import { createAuthErrorResult, createServerErrorResult, getMonthRange } from './utils';

export const getMonthlyDiaryData = async ({ month }: MonthParams): Promise<ActionResult<MonthlyDiaryData[]>> => {
  try {
    const auth = await getAuth();
    if (!auth.ok) return createAuthErrorResult(auth);

    const { startDate, endDate } = getMonthRange(month);
    const diaries = await prisma.diary.findMany({
      where: {
        email: auth.email,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        date: true,
        visible: true,
        emotion: true,
        diaryHabits: {
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
        visible: diary.visible,
        emotion: diary.emotion,
        Habits: diary.diaryHabits.map(({ habit }) => ({ name: habit.name })),
      })),
    };
  } catch (error) {
    console.error(error);
    return createServerErrorResult();
  }
};
