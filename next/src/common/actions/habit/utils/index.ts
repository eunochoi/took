import type { Habit } from '@prisma/client';

import type { AuthResult } from '../../../auth/getAuth';
import type { ActionResult } from '../../types';
import type { HabitData } from '../types';

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
    throw new Error('INVALID_MONTH');
  }

  const [year, month] = monthString.split('-').map(Number);
  const lastDay = new Date(year, month, 0).getDate();

  return {
    startDate: `${year}-${String(month).padStart(2, '0')}-01`,
    endDate: `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`,
  };
};

export const getYearRange = (year: string | number | null | undefined) => {
  const parsedYear = typeof year === 'string' ? parseInt(year, 10) : year;

  if (!parsedYear || Number.isNaN(parsedYear) || parsedYear < 1900 || parsedYear > 2100) {
    throw new Error('INVALID_YEAR');
  }

  return {
    startDate: `${parsedYear}-01-01`,
    endDate: `${parsedYear}-12-31`,
  };
};

export const parseHabitId = (id: string | number | null | undefined) => {
  const habitId = Number(id);

  if (!id || Number.isNaN(habitId)) {
    return null;
  }

  return habitId;
};

export const formatHabitData = (habit: Habit): HabitData => {
  return {
    UserId: habit.userId,
    id: habit.id,
    email: habit.email,
    name: habit.name,
    priority: habit.priority,
    createdAt: habit.createdAt.toISOString(),
    updatedAt: habit.updatedAt.toISOString(),
  };
};
