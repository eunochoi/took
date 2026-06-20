import CryptoJS from 'crypto-js';

import { prisma } from '../../../../../lib/prisma';
import type { AuthResult } from '../../../auth/getAuth';
import { addDaysToDateString, getDateStringDayDiff, getTodayStringInUserTimezone } from '../../../utils/date/userTimezone';
import { getEnvValue } from '../../../utils/getEnvValue';
import type { ActionResult } from '../../types';
import type { DiaryData, DiaryWithRelations } from '../types';

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

export const validateDateFormat = (dateString: string | undefined) => {
  if (!dateString || typeof dateString !== 'string') return false;

  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;

  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  return date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day;
};

export const getMonthRange = (monthString: string) => {
  if (!monthString || !/^\d{4}-\d{2}$/.test(monthString)) {
    throw new Error('Invalid month format. Expected yyyy-MM');
  }

  const [year, month] = monthString.split('-').map(Number);
  const lastDay = new Date(year, month, 0).getDate();

  return {
    startDate: `${year}-${String(month).padStart(2, '0')}-01`,
    endDate: `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`,
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

export const encryptDiaryText = (text: string) => {
  return CryptoJS.AES.encrypt(text, getEnvValue('DATA_SECRET_KEY')).toString();
};

const decryptDiaryText = (text: string) => {
  return CryptoJS.AES.decrypt(text, getEnvValue('DATA_SECRET_KEY')).toString(CryptoJS.enc.Utf8);
};

export const parseDiaryId = (id: string | number | null | undefined) => {
  const diaryId = Number(id);

  if (!id || Number.isNaN(diaryId)) {
    return null;
  }

  return diaryId;
};

export const formatDiaryData = (diary: DiaryWithRelations): DiaryData => {
  return {
    email: diary.email,
    id: diary.id,
    date: diary.date,
    text: decryptDiaryText(diary.text),
    emotion: diary.emotion,
    visible: diary.visible,
    Images: diary.images.map((image) => ({
      id: String(image.id),
      src: image.src,
      order: image.order,
    })),
    Habits: diary.diaryHabits.map(({ habit }) => ({
      UserId: habit.userId,
      id: habit.id,
      email: habit.email,
      name: habit.name,
      priority: habit.priority,
    })),
  };
};

export const recomputeStreak = async (email: string) => {
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

  await prisma.user.update({
    where: { email },
    data: {
      currentStreakDays: currentStreak,
      longestStreakDays: longestStreak,
    },
  });
};
