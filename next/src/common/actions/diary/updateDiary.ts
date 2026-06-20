'use server';

import { prisma } from '../../../../lib/prisma';
import { getAuth } from '../../auth/getAuth';
import type { ActionResult } from '../types';
import type { DiaryData, UpdateDiaryParams } from './types';
import { createAuthErrorResult, createServerErrorResult, encryptDiaryText, formatDiaryData, parseDiaryId } from './utils';

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
