'use server';

import { prisma } from '../../../../lib/prisma';
import { getAuth } from '../../auth/getAuth';
import type { ActionResult } from '../types';
import { createAuthErrorResult, createServerErrorResult } from './utils';

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
