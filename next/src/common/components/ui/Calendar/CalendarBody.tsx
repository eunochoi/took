'use client';

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
    <div
      className="flex grow flex-col justify-around overflow-visible"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {calendarWeeks.map((weekRow, i) =>
        <div key={'weeks' + i} className="cal_week_row flex h-full items-center justify-around overflow-visible">
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
        </div>)
      }
    </div>
  );
};

export default CalendarBody;
