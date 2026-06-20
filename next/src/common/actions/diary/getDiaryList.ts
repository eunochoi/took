'use server';

import { prisma } from '../../../../lib/prisma';
import { getAuth } from '../../auth/getAuth';
import type { ActionResult } from '../types';
import type { DiaryData, ListParams } from './types';
import { createAuthErrorResult, createServerErrorResult, formatDiaryData } from './utils';

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
