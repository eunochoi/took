'use client';

import { cn } from "@/common/utils/cn";
import { addMonths, subMonths } from "date-fns";
import { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import CalendarBody from "./CalendarBody";
import CalendarHeader from "./CalendarHeader";
import { useSwipe } from "./hooks/useSwipe";
import { CalendarDateContentRenderer, CalendarDateDataMap } from "./types";
import makeMonthCalendarWeeks from "./utils/makeMonthCalendarWeeks";

const CALENDAR_HEADER_VARIANTS = {
  default: {
    headerSize: 'large',
    headerTitlePosition: 'start',
  },
  compact: {
    headerSize: 'small',
    headerTitlePosition: 'center',
  },
} as const;

interface CalendarProps<T> {
  className?: string;
  variant?: keyof typeof CALENDAR_HEADER_VARIANTS;

  visibleMonth: Date;
  setVisibleMonth: Dispatch<SetStateAction<Date>>;
  selectedDate?: Date;
  dateDataMap?: CalendarDateDataMap<T>;
  onClickDate?: (date: Date) => void;
  onGoToday?: () => void;
  renderDateContent?: CalendarDateContentRenderer<T>;

  isTouchGestureEnabled?: boolean;
}

const Calendar = <T,>({
  className,
  variant = 'default',
  dateDataMap,
  visibleMonth,
  setVisibleMonth,
  selectedDate,
  onClickDate,
  onGoToday,
  renderDateContent,
  isTouchGestureEnabled = false,
}: CalendarProps<T>) => {
  const calendarWeeks = useMemo(() => makeMonthCalendarWeeks(visibleMonth), [visibleMonth]);
  const { headerSize, headerTitlePosition } = CALENDAR_HEADER_VARIANTS[variant];

  const nextMonth = useCallback(() => {
    setVisibleMonth(currentMonth => addMonths(currentMonth, 1));
  }, [setVisibleMonth]);
  const prevMonth = useCallback(() => {
    setVisibleMonth(currentMonth => subMonths(currentMonth, 1));
  }, [setVisibleMonth]);

  const goToday = useCallback(() => {
    onGoToday?.();
    setVisibleMonth(new Date());
  }, [onGoToday, setVisibleMonth]);

  const { handleTouchStart, handleTouchEnd } = useSwipe({ isTouchGestureEnabled, prevMonth, nextMonth });

  return (
    <div className={cn("flex h-full w-full flex-col overflow-visible", className)}>
      <CalendarHeader
        headerSize={headerSize}
        headerTitlePosition={headerTitlePosition}
        visibleMonth={visibleMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
        goToday={goToday}
      />
      <CalendarBody
        calendarWeeks={calendarWeeks}
        dateDataMap={dateDataMap}
        visibleMonth={visibleMonth}
        selectedDate={selectedDate}
        renderDateContent={renderDateContent}
        onClickDate={onClickDate}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
        handleTouchStart={handleTouchStart}
        handleTouchEnd={handleTouchEnd}
      />
    </div>
  );
};

export default Calendar;
