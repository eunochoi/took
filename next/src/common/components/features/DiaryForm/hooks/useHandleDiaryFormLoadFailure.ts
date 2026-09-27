import type { DiaryData } from '@/common/types/diary';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useRef } from 'react';

type UseHandleDiaryFormLoadFailureParams = {
  isEdit: boolean;
  diaryId?: string | null;
  diaryData: DiaryData | null | undefined;
  isError: boolean;
  isPending: boolean;
};

export const useHandleDiaryFormLoadFailure = ({
  isEdit,
  diaryId,
  diaryData,
  isError,
  isPending,
}: UseHandleDiaryFormLoadFailureParams) => {
  const router = useRouter();
  const hasHandledLoadFailure = useRef(false);
  const isDiaryLoadFailure = isEdit && (
    !diaryId
    || (isError && !diaryData)
    || (!isPending && !diaryData)
  );

  useEffect(() => {
    if (!isDiaryLoadFailure || hasHandledLoadFailure.current) return;

    hasHandledLoadFailure.current = true;
    router.back();

    const errorMessage = !diaryId
      ? '수정할 일기를 찾을 수 없습니다.'
      : isError
        ? '일기를 불러오지 못했습니다.'
        : '수정할 일기를 찾을 수 없습니다.';

    window.setTimeout(() => enqueueSnackbar(errorMessage), 300);
  }, [diaryId, isDiaryLoadFailure, isError, router]);

  return isDiaryLoadFailure;
};
