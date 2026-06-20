'use server';

import { prisma } from '../../../../lib/prisma';
import { getAuth } from '../../auth/getAuth';
import { getTodayStringInUserTimezone } from '../../utils/date/userTimezone';
import type { ActionResult } from '../types';
import type { TodayHabitStat } from './types';
import { createAuthErrorResult, createServerErrorResult } from './utils';

export const getTodayHabitStat = async (): Promise<ActionResult<TodayHabitStat>> => {
  try {
    const auth = await getAuth();
    if (!auth.ok) return createAuthErrorResult(auth);

    const todayDate = await getTodayStringInUserTimezone();
    const [habitCount, todayDiary] = await Promise.all([
      prisma.habit.count({ where: { email: auth.email } }),
      prisma.diary.findFirst({
        where: { email: auth.email, date: todayDate },
        select: {
          diaryHabits: {
            select: { habitId: true },
          },
        },
      }),
    ]);

    return {
      ok: true,
      data: {
        createdHabits: habitCount,
        todayDoneHabits: todayDiary?.diaryHabits.length || 0,
      },
    };
  } catch (error) {
    console.error(error);
    return createServerErrorResult();
  }
};
