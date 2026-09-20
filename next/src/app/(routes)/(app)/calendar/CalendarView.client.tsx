'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MdEdit } from 'react-icons/md';

import { getDiaryByDate } from '@/common/actions/diary';
import { authAction } from '@/common/auth/authAction';
import AppPageLayout from '@/common/components/layout/AppPageLayout';
import TopButton from '@/common/components/ui/TopButton';
import { usePrefetchPage } from '@/common/hooks/usePrefetchPage';
import DiaryHabitMonthCalendar from './_components/DiaryHabitMonthCalendar';
import SelectedDayInfo from './_components/SelectedDayInfo';

interface Props {
  initialDate: string;
}

//initialDate : 서버에서 브라우저 시간대로 현재 날짜를 구해서 전달
const CalendarView = ({ initialDate }: Props) => {
  usePrefetchPage();
  const router = useRouter();
  const today = initialDate;
  const [selectedDate, setSelectedDate] = useState(initialDate);

  const selectedDiaryQuery = useQuery({
    queryKey: ['diary', 'date', selectedDate],
    queryFn: () => authAction(() => getDiaryByDate({ date: selectedDate })),
    staleTime: 60_000,
    placeholderData: keepPreviousData,
  });
  const todayDiaryQuery = useQuery({
    queryKey: ['diary', 'date', today],
    queryFn: () => authAction(() => getDiaryByDate({ date: today })),
    staleTime: 60_000,
  });

  const openTodayDiary = () => {
    if (todayDiaryQuery.isPending) return;
    if (todayDiaryQuery.isError) {
      void todayDiaryQuery.refetch();
      return;
    }

    const diary = todayDiaryQuery.data;
    const href = diary?.visible
      ? `/inter/input/editDiary?id=${diary.id}`
      : `/inter/input/addDiary?date=${today}`;
    router.push(href, { scroll: false });
  };

  return (
    <AppPageLayout
      title="월간 기록"
      description="하루하루 쌓인 마음과 습관을 살펴봐요"
      topButton={
        <>
          <TopButton
            onClick={openTodayDiary}
            disabled={todayDiaryQuery.isPending}
          >
            <MdEdit size={18} className="shrink-0" aria-hidden="true" />
            <span>{todayDiaryQuery.data?.visible ? '오늘 일기 수정' : '오늘 일기 작성'}</span>
          </TopButton>
        </>
      }
      contentProps={{
        className: 'flex-1 gap-3 max-tablet:gap-5 tablet:gap-6',
      }}
    >
      <div className="grid w-full min-w-0 grid-cols-1 items-start gap-5 tablet:gap-6 desktop:grid-cols-[minmax(0,11fr)_minmax(0,9fr)] desktop:gap-x-8">
        <DiaryHabitMonthCalendar today={today} selectedDate={selectedDate} onSelectDate={setSelectedDate} />
        <div className="min-w-0 desktop:col-start-2 desktop:row-start-1 desktop:sticky desktop:top-[calc(var(--page-toolbar-height,68px)+24px)] desktop:self-start">
          <SelectedDayInfo
            date={selectedDate}
            diaryData={selectedDiaryQuery.data}
            isDiaryPending={selectedDiaryQuery.isPending}
            isDiaryPlaceholder={selectedDiaryQuery.isPlaceholderData}
            isDiaryError={selectedDiaryQuery.isError}
            onRetryDiary={() => void selectedDiaryQuery.refetch()}
          />
        </div>
      </div>
    </AppPageLayout>
  );
};

export default CalendarView;
