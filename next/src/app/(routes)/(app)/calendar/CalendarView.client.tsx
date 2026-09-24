'use client';

import CalendarViewContent from "./_components/CalendarViewContent";
import CalendarViewToolbar from "./_components/CalendarViewToolbar";

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { getDiaryByDate } from '@/common/actions/diary';
import { authAction } from '@/common/auth/authAction';
import AppPageLayout, { APP_PAGE_CONTENT_PADDING_CLASS_NAME } from '@/common/components/layout/AppPageLayout';
import AppPageTitle from '@/common/components/layout/AppPageTitle';
import { usePrefetchPage } from '@/common/hooks/usePrefetchPage';
import { parseLocalDate } from '@/common/utils/date/parseLocalDate';

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
  const openSelectedDiary = () => {
    if (selectedDiaryQuery.isPending || selectedDiaryQuery.isPlaceholderData) return;
    if (selectedDiaryQuery.isError) {
      void selectedDiaryQuery.refetch();
      return;
    }

    const diary = selectedDiaryQuery.data;
    const href = diary?.visible
      ? `/inter/input/editDiary?id=${diary.id}`
      : `/inter/input/addDiary?date=${selectedDate}`;
    router.push(href, { scroll: false });
  };

  const selectedDateLabel = selectedDate === today ? '오늘' : format(parseLocalDate(selectedDate), 'M월 d일');
  const diaryActionLabel = `${selectedDateLabel} ${selectedDiaryQuery.data?.visible ? '일기 수정' : '일기 작성'}`;

  return (
    <AppPageLayout
      contentWrapperClassName={APP_PAGE_CONTENT_PADDING_CLASS_NAME}
      appPageTopArea={<AppPageTitle title="월간 기록" description="하루하루 쌓인 마음과 습관을 살펴봐요" />}
      toolbar={
        <CalendarViewToolbar
          openSelectedDiary={openSelectedDiary}
          diaryActionLabel={diaryActionLabel}
        />
      }
      appPageMainArea={
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

export default CalendarView;
