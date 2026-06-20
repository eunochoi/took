'use server';

import CryptoJS from 'crypto-js';

import { prisma } from '../../../lib/prisma';
import { getAuth, type AuthResult } from '../auth/getAuth';
import { addDaysToDateString, getDateStringDayDiff, getTodayStringInUserTimezone } from '../utils/date/userTimezone';
import { getEnvValue } from '../utils/getEnvValue';
import type { ActionResult } from './types';

type YearParams = {
  year: number;
};

type StreakUnits = {
  days: number;
  weeks: number;
  months: number;
};

export interface DiaryStats {
  totalCount: number;
  emotionCounts: number[];
  currentStreak: StreakUnits;
  longestStreak: StreakUnits;
  monthlyCount: number[];
  totalTextLength: number;
  monthlyEmotionCounts: number[][];
}

export interface HabitCount {
  id: number;
  name: string;
  priority: number;
  count: number;
}

export interface HabitStats {
  topHabits: HabitCount[];
  bottomHabits: HabitCount[];
  totalCompletions: number;
  diariesWithHabits: number;
  totalDiaries: number;
  habitCompletionDays: number;
  avgHabitsPerDiaryWithHabits: number;
  avgHabitsPerCompletionDay: number;
  totalHabits: number;
}

const createAuthErrorResult = (error: Extract<AuthResult, { ok: false }>): ActionResult<never> => {
  return {
    ok: false,
    code: error.code,
    message: error.message,
  };
};

const createServerErrorResult = (): ActionResult<never> => {
  return {
    ok: false,
    code: 'SERVER_ERROR',
    message: '서버 에러가 발생했습니다.',
  };
};

const daysToUnits = (days: number) => ({
  days,
  weeks: Math.floor(days / 7),
  months: Math.floor(days / 30),
});

const getYearRange = (year: number) => {
  if (!Number.isFinite(year) || year < 1900 || year > 2100) {
    throw new Error('INVALID_YEAR');
  }

  return {
    startDate: `${year}-01-01`,
    endDate: `${year}-12-31`,
  };
};

const dateToYMD = (date: Date | string) => {
  if (typeof date === 'string') return date;

  const parsedDate = date instanceof Date ? date : new Date(date);
  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
  const day = String(parsedDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const decryptDiaryText = (text: string) => {
  return CryptoJS.AES.decrypt(text, getEnvValue('DATA_SECRET_KEY')).toString(CryptoJS.enc.Utf8);
};

const computeStreaks = async (email: string) => {
  const diaries = await prisma.diary.findMany({
    where: { email, visible: true },
    select: { date: true },
  });

  const allDatesSet = new Set<string>();
  diaries.forEach((diary) => {
    allDatesSet.add(dateToYMD(diary.date));
  });

  const allDates = Array.from(allDatesSet).sort();
  const todayStr = await getTodayStringInUserTimezone();
  const yesterdayStr = addDaysToDateString(todayStr, -1);

  let longestStreak = 0;
  let currentStreak = 0;
  let tempStreak = 1;

  const datesExcludingToday = allDates.filter((date) => date !== todayStr);
  if (datesExcludingToday.length > 0) {
    tempStreak = 1;
    for (let i = 1; i < datesExcludingToday.length; i += 1) {
      const diffDays = getDateStringDayDiff(datesExcludingToday[i - 1], datesExcludingToday[i]);

      if (diffDays === 1) {
        tempStreak += 1;
      } else {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 1;
      }
    }
    longestStreak = Math.max(longestStreak, tempStreak);
  }

  const hasYesterday = allDates.includes(yesterdayStr);
  if (hasYesterday) {
    const yesterdayIndex = allDates.indexOf(yesterdayStr);
    currentStreak = 1;

    for (let i = yesterdayIndex - 1; i >= 0; i -= 1) {
      const diffDays = getDateStringDayDiff(allDates[i], allDates[i + 1]);

      if (diffDays === 1) {
        currentStreak += 1;
      } else {
        break;
      }
    }
  }

  return { currentStreak, longestStreak };
};

const getOrComputeStreak = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      currentStreakDays: true,
      longestStreakDays: true,
    },
  });

  if (!user) return null;

  let currentStreak = user.currentStreakDays ?? 0;
  let longestStreak = user.longestStreakDays ?? 0;

  if (user.currentStreakDays == null || user.longestStreakDays == null) {
    const computed = await computeStreaks(email);
    currentStreak = computed.currentStreak;
    longestStreak = computed.longestStreak;

    await prisma.user.update({
      where: { id: user.id },
      data: {
        currentStreakDays: currentStreak,
        longestStreakDays: longestStreak,
      },
    });
  }

  return { currentStreak, longestStreak };
};

export const getAvailableYears = async (): Promise<ActionResult<number[]>> => {
  try {
    const auth = await getAuth();
    if (!auth.ok) return createAuthErrorResult(auth);

    const diaries = await prisma.diary.findMany({
      where: {
        email: auth.email,
        visible: true,
      },
      select: { date: true },
    });

    const years = Array.from(new Set(diaries.map((diary) => parseInt(diary.date.split('-')[0], 10))))
      .sort((a, b) => b - a);

    return { ok: true, data: years };
  } catch (error) {
    console.error(error);
    return createServerErrorResult();
  }
};

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

export const getHabitStats = async ({ year }: YearParams): Promise<ActionResult<HabitStats>> => {
  try {
    const auth = await getAuth();
    if (!auth.ok) return createAuthErrorResult(auth);

    const { startDate, endDate } = getYearRange(year);
    const [totalHabits, allHabits, diaries] = await Promise.all([
      prisma.habit.count({ where: { email: auth.email } }),
      prisma.habit.findMany({
        where: { email: auth.email },
        select: {
          id: true,
          name: true,
          priority: true,
        },
      }),
      prisma.diary.findMany({
        where: {
          email: auth.email,
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
        select: {
          id: true,
          visible: true,
          date: true,
          diaryHabits: {
            select: {
              habit: {
                select: {
                  id: true,
                  name: true,
                  priority: true,
                },
              },
            },
          },
        },
      }),
    ]);

    const habitCounts: Record<number, HabitCount> = {};
    allHabits.forEach((habit) => {
      habitCounts[habit.id] = {
        id: habit.id,
        name: habit.name,
        priority: habit.priority,
        count: 0,
      };
    });

    let totalHabitCompletions = 0;
    let visibleDiariesWithHabits = 0;
    let totalHabitsInDiariesWithHabits = 0;
    const habitCompletionDates = new Set<string>();

    diaries.forEach((diary) => {
      const habits = diary.diaryHabits.map(({ habit }) => habit);
      if (habits.length > 0) {
        const habitCount = habits.length;

        if (diary.visible) {
          visibleDiariesWithHabits += 1;
          totalHabitsInDiariesWithHabits += habitCount;
        }

        habitCompletionDates.add(diary.date);
        habits.forEach((habit) => {
          totalHabitCompletions += 1;
          if (habitCounts[habit.id]) {
            habitCounts[habit.id].count += 1;
          }
        });
      }
    });

    const sortedHabits = Object.values(habitCounts).sort((a, b) => b.count - a.count);
    const topHabits = sortedHabits.slice(0, 5);
    const bottomHabits = sortedHabits.length > 5
      ? sortedHabits.slice(-5).reverse()
      : sortedHabits.slice().reverse();

    const visibleDiaries = diaries.filter((diary) => diary.visible).length;
    const avgHabitsPerDiaryWithHabits = visibleDiariesWithHabits > 0
      ? Number((totalHabitsInDiariesWithHabits / visibleDiariesWithHabits).toFixed(1))
      : 0;
    const avgHabitsPerCompletionDay = habitCompletionDates.size > 0
      ? Number((totalHabitCompletions / habitCompletionDates.size).toFixed(1))
      : 0;

    return {
      ok: true,
      data: {
        topHabits,
        bottomHabits,
        totalCompletions: totalHabitCompletions,
        diariesWithHabits: visibleDiariesWithHabits,
        totalDiaries: visibleDiaries,
        habitCompletionDays: habitCompletionDates.size,
        avgHabitsPerDiaryWithHabits,
        avgHabitsPerCompletionDay,
        totalHabits,
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
