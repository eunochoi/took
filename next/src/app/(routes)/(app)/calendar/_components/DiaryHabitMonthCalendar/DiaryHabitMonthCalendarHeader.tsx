'use client';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface Props {
  monthLabel: string;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

const ArrowButtonClass = "w-10 flex justify-center items-center rounded-xl";

const DiaryHabitMonthCalendarHeader = ({
  monthLabel,
  onPreviousMonth,
  onNextMonth,
  onToday,
}: Props) => (
  <header className=" flex justify-between gap-3">
    <div className="min-w-0 py-2">
      <h2 className="text-xl font-semibold text-theme-text-primary">{monthLabel}</h2>
    </div>
    <div className="flex shrink-0 text-theme-text-tertiary gap-2">
      <button className={ArrowButtonClass} onClick={onPreviousMonth} aria-label="이전 달" type="button">
        <FiChevronLeft className='text-2xl' strokeWidth={1.5} aria-hidden="true" />
      </button>
      <button className={ArrowButtonClass} onClick={onToday} aria-label="오늘로 이동" type="button">
        <span className="text-base font-medium">오늘</span>
      </button>
      <button className={ArrowButtonClass} onClick={onNextMonth} aria-label="다음 달" type="button">
        <FiChevronRight className='text-2xl' strokeWidth={1.5} aria-hidden="true" />
      </button>
    </div>
  </header>
);

export default DiaryHabitMonthCalendarHeader;
