'use server';

import { prisma } from '../../../../lib/prisma';
import { getAuth } from '../../auth/getAuth';
import type { ActionResult } from '../types';
import type { DiaryData, IdParams } from './types';
import { createAuthErrorResult, createServerErrorResult, formatDiaryData, parseDiaryId } from './utils';

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
