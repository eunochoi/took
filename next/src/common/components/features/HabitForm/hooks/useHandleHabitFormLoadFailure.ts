import type { HabitData } from '@/common/actions/habit';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useRef } from 'react';

type UseHandleHabitFormLoadFailureParams = {
  isEdit: boolean;
  habitId?: string | null;
  habitData: HabitData | undefined;
  isError: boolean;
  isPending: boolean;
};

export const useHandleHabitFormLoadFailure = ({
  isEdit,
  habitId,
  habitData,
  isError,
  isPending,
}: UseHandleHabitFormLoadFailureParams) => {
  const router = useRouter();
  const hasHandledLoadFailure = useRef(false);
  const isHabitLoadFailure = isEdit && (
    !habitId
    || (isError && !habitData)
    || (!isPending && !habitData)
  );

  useEffect(() => {
    if (!isHabitLoadFailure || hasHandledLoadFailure.current) return;

    hasHandledLoadFailure.current = true;
    router.back();

    const errorMessage = !habitId
      ? '수정할 습관을 찾을 수 없습니다.'
      : isError
        ? '습관을 불러오지 못했습니다.'
        : '수정할 습관을 찾을 수 없습니다.';

    window.setTimeout(() => enqueueSnackbar(errorMessage), 300);
  }, [habitId, isError, isHabitLoadFailure, router]);

  return isHabitLoadFailure;
};
