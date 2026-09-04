import { cn } from "@/common/utils/cn";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoToday } from "react-icons/io5";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

interface CalendarHeaderProps {
  description?: string;
  headerSize: 'small' | 'middle' | 'large';
  headerTitlePosition: 'center' | 'start';
  visibleMonth: Date;
  prevMonth: () => void;
  nextMonth: () => void;
  goToday: () => void;
}

const titlePaddingClass = {
  small: "py-1.5",
  middle: "py-2",
  large: "py-3",
} as const;

const titleTextClass = {
  small: "text-xl",
  middle: "text-2xl",
  large: "text-3xl",
} as const;

const arrowButtonClass = {
  small: "p-[3px]",
  middle: "p-1",
  large: "p-1.5",
} as const;

const CalendarHeader = ({
  description,
  headerSize,
  headerTitlePosition,
  visibleMonth,
  prevMonth,
  nextMonth,
  goToday,
}: CalendarHeaderProps) => {
  const title = format(visibleMonth, 'yyyy년 M월', { locale: ko });

  return (
    <>
      {headerTitlePosition === 'center' && (
        <header className={cn("flex items-center justify-between", titlePaddingClass[headerSize])}>
          <button className="flex text-theme-text-secondary" onClick={prevMonth} type="button">
            <MdKeyboardArrowLeft />
          </button>
          <button
            className={cn("font-title font-bold capitalize text-theme-accent", titleTextClass[headerSize])}
            onClick={goToday}
            type="button"
          >
            {title}
          </button>
          <button className="flex text-theme-text-secondary" onClick={nextMonth} type="button">
            <MdKeyboardArrowRight />
          </button>
        </header>
      )}
      {headerTitlePosition === 'start' && (
        <header className="flex items-center justify-between gap-4 pb-4">
          <div className="min-w-0">
            <span className={cn("font-title font-bold capitalize text-theme-accent", titleTextClass[headerSize])}>
              {title}
            </span>
            {description && (
              <p className="mt-1 text-sm text-theme-text-tertiary">{description}</p>
            )}
          </div>
          <div className="flex shrink-0 items-center justify-center gap-3">
            <button className={cn("flex text-theme-text-secondary", arrowButtonClass[headerSize])} onClick={prevMonth} aria-label="이전 달" type="button">
              <FaArrowLeft size={16} />
            </button>
            <button className={cn("flex text-theme-text-secondary", arrowButtonClass[headerSize])} onClick={goToday} aria-label="오늘로 이동" type="button">
              <IoToday size={18} />
            </button>
            <button className={cn("flex text-theme-text-secondary", arrowButtonClass[headerSize])} onClick={nextMonth} aria-label="다음 달" type="button">
              <FaArrowRight size={16} />
            </button>
          </div>
        </header>
      )}
    </>
  );
};

export default CalendarHeader;
