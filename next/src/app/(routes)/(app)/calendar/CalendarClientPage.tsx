'use client';

import CalendarViewContent from "./_components/CalendarViewContent";
import CalendarViewTopSection from "./_components/CalendarViewTopSection";

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { getDiaryByDate } from '@/common/actions/diary';
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
  const [selectedDate, setSelectedDate] = useState(initialDate);

  const selectedDiaryQuery = useQuery({
    queryKey: ['diary', 'date', selectedDate],
    queryFn: () => authAction(() => getDiaryByDate({ date: selectedDate })),
    staleTime: 60_000,
    placeholderData: keepPreviousData,
  });
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
      topSection={<CalendarViewTopSection />}
      mainSection={
        <CalendarViewContent
          today={today}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedDiaryQuery={selectedDiaryQuery}
        />
      }
    />
  );
};

export default CalendarClientPage;
