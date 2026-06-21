'use client';

import styled from "styled-components";

import { CalendarCell } from "./CalendarCell";
import { CalendarDateContentRenderer, CalendarDateDataMap } from "./types";

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
    <CalBody
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {calendarWeeks.map((weekRow, i) =>
        <CalRow key={'weeks' + i} className="cal_week_row">
          {weekRow.map(date => (
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
          ))}
        </CalRow>)
      }
    </CalBody >
  );
}

export default CalendarBody;

const CalBody = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  overflow: visible;
`
const CalRow = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  overflow: visible;
`
