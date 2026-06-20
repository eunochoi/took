'use client';

import styled from "styled-components";

import { CalendarCell } from "./CalendarCell";
import { useCalendar } from "./CalendarContext";

interface Props {
  FormattedValue: ({ displayDate, dateData }: { displayDate: Date, dateData: Date }) => JSX.Element;
  isTouchGestureEnabled?: boolean;
  isDateSelectionEnabled?: boolean;
}

const CalendarBody = () => {
  const { calendarDates, handleTouchStart, handleTouchEnd } = useCalendar();

  return (
    <CalBody
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {calendarDates.map((weekRow, i) =>
        <CalRow key={'weeks' + i} className="cal_week_row">
          {weekRow.map(date => (
            <CalendarCell key={date.toString()} cellDate={date} />
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