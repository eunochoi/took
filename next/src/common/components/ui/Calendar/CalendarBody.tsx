'use client';

import { CalendarCell } from "./CalendarCell";
import { CalendarDateContentRenderer, CalendarDateDataMap } from "./types";
import { cn } from "@/common/utils/cn";

const WEEK_TITLES = ['월', '화', '수', '목', '금', '토', '일'];

interface CalendarBodyProps<T> {
  calendarWeeks: Date[][];
  dateDataMap?: CalendarDateDataMap<T>;
  visibleMonth: Date;
  selectedDate?: Date;
  renderDateContent?: CalendarDateContentRenderer<T>;
  onClickDate?: (date: Date) => void;
  prevMonth: () => void;
  nextMonth: () => void;
  handleTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
  handleTouchEnd: (e: React.TouchEvent<HTMLDivElement>) => void;
}

const CalendarBody = <T,>({
  calendarWeeks,
  dateDataMap,
  visibleMonth,
  selectedDate,
  renderDateContent,
  onClickDate,
  prevMonth,
  nextMonth,
  handleTouchStart,
  handleTouchEnd,
}: CalendarBodyProps<T>) => {
  return (
    <div
      className="w-full overflow-visible rounded-theme bg-theme-surface p-2 shadow-theme-section backdrop-blur-xl tablet:p-3"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="grid grid-cols-7 py-1.5 text-base text-theme-text-primary">
        {WEEK_TITLES.map((title, index) => (
          <span
            className={cn(
              "text-center",
              index === 5 && "text-theme-calendar-saturday",
              index === 6 && "text-theme-calendar-sunday",
            )}
            key={title}
          >
            {title}
          </span>
        ))}
      </div>
      <div className="grid w-full grid-cols-7 overflow-visible">
        {calendarWeeks.map((weekRow) =>
          weekRow.map(date => (
            <CalendarCell
              key={date.toString()}
              date={date}
              dateDataMap={dateDataMap}
              visibleMonth={visibleMonth}
              selectedDate={selectedDate}
              renderDateContent={renderDateContent}
              onClickDate={onClickDate}
              prevMonth={prevMonth}
              nextMonth={nextMonth}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CalendarBody;
