'use client';

import { addMonths, eachDayOfInterval, endOfMonth, endOfWeek, format, startOfWeek } from 'date-fns';
import { useMemo, useState } from 'react';

import type { DateKey, MonthKey } from '@/common/types/calendar';
import { parseLocalDate } from '@/common/utils/date/parseLocalDate';

export interface CalendarDayModel {
  dateKey: DateKey;
  dayNumber: number;
  weekday: number;
  isOutsideMonth: boolean;
}

export const makeMonthCalendarDays = (month: MonthKey): CalendarDayModel[] => {
  const monthStart = parseLocalDate(`${month}-01`);

  return eachDayOfInterval({
    start: startOfWeek(monthStart, { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(monthStart), { weekStartsOn: 1 }),
  }).map((date) => {
    const dateKey = format(date, 'yyyy-MM-dd');

    return {
      dateKey,
      dayNumber: date.getDate(),
      weekday: date.getDay(),
      isOutsideMonth: dateKey.slice(0, 7) !== month,
    };
  });
};

export const useMonthCalendar = (initialDate: DateKey) => {
  const [visibleMonth, setVisibleMonth] = useState<MonthKey>(() => initialDate.slice(0, 7));
  const days = useMemo(() => makeMonthCalendarDays(visibleMonth), [visibleMonth]);

  const goPreviousMonth = () => {
    setVisibleMonth((month) => format(addMonths(parseLocalDate(`${month}-01`), -1), 'yyyy-MM'));
  };

  const goNextMonth = () => {
    setVisibleMonth((month) => format(addMonths(parseLocalDate(`${month}-01`), 1), 'yyyy-MM'));
  };

  const showDate = (date: DateKey) => {
    setVisibleMonth(date.slice(0, 7));
  };

  return {
    visibleMonth,
    monthLabel: format(parseLocalDate(`${visibleMonth}-01`), 'yyyy년 M월'),
    days,
    goPreviousMonth,
    goNextMonth,
    showDate,
  };
};
