'use server';

import { prisma } from '../../../../lib/prisma';
import { getAuth } from '../../auth/getAuth';
import type { ActionResult } from '../types';
import type { CreateDiaryParams, DiaryData } from './types';
import { createAuthErrorResult, createServerErrorResult, encryptDiaryText, formatDiaryData, recomputeStreak, validateDateFormat } from './utils';

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
