'use client';

import type { DiaryData } from '@/common/types/diary';
import DiaryHabitMonthCalendar from './DiaryHabitMonthCalendar';
import SelectedDayInfo from './SelectedDayInfo';

import type { UseQueryResult } from "@tanstack/react-query";

interface Props {
  today: string;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedDiaryQuery: Pick<UseQueryResult<DiaryData | null>, "data" | "isPending" | "isPlaceholderData" | "isError" | "refetch">;
}

const CalendarViewContent = ({ today, selectedDate, setSelectedDate, selectedDiaryQuery }: Props) => {
  return (
    <div className="grid flex-1 w-full min-w-0 grid-cols-1 items-start gap-5 tablet:gap-6 desktop:grid-cols-[minmax(0,11fr)_minmax(0,9fr)] desktop:gap-x-8">
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
  );
};

export default CalendarViewContent;
