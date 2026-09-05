'use server';

import { prisma } from '../../../../lib/prisma';
import { getAuth } from '../../auth/getAuth';
import type { DiaryHabitMonthData } from '../../types/calendar';
import { getMonthRange } from '../../utils/date/getMonthRange';
import type { ActionResult } from '../types';
import { createAuthErrorResult, createServerErrorResult } from './utils';

export const getDiaryHabitMonthData = async ({ month }: {
  month: string;
}): Promise<ActionResult<DiaryHabitMonthData>> => {
  try {
    const auth = await getAuth();
    if (!auth.ok) return createAuthErrorResult(auth);

    const range = getMonthRange(month);
    if (!range) {
      return { ok: false, code: 'INVALID_MONTH', message: '올바른 월을 지정해주세요. (yyyy-MM)' };
    }

    const diaries = await prisma.diary.findMany({
      where: {
        userId: auth.userId,
        date: { gte: range.startDate, lte: range.endDate },
      },
      select: {
        date: true,
        visible: true,
        emotion: true,
        _count: { select: { habits: true } },
      },
    });

    const daysByDate: DiaryHabitMonthData['daysByDate'] = {};
    let diaryCount = 0;
    let completedHabitCount = 0;

    for (const diary of diaries) {
      const habitCount = diary._count.habits;
      if (!diary.visible && habitCount === 0) continue;

      daysByDate[diary.date] = {
        hasDiary: diary.visible,
        emotion: diary.visible ? diary.emotion : null,
        completedHabitCount: habitCount,
      };
      if (diary.visible) diaryCount += 1;
      completedHabitCount += habitCount;
    }

    return {
      ok: true,
      data: { month, daysByDate, summary: { diaryCount, completedHabitCount } },
    };
  } catch (error) {
    console.error(error);
    return createServerErrorResult();
  }
};
