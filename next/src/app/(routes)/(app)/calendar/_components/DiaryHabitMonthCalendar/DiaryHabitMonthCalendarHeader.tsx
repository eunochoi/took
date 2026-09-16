'use client';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { IoToday } from 'react-icons/io5';

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
  <header className="flex items-center justify-between gap-3 border-b border-theme-border-muted pb-3">
    <div className="min-w-0">
      <h2 className="text-xl font-semibold text-theme-accent">{monthLabel}</h2>
      <p className="mt-1 text-sm text-theme-text-tertiary" role="status">
        {`일기 ${diaryCount ?? '-'}개 · 습관 완료 ${completedHabitCount ?? '-'}회`}
      </p>
    </div>
    <div className="flex shrink-0 items-center gap-0.5 text-theme-text-secondary">
      <button className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-theme-accent/10" onClick={onPreviousMonth} aria-label="이전 달" type="button">
        <FaArrowLeft size={16} />
      </button>
      <button className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-theme-accent/10" onClick={onToday} aria-label="오늘로 이동" type="button">
        <IoToday size={18} />
      </button>
      <button className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-theme-accent/10" onClick={onNextMonth} aria-label="다음 달" type="button">
        <FaArrowRight size={16} />
      </button>
    </div>
  </header>
);

export default DiaryHabitMonthCalendarHeader;
