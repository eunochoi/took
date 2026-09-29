'use server';

import { prisma } from '../../../../lib/prisma';
import { getAuth } from '../../auth/getAuth';
import { addDaysToDateString } from '../../utils/date/userTimezone';
import type { ActionResult } from '../types';
import type { HabitListParams, HabitPageData } from './types';
import { createAuthErrorResult, createServerErrorResult, formatHabitData, validateDateFormat } from './utils';
import { getSortedHabits } from './utils/getSortedHabits';

export const getHabitPageData = async (params: HabitListParams & { date: string }): Promise<ActionResult<HabitPageData[]>> => {
  try {
    const auth = await getAuth();
    if (!auth.ok) return createAuthErrorResult(auth);
    if (!validateDateFormat(params.date)) {
      return { ok: false, code: 'INVALID_DATE', message: '날짜 형식이 올바르지 않습니다. (yyyy-MM-dd)' };
    }

    const habits = await getSortedHabits(params, auth.email);
    if (habits.length === 0) return { ok: true, data: [] };

    const recentDates = Array.from({ length: 4 }, (_, index) => addDaysToDateString(params.date, -index));
    const habitIds = habits.map((habit) => habit.id);
    const diaries = await prisma.diary.findMany({
      where: { userId: auth.userId, date: { gte: recentDates[3], lte: params.date } },
      select: {
        date: true,
        habits: { where: { id: { in: habitIds } }, select: { id: true } },
      },
    });
    const checkedDates = new Map<number, Set<string>>();
    for (const diary of diaries) {
      for (const habit of diary.habits) {
        if (!checkedDates.has(habit.id)) checkedDates.set(habit.id, new Set());
        checkedDates.get(habit.id)!.add(diary.date);
      }
    }

    return {
      ok: true,
      data: habits.map((habit) => ({
        ...formatHabitData(habit),
        recentDateStatus: recentDates.map((date) => checkedDates.get(habit.id)?.has(date) ?? false),
      })),
    };
  } catch (error) {
    console.error(error);
    return createServerErrorResult();
  }
};
