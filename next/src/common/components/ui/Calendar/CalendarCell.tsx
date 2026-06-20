import { endOfMonth, format, isAfter, isBefore, isSameDay, isSameMonth, startOfMonth } from "date-fns";
import { memo } from "react";
import styled, { keyframes } from "styled-components";
import { DateContentRenderer, DateDataMap } from "./types";

interface CalendarCellProps<T> {
  date: Date;
  dateDataMap?: DateDataMap<T>;
  visibleMonth: Date;
  selectedDate?: Date;
  renderDateContent?: DateContentRenderer<T>;
  onClickDate?: (date: Date) => void;
  prevMonth: () => void;
  nextMonth: () => void;
}

// props로 받은 dateFormating 함수를 이용해 어떤 결과를 보여줄지를 결정한다. 
// memo를 사용해서 자신의 prop(date)이 바뀌지 않으면 리렌더링되지 않도록 최적화
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
    <CellWrapper
      onClick={handleClick}
      className={`
        ${isCurrentMonth ? 'currentMonth' : 'notCurrentMonth'}
        ${(isCurrentMonth && isSelectedDate) ? 'selected' : ''}
      `}
    >
      <TodayDot
        className={`
          ${(isCurrentMonth && isToday) ? 'today' : ''}
      `}
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
    </CellWrapper >
  );
};

const MemoizedCalendarCell = memo(CalendarCellComponent);
MemoizedCalendarCell.displayName = 'CalendarCell';

export const CalendarCell = MemoizedCalendarCell as typeof CalendarCellComponent;

// selected 될 때 한 번만 통통 튀는 느낌
const selectedPop = keyframes`
  0% { transform: scale(1); }
  40% { transform: scale(1.2); }
  70% { transform: scale(0.95); }
  100% { transform: scale(1); }
`;

const CellWrapper = styled.div`
  width: 14%;
  height: 98%;
  position: relative;

  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;

  color: #666565;
  overflow: visible;

  border : solid transparent 3px;
  border-radius: 8px;

  transition: opacity 200ms ease-in-out;
  &:not(.selected) {
  }
  &.selected {
    animation: ${selectedPop} 0.35s ease-out;
  }

  &.notCurrentMonth{
    opacity: 0.3;
  }
  font-size: 16px;
  span{
    font-size: 16px;
  }
`
const TodayDot = styled.div`
  z-index: 99;
  position: absolute;
  top: 0;

  display: none;
  &.today{
    display: block;
  }

  width: 10px;
  height: 10px;
  border-radius: 100%;
  background-color: ${(props) => props.theme.themeColor ? props.theme.themeColor : '#B0B8D4'};
`
