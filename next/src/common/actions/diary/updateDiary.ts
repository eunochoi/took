'use server';

import { prisma } from '../../../../lib/prisma';
import { DIARY_TEXT_MAX_LENGTH } from '@/common/constants/diary';
import { getAuth } from '../../auth/getAuth';
import type { ActionResult } from '../types';
import type { DiaryData, UpdateDiaryParams } from './types';
import { createAuthErrorResult, createServerErrorResult, encryptDiaryText, formatDiaryData, isValidDiaryText, parseDiaryId, validateAccessibleImageContents } from './utils';

export const updateDiary = async ({
  diaryId,
  text,
  imageContentIds,
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
    if (!isValidDiaryText(text)) {
      return { ok: false, code: 'INVALID_DIARY_INPUT', message: `일기 내용은 공백만 입력할 수 없으며 ${DIARY_TEXT_MAX_LENGTH}자까지 입력할 수 있습니다.` };
    }

    const diary = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: auth.userId },
        select: { id: true },
      });

      if (!user) throw new Error('USER_NOT_FOUND');

      const foundDiary = await tx.diary.findFirst({
        where: { id: parsedDiaryId, userId: user.id },
      });

      if (!foundDiary) throw new Error('DIARY_NOT_FOUND');

      // 기존 이미지 연결을 삭제하기 전에 모든 새 이미지의 소유권을 확인한다.
      await validateAccessibleImageContents(tx, imageContentIds, auth.userId);

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

      if (imageContentIds.length > 0) {
        await tx.image.createMany({
          data: imageContentIds.map((imageContentId, index) => ({
            imageContentId,
            order: index,
            diaryId: foundDiary.id,
          })),
        });
      }

      return tx.diary.findUniqueOrThrow({
        where: { id: foundDiary.id },
        include: {
          images: {
            include: {
              imageContent: true,
            },
            orderBy: { order: 'asc' },
          },
          habits: {
            orderBy: { priority: 'desc' },
          },
        },
      });
    });

    return { ok: true, data: await formatDiaryData(diary) };
  } catch (error) {
    if (error instanceof Error && error.message === 'USER_NOT_FOUND') {
      return { ok: false, code: 'USER_NOT_FOUND', message: '유저가 존재하지 않습니다.' };
    }
    if (error instanceof Error && error.message === 'DIARY_NOT_FOUND') {
      return { ok: false, code: 'DIARY_NOT_FOUND', message: '게시글이 올바르지 않습니다.' };
    }
    if (error instanceof Error && error.message === 'INVALID_IMAGE_LIST') {
      return { ok: false, code: 'INVALID_IMAGE_LIST', message: '이미지 목록이 올바르지 않습니다.' };
    }
    if (error instanceof Error && error.message === 'IMAGE_NOT_OWNED') {
      return { ok: false, code: 'IMAGE_NOT_OWNED', message: '사용할 수 없는 이미지가 포함되어 있습니다.' };
    }

    console.error(error);
    return createServerErrorResult();
  }
};
