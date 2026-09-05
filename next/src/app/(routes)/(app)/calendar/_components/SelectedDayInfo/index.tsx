'use client';

import type { DiaryData } from '@/common/actions/diary';
import { checkHabit, getHabitsByDate, uncheckHabit } from '@/common/actions/habit';
import { authAction } from '@/common/auth/authAction';
import { EMOTIONS } from '@/common/constants/emotions';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import SelectedDayDiarySection from './SelectedDayDiarySection';
import SelectedDayHabitSection from './SelectedDayHabitSection';
import SelectedDayInfoHeader from './SelectedDayInfoHeader';
import { selectedDayInfoStyles } from './selectedDayInfoStyles';

interface Props {
  date: string;
  diaryData?: DiaryData | null;
  isDiaryPending: boolean;
  isDiaryError: boolean;
  onRetryDiary: () => void;
}

const SelectedDayInfo = ({ date, diaryData, isDiaryPending, isDiaryError, onRetryDiary }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [pendingHabitId, setPendingHabitId] = useState<number | null>(null);

  const { data: habitData, isPending: isHabitPending, isError: isHabitError, refetch: refetchHabits } = useQuery({
    queryKey: ['habit', 'date', date],
    queryFn: () => authAction(() => getHabitsByDate({ date })),
    staleTime: 60_000,
  });
  const isPending = isDiaryPending || isHabitPending;
  const emotion = diaryData?.visible ? EMOTIONS[diaryData.emotion] : undefined;

  const onToggleHabit = async (habitId: number, completed: boolean) => {
    if (!habitData?.canEdit || pendingHabitId !== null) return;

    setPendingHabitId(habitId);
    try {
      if (completed) {
        await authAction(() => uncheckHabit({ habitId, date }));
      } else {
        await authAction(() => checkHabit({ habitId, date }));
      }

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['habit'] }),
        queryClient.invalidateQueries({ queryKey: ['diary'] }),
        queryClient.invalidateQueries({ queryKey: ['diary-habit', 'month'] }),
        queryClient.invalidateQueries({ queryKey: ['stats'] }),
      ]);
    } catch (error) {
      enqueueSnackbar(error instanceof Error ? error.message : '습관 체크 변경 실패');
    } finally {
      setPendingHabitId(null);
    }
  };

  const onOpenDiary = () => {
    if (diaryData?.id) {
      router.push(`/inter/zoom?id=${diaryData.id}`, { scroll: false });
    }
  };

  const onAddDiary = () => {
    router.push(`/inter/input/addDiary?date=${date}`, { scroll: false });
  };

  return (
    <section className={selectedDayInfoStyles.card}>
      <SelectedDayInfoHeader date={date} emotion={emotion} />

      {isPending ? (
        <div className={selectedDayInfoStyles.loading}>선택한 날짜의 기록을 불러오는 중이에요.</div>
      ) : isDiaryError || isHabitError ? (
        <p role="alert" className="text-sm text-theme-danger">
          선택한 날짜의 기록을 불러오지 못했어요.{' '}
          <button type="button" className="underline" onClick={() => {
            if (isDiaryError) onRetryDiary();
            if (isHabitError) void refetchHabits();
          }}>다시 시도</button>
        </p>
      ) : (
        <>
          <SelectedDayHabitSection
            habitData={habitData}
            pendingHabitId={pendingHabitId}
            onToggleHabit={onToggleHabit}
          />
          <SelectedDayDiarySection
            diaryData={diaryData}
            isFuture={habitData?.isFuture === true}
            onAddDiary={onAddDiary}
            onOpenDiary={onOpenDiary}
          />
        </>
      )}
    </section>
  );
};

export default SelectedDayInfo;
