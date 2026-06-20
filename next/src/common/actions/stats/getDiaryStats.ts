'use server';

import { prisma } from '../../../../lib/prisma';
import { getAuth } from '../../auth/getAuth';
import type { ActionResult } from '../types';
import type { DiaryStats, YearParams } from './types';
import { createAuthErrorResult, createServerErrorResult, daysToUnits, decryptDiaryText, getOrComputeStreak, getYearRange } from './utils';

export const getDiaryStats = async ({ year }: YearParams): Promise<ActionResult<DiaryStats>> => {
  try {
    const auth = await getAuth();
    if (!auth.ok) return createAuthErrorResult(auth);

    const { startDate, endDate } = getYearRange(year);
    const diaries = await prisma.diary.findMany({
      where: {
        email: auth.email,
        visible: true,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        date: true,
        emotion: true,
        text: true,
      },
      orderBy: { date: 'asc' },
    });

    const streak = await getOrComputeStreak(auth.email);
    if (!streak) {
      return { ok: false, code: 'USER_NOT_FOUND', message: '유저를 찾을 수 없습니다.' };
    }

    const emotionCounts = Array(10).fill(0);
    const monthlyCount = Array(12).fill(0);
    const monthlyEmotionCounts = Array(12).fill(null).map(() => Array(10).fill(0));
    let totalTextLength = 0;

    diaries.forEach((diary) => {
      if (diary.emotion >= 0 && diary.emotion <= 9) {
        emotionCounts[diary.emotion] += 1;
      }

      const month = parseInt(diary.date.split('-')[1], 10) - 1;
      monthlyCount[month] += 1;
      if (diary.emotion >= 0 && diary.emotion <= 9) {
        monthlyEmotionCounts[month][diary.emotion] += 1;
      }

      try {
        totalTextLength += decryptDiaryText(diary.text).length;
      } catch (error) {
        console.error('Failed to decrypt text:', error);
      }
    });

    return {
      ok: true,
      data: {
        totalCount: diaries.length,
        emotionCounts,
        currentStreak: daysToUnits(streak.currentStreak),
        longestStreak: daysToUnits(streak.longestStreak),
        monthlyCount,
        totalTextLength,
        monthlyEmotionCounts,
      },
    };
  } catch (error) {
    if (error instanceof Error && error.message === 'INVALID_YEAR') {
      return { ok: false, code: 'INVALID_YEAR', message: 'year는 1900~2100 사이의 유효한 연도여야 합니다.' };
    }

    console.error(error);
    return createServerErrorResult();
  }
};
