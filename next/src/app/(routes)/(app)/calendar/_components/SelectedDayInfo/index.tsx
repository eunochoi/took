'use client';

import { getDiaryByDate } from '@/common/actions/diary';
import { checkHabit, getHabitsByDate, uncheckHabit } from '@/common/actions/habit';
import { authAction } from '@/common/auth/authAction';
import { EMOTIONS } from '@/common/constants/emotions';
import { getTodayString } from '@/common/functions/getTodayString';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import SelectedDayDiarySection from './SelectedDayDiarySection';
import SelectedDayHabitSection from './SelectedDayHabitSection';
import SelectedDayInfoHeader from './SelectedDayInfoHeader';
import { selectedDayInfoStyles } from './selectedDayInfoStyles';

const SelectedDayInfo = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const [pendingHabitId, setPendingHabitId] = useState<number | null>(null);

  const date = searchParams.get('date') ?? getTodayString();
  const { data: diaryData, isPending: isDiaryPending } = useQuery({
    queryKey: ['diary', 'date', date],
    queryFn: () => authAction(() => getDiaryByDate({ date })),
  });
  const { data: habitData, isPending: isHabitPending } = useQuery({
    queryKey: ['habit', 'date', date],
    queryFn: () => authAction(() => getHabitsByDate({ date })),
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
