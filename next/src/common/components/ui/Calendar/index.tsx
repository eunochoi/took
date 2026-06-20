'use client';

import styled from "styled-components";

//function
import { addMonths, subMonths } from "date-fns";
import { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import CalendarBody from "./CalendarBody";
import CalendarHeader from "./CalendarHeader";
import { useSwipe } from "./hooks/useSwipe";
import { DateContentRenderer, DateDataMap } from "./types";
import makeMonthCalendarWeeks from "./utils/makeMonthCalendarWeeks";

interface CalendarProps<T> {
  className?: string;
  headerSize?: 'small' | 'middle' | 'large';
  headerTitlePosition?: 'center' | 'start';

  visibleMonth: Date;
  setVisibleMonth: Dispatch<SetStateAction<Date>>;
  selectedDate?: Date;
  dateDataMap?: DateDataMap<T>;
  onClickMonthTitle?: () => void;
  onClickDate?: (date: Date) => void;
  renderDateContent?: DateContentRenderer<T>;

  isTouchGestureEnabled?: boolean;
}

const Calendar = <T,>({
  className,
  headerSize = 'large',
  headerTitlePosition = 'start',
  dateDataMap,
  visibleMonth,
  setVisibleMonth,
  selectedDate,
  onClickMonthTitle,
  onClickDate,
  renderDateContent,
  isTouchGestureEnabled = false
}: CalendarProps<T>) => {
  const calendarDates = useMemo(() => makeMonthCalendarWeeks(visibleMonth), [visibleMonth]);

  const nextMonth = useCallback(() => {
    setVisibleMonth(currentMonth => addMonths(currentMonth, 1));
  }, [setVisibleMonth]);

  const prevMonth = useCallback(() => {
    setVisibleMonth(currentMonth => subMonths(currentMonth, 1));
  }, [setVisibleMonth]);

  const goToday = useCallback(() => {
    onClickMonthTitle?.();
    setVisibleMonth(new Date());
  }, [onClickMonthTitle, setVisibleMonth]);

  const { handleTouchStart, handleTouchEnd } = useSwipe({ isTouchGestureEnabled, prevMonth, nextMonth });

  return (
    <Wrapper className={className}>
      <CalendarHeader
        headerSize={headerSize}
        headerTitlePosition={headerTitlePosition}
        visibleMonth={visibleMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
        goToday={goToday}
      />
      <CalendarBody
        calendarDates={calendarDates}
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
    </Wrapper>
  );
}

export default Calendar;

const Wrapper = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    overflow: visible;
    `
