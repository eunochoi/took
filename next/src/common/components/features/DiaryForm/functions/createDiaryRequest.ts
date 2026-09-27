import { createDiary } from '@/common/actions/diary';
import { authAction } from '@/common/auth/authAction';
import type { DiaryData } from '@/common/types/diary';

type CreateDiaryRequestParams = {
  date: string;
  text: string;
  emotion: number;
  imageContentIds: string[];
};

export const createDiaryRequest = async ({
  date,
  text,
  emotion,
  imageContentIds,
}: CreateDiaryRequestParams): Promise<DiaryData> =>
  authAction(() =>
    createDiary({
      date,
      text,
      emotion,
      imageContentIds,
    }),
  );
