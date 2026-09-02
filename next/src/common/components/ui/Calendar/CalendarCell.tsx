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
  const isSaturday = date.getDay() === 6;
  const isSunday = date.getDay() === 0;

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
        "relative flex aspect-[5/6] min-w-0 flex-col items-center justify-center overflow-visible text-sm transition-colors duration-200 ease-in-out",
        isToday
          ? "text-theme-accent"
          : isSaturday
          ? "text-theme-calendar-saturday"
          : isSunday
            ? "text-theme-calendar-sunday"
            : "text-theme-text-secondary",
        !isCurrentMonth && "opacity-30",
        isCurrentMonth && isSelectedDate && "bg-theme-accent/10",
        isToday && "border-2 border-theme-accent bg-theme-accent/5",
        isCurrentMonth && isSelectedDate && "animate-[calendar-selected-pop_0.35s_ease-out]",
      )}
      onClick={handleClick}
    >
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
