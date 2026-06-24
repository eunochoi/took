import { cn } from "@/common/utils/cn";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdToday } from 'react-icons/md';

interface CalendarHeaderProps {
  headerSize: 'small' | 'middle' | 'large';
  headerTitlePosition: 'center' | 'start';
  visibleMonth: Date;
  prevMonth: () => void;
  nextMonth: () => void;
  goToday: () => void;
}

const WEEK_TITLE_ENG = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const titlePaddingClass = {
  small: "py-1.5",
  middle: "py-3",
  large: "py-[18px]",
} as const;

const titleTextClass = {
  small: "text-xl",
  middle: "text-[26px]",
  large: "text-[32px]",
} as const;

const arrowButtonClass = {
  small: "p-[3px]",
  middle: "p-1",
  large: "p-1.5",
} as const;

const CalendarHeader = ({
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
          <button className="flex text-gray-500" onClick={prevMonth} type="button">
            <MdKeyboardArrowLeft />
          </button>
          <button
            className={cn("font-bmjua capitalize text-grey-title", titleTextClass[headerSize])}
            onClick={goToday}
            type="button"
          >
            {title}
          </button>
          <button className="flex text-gray-500" onClick={nextMonth} type="button">
            <MdKeyboardArrowRight />
          </button>
        </header>
      )}
      {headerTitlePosition === 'start' && (
        <header className={cn("flex items-center justify-between", titlePaddingClass[headerSize])}>
          <span className={cn("font-bmjua capitalize text-grey-title", titleTextClass[headerSize])}>
            {title}
          </span>
          <div className="flex items-center justify-center gap-3">
            <button className={cn("flex text-gray-500", arrowButtonClass[headerSize])} onClick={prevMonth} type="button">
              <MdKeyboardArrowLeft />
            </button>
            <button className={cn("flex text-gray-500", arrowButtonClass[headerSize])} onClick={goToday} aria-label="오늘로 이동" type="button">
              <MdToday />
            </button>
            <button className={cn("flex text-gray-500", arrowButtonClass[headerSize])} onClick={nextMonth} type="button">
              <MdKeyboardArrowRight />
            </button>
          </div>
        </header>
      )}
      <div className="flex w-full justify-around py-1.5 text-base capitalize text-grey-title">
        {WEEK_TITLE_ENG.map(e => (
          <span className="w-full text-center" key={e}>{e}</span>
        ))}
      </div>
    </>
  );
};

export default CalendarHeader;
