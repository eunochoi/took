'use server';

import CryptoJS from 'crypto-js';

import { prisma } from '../../../lib/prisma';
import { getAuth, type AuthResult } from '../auth/getAuth';
import { getEnvValue } from '../utils/getEnvValue';
import type { ActionResult } from './types';

type DiaryImageData = {
  id: string;
  src: string;
  order: number | null;
};

type DiaryHabitData = {
  UserId: number;
  id: number;
  email: string;
  name: string;
  priority: number;
};

export type DiaryData = {
  email: string;
  id: number;
  date: string;
  text: string;
  emotion: number;
  Images: DiaryImageData[];
  Habits: DiaryHabitData[];
  visible: boolean;
};

export type MonthlyDiaryData = {
  date: string;
  visible: boolean;
  emotion: number;
  Habits: { name: string }[];
};

type CreateDiaryParams = {
  date?: string;
  text: string;
  images: string[];
  emotion: number;
};

type UpdateDiaryParams = {
  diaryId?: string | null;
  text: string;
  images: string[];
  emotion: number;
};

type DeleteDiaryParams = {
  id: number;
};

type IdParams = {
  id: string | number | null | undefined;
};

type DateParams = {
  date: string;
};

type MonthParams = {
  month: string;
};

type ListParams = {
  sort: string;
  search: number;
  limit: number;
  pageParam: number;
  selectedMonth: number;
  selectedYear: number;
};

type DiaryWithRelations = {
  email: string;
  id: number;
  date: string;
  text: string;
  emotion: number;
  visible: boolean;
  images: {
    id: number;
    src: string;
    order: number | null;
  }[];
  diaryHabits: {
    habit: {
      id: number;
      email: string;
      name: string;
      priority: number;
      userId: number;
    };
  }[];
};

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
  const parsedDate = date instanceof Date ? date : new Date(date);
  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
  const day = String(parsedDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const encryptDiaryText = (text: string) => {
  return CryptoJS.AES.encrypt(text, getEnvValue('DATA_SECRET_KEY')).toString();
};

const decryptDiaryText = (text: string) => {
  return CryptoJS.AES.decrypt(text, getEnvValue('DATA_SECRET_KEY')).toString(CryptoJS.enc.Utf8);
};

const parseDiaryId = (id: string | number | null | undefined) => {
  const diaryId = Number(id);

  if (!id || Number.isNaN(diaryId)) {
    return null;
  }

  return diaryId;
};

const formatDiaryData = (diary: DiaryWithRelations): DiaryData => {
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

const recomputeStreak = async (email: string) => {
  const diaries = await prisma.diary.findMany({
    where: { email, visible: true },
    select: { date: true },
  });

  const allDatesSet = new Set<string>();
  diaries.forEach((diary) => {
    allDatesSet.add(dateToYMD(diary.date));
  });

  const allDates = Array.from(allDatesSet).sort();
  const today = new Date();
  const todayStr = dateToYMD(today);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = dateToYMD(yesterday);

  let longestStreak = 0;
  let currentStreak = 0;
  let tempStreak = 1;

  const datesExcludingToday = allDates.filter((date) => date !== todayStr);
  if (datesExcludingToday.length > 0) {
    tempStreak = 1;
    for (let i = 1; i < datesExcludingToday.length; i += 1) {
      const prevDate = new Date(`${datesExcludingToday[i - 1]}T00:00:00`);
      const currentDate = new Date(`${datesExcludingToday[i]}T00:00:00`);
      const diffDays = (currentDate.getTime() - prevDate.getTime()) / 86400000;

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
      const currentDate = new Date(`${allDates[i + 1]}T00:00:00`);
      const prevDate = new Date(`${allDates[i]}T00:00:00`);
      const diffDays = (currentDate.getTime() - prevDate.getTime()) / 86400000;

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

export const createDiary = async ({
  date,
  text,
  images,
  emotion,
}: CreateDiaryParams): Promise<ActionResult<DiaryData>> => {
  try {
    const auth = await getAuth();
    if (!auth.ok) return createAuthErrorResult(auth);

    if (emotion === undefined || emotion === null || emotion < 0 || emotion > 9) {
      return { ok: false, code: 'INVALID_EMOTION', message: '감정 값이 올바르지 않습니다. (0-9)' };
    }
    if (!validateDateFormat(date) || typeof text !== 'string') {
      return { ok: false, code: 'INVALID_DIARY_INPUT', message: 'date와 text는 필수이며 text는 문자열이어야 합니다.' };
    }
    const diaryDate = date as string;

    const diary = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { email: auth.email },
        select: { id: true },
      });

      if (!user) throw new Error('USER_NOT_FOUND');

      const existingDiary = await tx.diary.findUnique({
        where: {
          userId_date: {
            userId: user.id,
            date: diaryDate,
          },
        },
      });

      if (existingDiary?.visible) {
        throw new Error('DIARY_ALREADY_EXISTS');
      }

      const diaryData = existingDiary
        ? await tx.diary.update({
          where: { id: existingDiary.id },
          data: {
            visible: true,
            text: encryptDiaryText(text),
            emotion,
          },
        })
        : await tx.diary.create({
          data: {
            visible: true,
            userId: user.id,
            email: auth.email,
            emotion,
            date: diaryDate,
            text: encryptDiaryText(text),
          },
        });

      await tx.image.deleteMany({
        where: { diaryId: diaryData.id },
      });

      if (images.length > 0) {
        await tx.image.createMany({
          data: images.map((src, index) => ({
            src,
            order: index,
            diaryId: diaryData.id,
          })),
        });
      }

      return tx.diary.findUniqueOrThrow({
        where: { id: diaryData.id },
        include: {
          images: { orderBy: { order: 'asc' } },
          diaryHabits: {
            include: { habit: true },
            orderBy: { habit: { priority: 'desc' } },
          },
        },
      });
    });

    await recomputeStreak(auth.email);
    return { ok: true, data: formatDiaryData(diary) };
  } catch (error) {
    if (error instanceof Error && error.message === 'USER_NOT_FOUND') {
      return { ok: false, code: 'USER_NOT_FOUND', message: '유저가 존재하지 않습니다.' };
    }
    if (error instanceof Error && error.message === 'DIARY_ALREADY_EXISTS') {
      return { ok: false, code: 'DIARY_ALREADY_EXISTS', message: '해당 날짜에 일기가 이미 존재합니다.' };
    }

    console.error(error);
    return createServerErrorResult();
  }
};

export const updateDiary = async ({
  diaryId,
  text,
  images,
  emotion,
}: UpdateDiaryParams): Promise<ActionResult<DiaryData>> => {
  try {
    const auth = await getAuth();
    if (!auth.ok) return createAuthErrorResult(auth);

    const parsedDiaryId = parseDiaryId(diaryId);
    if (!parsedDiaryId) {
      return { ok: false, code: 'INVALID_DIARY_ID', message: 'diaryId는 필수입니다.' };
    }
    if (emotion === undefined || emotion === null || emotion < 0 || emotion > 9) {
      return { ok: false, code: 'INVALID_EMOTION', message: '감정 값이 올바르지 않습니다. (0-9)' };
    }
    if (typeof text !== 'string') {
      return { ok: false, code: 'INVALID_DIARY_INPUT', message: 'text는 문자열이어야 합니다.' };
    }

    const diary = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { email: auth.email },
        select: { id: true },
      });

      if (!user) throw new Error('USER_NOT_FOUND');

      const foundDiary = await tx.diary.findFirst({
        where: { id: parsedDiaryId, userId: user.id },
      });

      if (!foundDiary) throw new Error('DIARY_NOT_FOUND');

      await tx.diary.update({
        where: { id: foundDiary.id },
        data: {
          text: encryptDiaryText(text),
          emotion,
        },
      });

      await tx.image.deleteMany({
        where: { diaryId: foundDiary.id },
      });

      if (images.length > 0) {
        await tx.image.createMany({
          data: images.map((src, index) => ({
            src,
            order: index,
            diaryId: foundDiary.id,
          })),
        });
      }

      return tx.diary.findUniqueOrThrow({
        where: { id: foundDiary.id },
        include: {
          images: { orderBy: { order: 'asc' } },
          diaryHabits: {
            include: { habit: true },
            orderBy: { habit: { priority: 'desc' } },
          },
        },
      });
    });

    return { ok: true, data: formatDiaryData(diary) };
  } catch (error) {
    if (error instanceof Error && error.message === 'USER_NOT_FOUND') {
      return { ok: false, code: 'USER_NOT_FOUND', message: '유저가 존재하지 않습니다.' };
    }
    if (error instanceof Error && error.message === 'DIARY_NOT_FOUND') {
      return { ok: false, code: 'DIARY_NOT_FOUND', message: '게시글이 올바르지 않습니다.' };
    }

    console.error(error);
    return createServerErrorResult();
  }
};

export const deleteDiary = async ({ id }: DeleteDiaryParams): Promise<ActionResult<string>> => {
  try {
    const auth = await getAuth();
    if (!auth.ok) return createAuthErrorResult(auth);

    await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { email: auth.email },
        select: { id: true },
      });

      if (!user) throw new Error('USER_NOT_FOUND');

      const diary = await tx.diary.findFirst({
        where: { id, userId: user.id },
      });

      if (!diary) throw new Error('DIARY_NOT_FOUND');

      await tx.diary.update({
        where: { id: diary.id },
        data: {
          text: '',
          visible: false,
          emotion: 9,
        },
      });

      await tx.image.deleteMany({
        where: { diaryId: diary.id },
      });
    });

    await recomputeStreak(auth.email);
    return { ok: true, data: '일기 삭제 완료' };
  } catch (error) {
    if (error instanceof Error && error.message === 'USER_NOT_FOUND') {
      return { ok: false, code: 'USER_NOT_FOUND', message: '유저가 존재하지 않습니다.' };
    }
    if (error instanceof Error && error.message === 'DIARY_NOT_FOUND') {
      return { ok: false, code: 'DIARY_NOT_FOUND', message: '게시글이 올바르지 않습니다.' };
    }

    console.error(error);
    return createServerErrorResult();
  }
};

export const getDiaryById = async ({ id }: IdParams): Promise<ActionResult<DiaryData | null>> => {
  try {
    const auth = await getAuth();
    if (!auth.ok) return createAuthErrorResult(auth);

    const diaryId = parseDiaryId(id);
    if (!diaryId) return { ok: true, data: null };

    const diary = await prisma.diary.findFirst({
      where: {
        email: auth.email,
        id: diaryId,
        visible: true,
      },
      include: {
        images: { orderBy: { order: 'asc' } },
        diaryHabits: {
          include: { habit: true },
          orderBy: { habit: { priority: 'desc' } },
        },
      },
    });

    if (!diary) {
      return { ok: false, code: 'DIARY_NOT_FOUND', message: '다이어리를 찾을 수 없습니다.' };
    }

    return { ok: true, data: formatDiaryData(diary) };
  } catch (error) {
    console.error(error);
    return createServerErrorResult();
  }
};

export const getDiaryByDate = async ({ date }: DateParams): Promise<ActionResult<DiaryData | null>> => {
  try {
    const auth = await getAuth();
    if (!auth.ok) return createAuthErrorResult(auth);

    if (!validateDateFormat(date)) {
      return { ok: false, code: 'INVALID_DATE', message: '날짜 형식이 올바르지 않습니다. (yyyy-MM-dd)' };
    }

    const diary = await prisma.diary.findFirst({
      where: {
        email: auth.email,
        date,
      },
      include: {
        images: { orderBy: { order: 'asc' } },
        diaryHabits: {
          include: { habit: true },
          orderBy: { habit: { priority: 'desc' } },
        },
      },
    });

    if (!diary) return { ok: true, data: null };

    return { ok: true, data: formatDiaryData(diary) };
  } catch (error) {
    console.error(error);
    return createServerErrorResult();
  }
};

export const getMonthlyDiaryData = async ({ month }: MonthParams): Promise<ActionResult<MonthlyDiaryData[]>> => {
  try {
    const auth = await getAuth();
    if (!auth.ok) return createAuthErrorResult(auth);

    const { startDate, endDate } = getMonthRange(month);
    const diaries = await prisma.diary.findMany({
      where: {
        email: auth.email,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        date: true,
        visible: true,
        emotion: true,
        diaryHabits: {
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
        visible: diary.visible,
        emotion: diary.emotion,
        Habits: diary.diaryHabits.map(({ habit }) => ({ name: habit.name })),
      })),
    };
  } catch (error) {
    console.error(error);
    return createServerErrorResult();
  }
};

export const getDiaryList = async ({
  sort,
  search,
  pageParam,
  limit,
  selectedYear,
  selectedMonth,
}: ListParams): Promise<ActionResult<DiaryData[]>> => {
  try {
    const auth = await getAuth();
    if (!auth.ok) return createAuthErrorResult(auth);

    const sortVal = sort === 'ASC' || sort === 'DESC' ? sort : 'DESC';
    const page = Math.max(0, Number(pageParam) || 0);
    const limitNum = Math.min(100, Math.max(1, Number(limit) || 10));
    const offset = page * limitNum;
    const nYear = Number(selectedYear);
    const nMonth = Number(selectedMonth);

    let rangeStart = '0000-01-01';
    let rangeEnd = '9999-12-31';

    if (nYear && nMonth && nMonth !== 0) {
      const monthStr = String(nMonth).padStart(2, '0');
      const lastDay = new Date(nYear, nMonth, 0).getDate();
      rangeStart = `${nYear}-${monthStr}-01`;
      rangeEnd = `${nYear}-${monthStr}-${String(lastDay).padStart(2, '0')}`;
    }

    const emotionFilter = Number(search);
    const diaries = await prisma.diary.findMany({
      where: {
        email: auth.email,
        visible: true,
        date: {
          gte: rangeStart,
          lte: rangeEnd,
        },
        ...(emotionFilter !== 10 && emotionFilter >= 0 && emotionFilter <= 9
          ? { emotion: emotionFilter }
          : {}),
      },
      skip: offset,
      take: limitNum,
      include: {
        images: { orderBy: { order: 'asc' } },
        diaryHabits: {
          include: { habit: true },
          orderBy: { habit: { priority: 'desc' } },
        },
      },
      orderBy: [
        { date: sortVal.toLowerCase() as 'asc' | 'desc' },
      ],
    });

    return { ok: true, data: diaries.map(formatDiaryData) };
  } catch (error) {
    console.error(error);
    return createServerErrorResult();
  }
};
