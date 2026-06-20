'use server';

import { prisma } from '../../../lib/prisma';
import { getAuth, type AuthResult } from '../auth/getAuth';
import { getDaysAgoStringInUserTimezone, getTodayStringInUserTimezone } from '../utils/date/userTimezone';
import type { ActionResult } from './types';

type IdParams = {
  id: string | number | null | undefined;
};

type ListParams = {
  sort: string;
  customOrder?: number[];
};

type HabitDateParams = {
  id: number;
  date: string;
};

type HabitMonthParams = {
  id: string | null;
  month: string;
};

type HabitYearParams = {
  id: string | null;
  year: string;
};

type HabitInputParams = {
  habitId?: string | number | null;
  habitName: string;
  priority: number;
};

type DeleteHabitParams = {
  habitId: number;
};

type CheckHabitParams = {
  habitId: number;
  date: string;
};

type HabitWithUserId = {
  id: number;
  email: string;
  name: string;
  priority: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type HabitData = {
  UserId: number;
  id: number;
  email: string;
  name: string;
  priority: number;
  createdAt: string;
  updatedAt: string;
};

export type TodayHabitStat = {
  createdHabits: number;
  todayDoneHabits: number;
};

export type HabitMonthlyStatus = {
  date: string;
  Habits: { name: string }[];
};

const MAX_HABIT_COUNT = 18;

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

const validateDateFormat = (dateString: string | undefined) => {
  if (!dateString || typeof dateString !== 'string') return false;

  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;

  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  return date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day;
};

const getMonthRange = (monthString: string) => {
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

const getYearRange = (year: string | number | null | undefined) => {
  const parsedYear = typeof year === 'string' ? parseInt(year, 10) : year;

  if (!parsedYear || Number.isNaN(parsedYear) || parsedYear < 1900 || parsedYear > 2100) {
    throw new Error('INVALID_YEAR');
  }

  return {
    startDate: `${parsedYear}-01-01`,
    endDate: `${parsedYear}-12-31`,
  };
};

const parseHabitId = (id: string | number | null | undefined) => {
  const habitId = Number(id);

  if (!id || Number.isNaN(habitId)) {
    return null;
  }

  return habitId;
};

const formatHabitData = (habit: HabitWithUserId): HabitData => {
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

export const getHabitById = async ({ id }: IdParams): Promise<ActionResult<HabitData>> => {
  try {
    const auth = await getAuth();
    if (!auth.ok) return createAuthErrorResult(auth);

    const habitId = parseHabitId(id);
    if (!habitId) {
      return { ok: false, code: 'INVALID_HABIT_ID', message: 'id는 필수입니다.' };
    }

    const habit = await prisma.habit.findFirst({
      where: { id: habitId, email: auth.email },
    });

    if (!habit) {
      return { ok: false, code: 'HABIT_NOT_FOUND', message: '습관을 찾을 수 없습니다.' };
    }

    return { ok: true, data: formatHabitData(habit) };
  } catch (error) {
    console.error(error);
    return createServerErrorResult();
  }
};

export const getHabitList = async ({ sort, customOrder = [] }: ListParams): Promise<ActionResult<HabitData[]>> => {
  try {
    const auth = await getAuth();
    if (!auth.ok) return createAuthErrorResult(auth);

    const orderIds = customOrder.map((id) => Number(id)).filter((id) => Number.isFinite(id));

    const habits = await prisma.habit.findMany({
      where: { email: auth.email },
      orderBy: sort === 'DESC'
        ? { createdAt: 'desc' }
        : sort === 'PRIORITY'
          ? [{ priority: 'desc' }, { createdAt: 'asc' }]
          : { createdAt: 'asc' },
    });

    if (sort === 'CUSTOM' && orderIds.length > 0) {
      const orderMap = new Map(orderIds.map((id, index) => [id, index]));
      habits.sort((a, b) => {
        const aOrder = orderMap.get(a.id);
        const bOrder = orderMap.get(b.id);

        if (aOrder !== undefined && bOrder !== undefined) return aOrder - bOrder;
        if (aOrder !== undefined) return -1;
        if (bOrder !== undefined) return 1;
        return a.createdAt.getTime() - b.createdAt.getTime();
      });
    }

    return { ok: true, data: habits.map(formatHabitData) };
  } catch (error) {
    console.error(error);
    return createServerErrorResult();
  }
};

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

export const getHabitMonthlyStatus = async ({ id, month }: HabitMonthParams): Promise<ActionResult<HabitMonthlyStatus[]>> => {
  try {
    const auth = await getAuth();
    if (!auth.ok) return createAuthErrorResult(auth);

    const habitId = parseHabitId(id);
    if (!habitId) {
      return { ok: false, code: 'INVALID_HABIT_ID', message: 'id는 필수입니다.' };
    }

    const { startDate, endDate } = getMonthRange(month);
    const diaries = await prisma.diary.findMany({
      where: {
        email: auth.email,
        date: {
          gte: startDate,
          lte: endDate,
        },
        diaryHabits: {
          some: { habitId },
        },
      },
      select: {
        date: true,
        diaryHabits: {
          where: { habitId },
          select: {
            habit: {
              select: { name: true },
            },
          },
        },
      },
    });

    return {
      ok: true,
      data: diaries.map((diary) => ({
        date: diary.date,
        Habits: diary.diaryHabits.map(({ habit }) => ({ name: habit.name })),
      })),
    };
  } catch (error) {
    if (error instanceof Error && error.message === 'INVALID_MONTH') {
      return { ok: false, code: 'INVALID_MONTH', message: '월 형식이 올바르지 않습니다. (yyyy-MM)' };
    }

    console.error(error);
    return createServerErrorResult();
  }
};

export const getHabitYearlyStatus = async ({ id, year }: HabitYearParams): Promise<ActionResult<number[]>> => {
  try {
    const auth = await getAuth();
    if (!auth.ok) return createAuthErrorResult(auth);

    const habitId = parseHabitId(id);
    if (!habitId) {
      return { ok: false, code: 'INVALID_HABIT_ID', message: 'id는 필수입니다.' };
    }

    const { startDate, endDate } = getYearRange(year);
    const diaries = await prisma.diary.findMany({
      where: {
        email: auth.email,
        date: {
          gte: startDate,
          lte: endDate,
        },
        diaryHabits: {
          some: { habitId },
        },
      },
      select: { date: true },
    });

    const result = Array(12).fill(0);
    diaries.forEach((diary) => {
      const month = parseInt(diary.date.split('-')[1], 10) - 1;
      result[month] += 1;
    });

    return { ok: true, data: result };
  } catch (error) {
    if (error instanceof Error && error.message === 'INVALID_YEAR') {
      return { ok: false, code: 'INVALID_YEAR', message: '연도 형식이 올바르지 않습니다. (1900-2100)' };
    }

    console.error(error);
    return createServerErrorResult();
  }
};

export const createHabit = async ({ habitName, priority }: HabitInputParams): Promise<ActionResult<HabitData>> => {
  try {
    const auth = await getAuth();
    if (!auth.ok) return createAuthErrorResult(auth);

    if (habitName == null || typeof habitName !== 'string' || !habitName.trim()) {
      return { ok: false, code: 'INVALID_HABIT_NAME', message: 'habitName은 필수이며 비어있을 수 없습니다.' };
    }

    const user = await prisma.user.findUnique({
      where: { email: auth.email },
      select: { id: true },
    });

    if (!user) {
      return { ok: false, code: 'USER_NOT_FOUND', message: '유저가 존재하지 않습니다.' };
    }

    const existingHabit = await prisma.habit.findFirst({
      where: { userId: user.id, name: habitName },
    });

    if (existingHabit) {
      return { ok: false, code: 'DUPLICATE_HABIT_NAME', message: '같은 이름을 가진 습관이 이미 존재합니다.' };
    }

    const habitCount = await prisma.habit.count({
      where: { userId: user.id },
    });

    if (habitCount >= MAX_HABIT_COUNT) {
      return { ok: false, code: 'HABIT_LIMIT_EXCEEDED', message: '습관은 최대 18개까지 생성 가능합니다.' };
    }

    const habit = await prisma.habit.create({
      data: {
        userId: user.id,
        email: auth.email,
        name: habitName,
        priority,
      },
    });

    return { ok: true, data: formatHabitData(habit) };
  } catch (error) {
    console.error(error);
    return createServerErrorResult();
  }
};

export const updateHabit = async ({ habitId, habitName, priority }: HabitInputParams): Promise<ActionResult<HabitData>> => {
  try {
    const auth = await getAuth();
    if (!auth.ok) return createAuthErrorResult(auth);

    const parsedHabitId = parseHabitId(habitId);
    if (!parsedHabitId || habitName == null || typeof habitName !== 'string' || !habitName.trim()) {
      return { ok: false, code: 'INVALID_HABIT_INPUT', message: 'habitId와 habitName은 필수이며 habitName은 비어있을 수 없습니다.' };
    }

    const habit = await prisma.habit.findFirst({
      where: { id: parsedHabitId, email: auth.email },
    });

    if (!habit) {
      return { ok: false, code: 'HABIT_NOT_FOUND', message: '습관이 존재하지 않습니다.' };
    }

    const duplicateName = await prisma.habit.findFirst({
      where: {
        email: auth.email,
        name: habitName,
        id: { not: parsedHabitId },
      },
    });

    if (duplicateName) {
      return { ok: false, code: 'DUPLICATE_HABIT_NAME', message: '동일한 이름의 습관이 존재합니다.' };
    }

    const updatedHabit = await prisma.habit.update({
      where: { id: habit.id },
      data: { name: habitName, priority },
    });

    return { ok: true, data: formatHabitData(updatedHabit) };
  } catch (error) {
    console.error(error);
    return createServerErrorResult();
  }
};

export const deleteHabit = async ({ habitId }: DeleteHabitParams): Promise<ActionResult<string>> => {
  try {
    const auth = await getAuth();
    if (!auth.ok) return createAuthErrorResult(auth);

    const habit = await prisma.habit.findFirst({
      where: { id: habitId, email: auth.email },
    });

    if (!habit) {
      return { ok: false, code: 'HABIT_NOT_FOUND', message: '습관이 존재하지 않습니다.' };
    }

    await prisma.habit.delete({
      where: { id: habit.id },
    });

    return { ok: true, data: '습관이 삭제되었습니다.' };
  } catch (error) {
    console.error(error);
    return createServerErrorResult();
  }
};

export const checkHabit = async ({ habitId, date }: CheckHabitParams): Promise<ActionResult<string>> => {
  try {
    const auth = await getAuth();
    if (!auth.ok) return createAuthErrorResult(auth);

    if (habitId == null || date == null) {
      return { ok: false, code: 'INVALID_HABIT_CHECK_INPUT', message: 'habitId와 date는 필수입니다.' };
    }
    if (!validateDateFormat(date)) {
      return { ok: false, code: 'INVALID_DATE', message: '날짜 형식이 올바르지 않습니다. (yyyy-MM-dd)' };
    }

    await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { email: auth.email },
        select: { id: true },
      });
      if (!user) throw new Error('USER_NOT_FOUND');

      const habit = await tx.habit.findFirst({
        where: { email: auth.email, id: habitId },
        select: { id: true },
      });
      if (!habit) throw new Error('HABIT_NOT_FOUND');

      const diary = await tx.diary.upsert({
        where: {
          userId_date: {
            userId: user.id,
            date,
          },
        },
        update: {},
        create: {
          visible: false,
          userId: user.id,
          email: auth.email,
          emotion: 0,
          date,
          text: '-',
        },
        select: { id: true },
      });

      await tx.diaryHabit.upsert({
        where: {
          habitId_diaryId: {
            habitId: habit.id,
            diaryId: diary.id,
          },
        },
        update: {},
        create: {
          habitId: habit.id,
          diaryId: diary.id,
        },
      });
    });

    return { ok: true, data: 'checked' };
  } catch (error) {
    if (error instanceof Error && error.message === 'USER_NOT_FOUND') {
      return { ok: false, code: 'USER_NOT_FOUND', message: '유저 정보가 존재하지 않습니다.' };
    }
    if (error instanceof Error && error.message === 'HABIT_NOT_FOUND') {
      return { ok: false, code: 'HABIT_NOT_FOUND', message: '습관이 존재하지 않습니다.' };
    }

    console.error(error);
    return createServerErrorResult();
  }
};

export const uncheckHabit = async ({ habitId, date }: CheckHabitParams): Promise<ActionResult<string>> => {
  try {
    const auth = await getAuth();
    if (!auth.ok) return createAuthErrorResult(auth);

    if (habitId == null || date == null) {
      return { ok: false, code: 'INVALID_HABIT_CHECK_INPUT', message: 'habitId와 date는 필수입니다.' };
    }
    if (!validateDateFormat(date)) {
      return { ok: false, code: 'INVALID_DATE', message: '날짜 형식이 올바르지 않습니다. (yyyy-MM-dd)' };
    }

    await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { email: auth.email },
        select: { id: true },
      });
      if (!user) throw new Error('USER_NOT_FOUND');

      const habit = await tx.habit.findFirst({
        where: { email: auth.email, id: habitId },
        select: { id: true },
      });
      if (!habit) throw new Error('HABIT_NOT_FOUND');

      const diary = await tx.diary.findFirst({
        where: { email: auth.email, date },
        select: { id: true },
      });
      if (!diary) throw new Error('DIARY_NOT_FOUND');

      await tx.diaryHabit.deleteMany({
        where: {
          habitId: habit.id,
          diaryId: diary.id,
        },
      });
    });

    return { ok: true, data: 'unchecked' };
  } catch (error) {
    if (error instanceof Error && error.message === 'USER_NOT_FOUND') {
      return { ok: false, code: 'USER_NOT_FOUND', message: '유저 정보가 존재하지 않습니다.' };
    }
    if (error instanceof Error && error.message === 'HABIT_NOT_FOUND') {
      return { ok: false, code: 'HABIT_NOT_FOUND', message: '습관이 존재하지 않습니다.' };
    }
    if (error instanceof Error && error.message === 'DIARY_NOT_FOUND') {
      return { ok: false, code: 'DIARY_NOT_FOUND', message: '다이어리가 존재하지 않습니다.' };
    }

    console.error(error);
    return createServerErrorResult();
  }
};
