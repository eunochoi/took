import { addMonths, subMonths } from "date-fns";
import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useContext, useMemo } from "react";
import { useSwipe } from "./hooks/useSwipe";
import makeCalendarDates from "./utils/makeCalendarDates";


interface CalendarContextValue<T> {
  monthlyData: T;
  displayDate: Date;
  calendarDates: Date[][]; //displayDate가 변경되면서 생성된 보여질 날짜 목록
  nextMonth: () => void;
  prevMonth: () => void;
  goToday: () => void;

  onClickMonthTitle?: () => void;
  onClickDate?: (date: Date) => void;
  RenderDateContent?: ({ cellDate }: {
    cellDate: Date;
  }) => JSX.Element

  isTouchGestureEnabled: boolean;
  isDateSelectionEnabled: boolean;
  handleTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
  handleTouchEnd: (e: React.TouchEvent<HTMLDivElement>) => void;
}
const CalendarContext = createContext<CalendarContextValue<any> | null>(null);



//Provider 컴포넌트에서 받아올 props interface
interface CalendarProviderProps<T> {
  children: ReactNode;
  onClickMonthTitle?: () => void;
  onClickDate?: (date: Date) => void

  monthlyData: T;
  displayDate: Date;
  setDisplayDate: Dispatch<SetStateAction<Date>>;
  RenderDateContent?: ({ cellDate }: {
    cellDate: Date;
  }) => JSX.Element
  isTouchGestureEnabled?: boolean;
  isDateSelectionEnabled?: boolean;
}
export const CalendarProvider = <T,>({
  children,
  onClickMonthTitle,
  onClickDate,

  monthlyData,
  displayDate,
  setDisplayDate,

  RenderDateContent,
  isTouchGestureEnabled = false,
  isDateSelectionEnabled = false

}: CalendarProviderProps<T>) => {
  const calendarDates = useMemo(() => makeCalendarDates(displayDate).calendarDates, [displayDate]);

  const nextMonth = useCallback(() => {
    setDisplayDate(c => addMonths(c, 1));
  }, []);
  const prevMonth = useCallback(() => {
    setDisplayDate(c => subMonths(c, 1));
  }, []);
  const goToday = useCallback(() => {   //현재 날짜에 해당하는 달로 이동 + onClickMonthTitle() 실행
    onClickMonthTitle?.();
    setDisplayDate(new Date());
  }, [])

  const { handleTouchStart, handleTouchEnd } = useSwipe({ isTouchGestureEnabled, prevMonth, nextMonth });

  const value = {
    monthlyData,
    displayDate,
    calendarDates,
    RenderDateContent,

    nextMonth,
    prevMonth,
    goToday,

    onClickDate,
    onClickMonthTitle,

    handleTouchStart,
    handleTouchEnd,
    isTouchGestureEnabled,
    isDateSelectionEnabled
  };

  return (<CalendarContext.Provider value={value}>
    {children}
  </CalendarContext.Provider>);
}

export const useCalendar = <T,>() => {
  const context = useContext(CalendarContext) as CalendarContextValue<T>;
  if (!context) {
    throw new Error('context 사용이 올바르지 않습니다.');
  }
  return context;
}