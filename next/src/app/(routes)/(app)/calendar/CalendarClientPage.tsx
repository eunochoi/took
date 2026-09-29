'use client';

import CalendarPageContent from "./_components/CalendarPageContent";
import CalendarPageSkeleton from "./_components/CalendarPageSkeleton";
import CalendarPageTopSection from "./_components/CalendarPageTopSection";

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { getDiaryByDate } from '@/common/actions/diary';
import { getDiaryHabitMonthData } from '@/common/actions/diary/getDiaryHabitMonthData';
import { getHabitsByDate } from '@/common/actions/habit';
import { authAction } from '@/common/auth/authAction';
import AppPageLayout from '@/common/components/layout/AppPageLayout';
import { usePrefetchPage } from '@/common/hooks/usePrefetchPage';
import { parseLocalDate } from '@/common/utils/date/parseLocalDate';

interface Props {
  initialDate: string;
}

//initialDate : 서버에서 브라우저 시간대로 현재 날짜를 구해서 전달
const CalendarClientPage = ({ initialDate }: Props) => {
  usePrefetchPage();
  const router = useRouter();
  const today = initialDate;
  const month = today.slice(0, 7);
  const [selectedDate, setSelectedDate] = useState(initialDate);

  const selectedDiaryQuery = useQuery({
    queryKey: ['diary', 'date', selectedDate],
    queryFn: () => authAction(() => getDiaryByDate({ date: selectedDate })),
    staleTime: 60_000,
    placeholderData: keepPreviousData,
  });
  const monthQuery = useQuery({
    queryKey: ['diary-habit', 'month', month],
    queryFn: () => authAction(() => getDiaryHabitMonthData({ month })),
    staleTime: 60_000,
  });
  const todayHabitsQuery = useQuery({
    queryKey: ['habit', 'date', today],
    queryFn: () => authAction(() => getHabitsByDate({ date: today })),
    staleTime: 60_000,
  });
  const isInitialError = [selectedDiaryQuery, monthQuery, todayHabitsQuery]
    .some((query) => query.isError && query.data === undefined);
  const isInitialPending = [selectedDiaryQuery, monthQuery, todayHabitsQuery]
    .some((query) => query.data === undefined);
  const openSelectedDiary = () => {
    if (selectedDiaryQuery.isPending || selectedDiaryQuery.isPlaceholderData) return;
    if (selectedDiaryQuery.isError) {
      void selectedDiaryQuery.refetch();
      return;
    }

    const diary = selectedDiaryQuery.data;
    const href = diary?.visible
      ? `/diary/${diary.id}/edit`
      : `/diary/new?date=${selectedDate}`;
    router.push(href, { scroll: false });
  };

  const selectedDateLabel = selectedDate === today ? '오늘' : format(parseLocalDate(selectedDate), 'M월 d일');
  const diaryActionLabel = `${selectedDateLabel} ${selectedDiaryQuery.data?.visible ? '일기 수정' : '일기 작성'}`;

  return (
    <AppPageLayout
      topSection={<CalendarPageTopSection />}
      bottomSafeClassName="desktop:hidden"
      mainSection={isInitialError ? (
        <div className="flex min-h-64 w-full flex-col items-center justify-center gap-3 text-center text-theme-text-secondary">
          <span>달력 기록을 불러오지 못했어요.</span>
          <button type="button" className="text-theme-accent" onClick={() => {
            if (selectedDiaryQuery.isError) void selectedDiaryQuery.refetch();
            if (monthQuery.isError) void monthQuery.refetch();
            if (todayHabitsQuery.isError) void todayHabitsQuery.refetch();
          }}>다시 시도</button>
        </div>
      ) : isInitialPending ? (
        <CalendarPageSkeleton />
      ) : (
        <CalendarPageContent
          today={today}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedDiaryQuery={selectedDiaryQuery}
        />
      )}
    />
  );
};

export default CalendarClientPage;
