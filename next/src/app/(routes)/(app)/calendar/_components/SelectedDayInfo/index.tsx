'use client';

import type { DiaryData } from '@/common/actions/diary';
import {
  checkHabit,
  getHabitsByDate,
  uncheckHabit,
} from '@/common/actions/habit';
import { authAction } from '@/common/auth/authAction';
import { EMOTIONS } from '@/common/constants/emotions';
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import SelectedDayDiarySection from './SelectedDayDiarySection';
import SelectedDayHabitSection from './SelectedDayHabitSection';
import SelectedDayInfoHeader from './SelectedDayInfoHeader';

interface Props {
  date: string;
  diaryData?: DiaryData | null;
  isDiaryPending: boolean;
  isDiaryPlaceholder: boolean;
  isDiaryError: boolean;
  onRetryDiary: () => void;
}

const SelectedDayInfo = ({
  date,
  diaryData,
  isDiaryPending,
  isDiaryPlaceholder,
  isDiaryError,
  onRetryDiary,
}: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [pendingHabitId, setPendingHabitId] = useState<number | null>(null);

  const {
    data: habitData,
    isPending: isHabitPending,
    isPlaceholderData: isHabitPlaceholder,
    isError: isHabitError,
    refetch: refetchHabits,
  } = useQuery({
    queryKey: ['habit', 'date', date],
    queryFn: () => authAction(() => getHabitsByDate({ date })),
    staleTime: 60_000,
    placeholderData: keepPreviousData,
  });

  const isPending = isDiaryPending || isHabitPending;

  const isTransitioning =
    isPending ||
    isDiaryPlaceholder ||
    isHabitPlaceholder;

  const emotion = diaryData?.visible
    ? EMOTIONS[diaryData.emotion]
    : undefined;

  const onToggleHabit = async (
    habitId: number,
    completed: boolean,
  ) => {
    if (
      isTransitioning ||
      !habitData?.canEdit ||
      pendingHabitId !== null
    ) {
      return;
    }

    setPendingHabitId(habitId);

    try {
      if (completed) {
        await authAction(() =>
          uncheckHabit({
            habitId,
            date,
          }),
        );
      } else {
        await authAction(() =>
          checkHabit({
            habitId,
            date,
          }),
        );
      }

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['habit'],
        }),
        queryClient.invalidateQueries({
          queryKey: ['diary'],
        }),
        queryClient.invalidateQueries({
          queryKey: ['diary-habit', 'month'],
        }),
        queryClient.invalidateQueries({
          queryKey: ['stats'],
        }),
      ]);
    } catch (error) {
      enqueueSnackbar(
        error instanceof Error
          ? error.message
          : '습관 체크 변경 실패',
      );
    } finally {
      setPendingHabitId(null);
    }
  };

  const onOpenDiary = () => {
    if (diaryData?.id) {
      router.push(`/inter/zoom?id=${diaryData.id}`, {
        scroll: false,
      });
    }
  };

  const onAddDiary = () => {
    router.push(`/inter/input/addDiary?date=${date}`, {
      scroll: false,
    });
  };

  return (
    <section className="box-border flex w-full flex-col gap-3">
      <SelectedDayInfoHeader
        date={date}
        emotion={emotion}
      />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={date}
          initial={{
            opacity: 0,
            y: 4,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -4,
          }}
          transition={{
            duration: 0.18,
            ease: 'easeOut',
          }}
        >
          <fieldset
            disabled={isTransitioning}
            aria-busy={isTransitioning}
            className="m-0 flex min-w-0 flex-col gap-4"
          >
            <SelectedDayDiarySection
              diaryData={diaryData}
              isFuture={habitData?.isFuture === true}
              onAddDiary={onAddDiary}
              onOpenDiary={onOpenDiary}
            />

            <SelectedDayHabitSection
              habitData={habitData}
              pendingHabitId={pendingHabitId}
              onToggleHabit={onToggleHabit}
            />
          </fieldset>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default SelectedDayInfo;