import { addMonths, subMonths } from "date-fns";
import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useContext, useMemo } from "react";
import { useSwipe } from "./hooks/useSwipe";
import makeCalendarDates from "./utils/makeCalendarDates";


interface CalendarContextValue<T> {
  monthlyData: T;
  visibleMonth: Date;
  selectedDate?: Date;
  calendarDates: Date[][]; //visibleMonth가 변경되면서 생성된 보여질 날짜 목록
  nextMonth: () => void;
  prevMonth: () => void;
  goToday: () => void;

  onClickMonthTitle?: () => void;
  onClickDate?: (date: Date) => void;
  RenderDateContent?: ({ cellDate }: {
    cellDate: Date;
  }) => JSX.Element

  isTouchGestureEnabled: boolean;
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
  visibleMonth: Date;
  setVisibleMonth: Dispatch<SetStateAction<Date>>;
  selectedDate?: Date;
  RenderDateContent?: ({ cellDate }: {
    cellDate: Date;
  }) => JSX.Element
  isTouchGestureEnabled?: boolean;
}
export const CalendarProvider = <T,>({
  children,
  onClickMonthTitle,
  onClickDate,

  monthlyData,
  visibleMonth,
  setVisibleMonth,
  selectedDate,

  RenderDateContent,
  isTouchGestureEnabled = false

}: CalendarProviderProps<T>) => {
  const calendarDates = useMemo(() => makeCalendarDates(visibleMonth).calendarDates, [visibleMonth]);

  const nextMonth = useCallback(() => {
    setVisibleMonth(c => addMonths(c, 1));
  }, [setVisibleMonth]);
  const prevMonth = useCallback(() => {
    setVisibleMonth(c => subMonths(c, 1));
  }, [setVisibleMonth]);
  const goToday = useCallback(() => {   //현재 날짜에 해당하는 달로 이동 + onClickMonthTitle() 실행
    onClickMonthTitle?.();
    setVisibleMonth(new Date());
  }, [onClickMonthTitle, setVisibleMonth]);

  const { handleTouchStart, handleTouchEnd } = useSwipe({ isTouchGestureEnabled, prevMonth, nextMonth });

  const value = {
    monthlyData,
    visibleMonth,
    selectedDate,
    calendarDates,
    RenderDateContent,

    nextMonth,
    prevMonth,
    goToday,

    onClickDate,
    onClickMonthTitle,

    handleTouchStart,
    handleTouchEnd,
    isTouchGestureEnabled
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
