import CryptoJS from 'crypto-js';

import { prisma } from '../../../../../lib/prisma';
import type { AuthResult } from '../../../auth/getAuth';
import { addDaysToDateString, getDateStringDayDiff, getTodayStringInUserTimezone } from '../../../utils/date/userTimezone';
import { getEnvValue } from '../../../utils/getEnvValue';
import type { ActionResult } from '../../types';

export const createAuthErrorResult = (error: Extract<AuthResult, { ok: false }>): ActionResult<never> => {
  return {
    ok: false,
    code: error.code,
    message: error.message,
  };
};

export const createServerErrorResult = (): ActionResult<never> => {
  return {
    ok: false,
    code: 'SERVER_ERROR',
    message: '서버 에러가 발생했습니다.',
  };
};

export const daysToUnits = (days: number) => ({
  days,
  weeks: Math.floor(days / 7),
  months: Math.floor(days / 30),
});

export const getYearRange = (year: number) => {
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

export const decryptDiaryText = (text: string) => {
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

export const getOrComputeStreak = async (email: string) => {
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
