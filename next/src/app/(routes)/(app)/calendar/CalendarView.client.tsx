'use client';

import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getDiaryByDate } from '@/common/actions/diary';
import { authAction } from '@/common/auth/authAction';
import AppPageLayout from '@/common/components/layout/AppPageLayout';
import TopButton from '@/common/components/ui/TopButton';
import { usePrefetchPage } from '@/common/hooks/usePrefetchPage';
import { parseLocalDate } from '@/common/utils/date/parseLocalDate';
import DiaryHabitMonthCalendar from './_components/DiaryHabitMonthCalendar';
import SelectedDayInfo from './_components/SelectedDayInfo';

interface Props {
  initialDate: string;
}

const CalendarView = ({ initialDate }: Props) => {
  usePrefetchPage();
  const router = useRouter();
  const [today, setToday] = useState(() => initialDate);
  // 상단 버튼, 달력, 상세 정보가 함께 쓰는 선택 날짜. URL에는 저장하지 않는다.
  const [selectedDate, setSelectedDate] = useState(initialDate);

  useEffect(() => {
    // 자정 경과나 백그라운드 복귀 시 오늘만 갱신하고 선택 날짜는 유지한다.
    const updateToday = () => setToday(format(new Date(), 'yyyy-MM-dd'));
    updateToday();
    const intervalId = window.setInterval(updateToday, 60_000);
    window.addEventListener('focus', updateToday);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener('focus', updateToday);
    };
  }, []);

  const diaryQuery = useQuery({
    queryKey: ['diary', 'date', selectedDate],
    queryFn: () => authAction(() => getDiaryByDate({ date: selectedDate })),
    staleTime: 60_000,
  });
  const dateLabel = format(parseLocalDate(selectedDate), 'yyyy.M.d');
  const isFuture = selectedDate > today;

  const openSelectedDiary = () => {
    if (diaryQuery.isPending || isFuture) return;
    if (diaryQuery.isError) {
      void diaryQuery.refetch();
      return;
    }

    const diary = diaryQuery.data;
    const href = diary?.visible
      ? `/inter/input/editDiary?id=${diary.id}`
      : `/inter/input/addDiary?date=${selectedDate}`;
    router.push(href, { scroll: false });
  };

  return (
    <AppPageLayout
      topButton={
        <TopButton
          size="auto"
          onClick={openSelectedDiary}
          disabled={diaryQuery.isPending || isFuture}
          title={isFuture ? '미래 날짜에는 일기를 작성할 수 없어요.' : undefined}
        >
          <span>{dateLabel}</span>
        </TopButton>
      }
      contentProps={{
        className: 'flex-1 gap-3 max-tablet:gap-5 max-tablet:pt-6 tablet:gap-6 tablet:pt-6',
      }}
    >
      <div className="flex w-full min-w-0 flex-col gap-5 tablet:gap-6">
        <DiaryHabitMonthCalendar today={today} selectedDate={selectedDate} onSelectDate={setSelectedDate} />
        <div key={selectedDate} className="min-w-0">
          <SelectedDayInfo
            date={selectedDate}
            diaryData={diaryQuery.data}
            isDiaryPending={diaryQuery.isPending}
            isDiaryError={diaryQuery.isError}
            onRetryDiary={() => void diaryQuery.refetch()}
          />
        </div>
      </div>
    </AppPageLayout>
  );
};

export default CalendarView;
