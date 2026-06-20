'use server';

import { prisma } from '../../../../lib/prisma';
import { getAuth } from '../../auth/getAuth';
import { getDaysAgoStringInUserTimezone } from '../../utils/date/userTimezone';
import type { ActionResult } from '../types';
import type { HabitDateParams } from './types';
import { createAuthErrorResult, createServerErrorResult, parseHabitId, validateDateFormat } from './utils';

export const getHabitRecentStatus = async ({ id, date }: HabitDateParams): Promise<ActionResult<boolean[]>> => {
  try {
    const auth = await getAuth();
    if (!auth.ok) return createAuthErrorResult(auth);

    const habitId = parseHabitId(id);
    if (!habitId) {
      return { ok: false, code: 'INVALID_HABIT_ID', message: 'id는 필수입니다.' };
    }
    if (!validateDateFormat(date)) {
      return { ok: false, code: 'INVALID_DATE', message: '날짜 형식이 올바르지 않습니다. (yyyy-MM-dd)' };
    }

    const startDateStr = await getDaysAgoStringInUserTimezone(3);
    const recentDiaries = await prisma.diary.findMany({
      where: {
        email: auth.email,
        date: {
          gte: startDateStr,
          lte: date,
        },
        diaryHabits: {
          some: { habitId },
        },
      },
      select: { date: true },
      orderBy: { date: 'desc' },
    });

    const foundDates = new Set(recentDiaries.map((diary) => diary.date));
    const recentDates = [
      date,
      await getDaysAgoStringInUserTimezone(1),
      await getDaysAgoStringInUserTimezone(2),
      await getDaysAgoStringInUserTimezone(3),
    ];

    return { ok: true, data: recentDates.map((dateStr) => foundDates.has(dateStr)) };
  } catch (error) {
    console.error(error);
    return createServerErrorResult();
  }
};
