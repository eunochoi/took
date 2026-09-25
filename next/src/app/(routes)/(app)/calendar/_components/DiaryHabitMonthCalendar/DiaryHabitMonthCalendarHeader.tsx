'use client';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface Props {
  monthLabel: string;
  diaryCount?: number;
  completedHabitCount?: number;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

const DiaryHabitMonthCalendarHeader = ({
  monthLabel,
  diaryCount,
  completedHabitCount,
  onPreviousMonth,
  onNextMonth,
  onToday,
}: Props) => (
  <header className="font-title flex items-center justify-between gap-3">
    <div className="min-w-0">
      <h2 className="text-lg font-semibold text-theme-text-primary">{monthLabel}</h2>
    </div>
    <div className="flex shrink-0 items-center gap-0.5 text-theme-text-tertiary">
      <button className="flex h-10 w-10 items-center justify-center rounded-xl" onClick={onPreviousMonth} aria-label="이전 달" type="button">
        <FiChevronLeft className='text-2xl' strokeWidth={1.5} aria-hidden="true" />
      </button>
      <button className="flex h-10 w-10 items-center justify-center rounded-xl" onClick={onToday} aria-label="오늘로 이동" type="button">
        <span className="text-base font-medium">오늘</span>
      </button>
      <button className="flex h-10 w-10 items-center justify-center rounded-xl" onClick={onNextMonth} aria-label="다음 달" type="button">
        <FiChevronRight className='text-2xl' strokeWidth={1.5} aria-hidden="true" />
      </button>
    </div>
  </header>
);

export default DiaryHabitMonthCalendarHeader;
