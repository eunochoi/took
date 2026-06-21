import CryptoJS from 'crypto-js';

import { prisma } from '../../../../../lib/prisma';
import type { AuthResult } from '../../../auth/getAuth';
import { getEnvValue } from '../../../utils/getEnvValue';
import { computeDiaryStreakByEmail } from '../../streak';
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

export const decryptDiaryText = (text: string) => {
  return CryptoJS.AES.decrypt(text, getEnvValue('DATA_SECRET_KEY')).toString(CryptoJS.enc.Utf8);
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

  const streak = await computeDiaryStreakByEmail(email);

  if (
    user.currentStreakDays !== streak.currentStreak ||
    user.longestStreakDays !== streak.longestStreak
  ) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        currentStreakDays: streak.currentStreak,
        longestStreakDays: streak.longestStreak,
      },
    });
  }

  return streak;
};
