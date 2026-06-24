import { cn } from "@/common/utils/cn";
import { endOfMonth, format, isAfter, isBefore, isSameDay, isSameMonth, startOfMonth } from "date-fns";
import { memo } from "react";
import { CalendarDateContentRenderer, CalendarDateDataMap } from "./types";

interface CalendarCellProps<T> {
  date: Date;
  dateDataMap?: CalendarDateDataMap<T>;
  visibleMonth: Date;
  selectedDate?: Date;
  renderDateContent?: CalendarDateContentRenderer<T>;
  onClickDate?: (date: Date) => void;
  prevMonth: () => void;
  nextMonth: () => void;
}

const CalendarCellComponent = <T,>({
  date,
  dateDataMap,
  visibleMonth,
  selectedDate,
  renderDateContent,
  onClickDate,
  prevMonth,
  nextMonth,
}: CalendarCellProps<T>) => {
  const today = new Date();
  const dateKey = format(date, 'yyMMdd');
  const dateData = dateDataMap?.[dateKey];

  const isToday = isSameDay(date, today);
  const isCurrentMonth = isSameMonth(date, visibleMonth);
  const isSelectedDate = selectedDate ? isSameDay(date, selectedDate) : false;
  const isPrevMonth = isBefore(date, startOfMonth(visibleMonth));
  const isNextMonth = isAfter(date, endOfMonth(visibleMonth));

  const handleClick = () => {
    if (onClickDate) {
      onClickDate(date);
    }
    if (isPrevMonth) {
      prevMonth();
    }
    else if (isNextMonth) {
      nextMonth();
    }
  };

  return (
    <div
      className={cn(
        "relative flex h-[98%] w-[14%] flex-col items-center justify-center overflow-visible rounded-lg border-[3px] border-transparent text-sm text-[#666565] transition-opacity duration-200 ease-in-out",
        !isCurrentMonth && "opacity-30",
        isCurrentMonth && isSelectedDate && "animate-[calendar-selected-pop_0.35s_ease-out]",
      )}
      onClick={handleClick}
    >
      <div
        className={cn(
          "absolute top-0 z-[99] hidden h-2.5 w-2.5 rounded-full bg-theme",
          isCurrentMonth && isToday && "block",
        )}
      />
      {renderDateContent ?
        renderDateContent({
          date,
          dateData,
          isToday,
          isSelected: isSelectedDate,
          isCurrentMonth,
        })
        : format(date, 'd')
      }
    </div>
  );
};

const MemoizedCalendarCell = memo(CalendarCellComponent);
MemoizedCalendarCell.displayName = 'CalendarCell';

export const CalendarCell = MemoizedCalendarCell as typeof CalendarCellComponent;
