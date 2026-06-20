'use client';

import styled from "styled-components";

//function
import { Dispatch, SetStateAction } from "react";
import CalendarBody from "./CalendarBody";
import { CalendarProvider } from './CalendarContext';
import CalendarHeader from "./CalendarHeader";

interface CalendarProps<T> {
  className?: string;
  headerSize?: 'small' | 'middle' | 'large';
  headerTitlePosition?: 'center' | 'start';

  visibleMonth: Date;
  setVisibleMonth: Dispatch<SetStateAction<Date>>;
  selectedDate?: Date;
  monthlyData?: T;
  onClickMonthTitle?: () => void;
  onClickDate?: (date: Date) => void;
  RenderDateContent?: ({ cellDate }: {
    cellDate: Date;
  }) => JSX.Element

  isTouchGestureEnabled?: boolean;
}

const Calendar = <T,>({
  className,
  headerSize = 'large',
  headerTitlePosition = 'start',

  monthlyData,
  visibleMonth,
  setVisibleMonth,
  selectedDate,

  onClickMonthTitle,
  onClickDate,

  RenderDateContent,
  isTouchGestureEnabled
}: CalendarProps<T>) => {

  return (
    <CalendarProvider
      monthlyData={monthlyData}
      visibleMonth={visibleMonth}
      setVisibleMonth={setVisibleMonth}
      selectedDate={selectedDate}

      onClickMonthTitle={onClickMonthTitle}
      onClickDate={onClickDate}

      RenderDateContent={RenderDateContent}
      isTouchGestureEnabled={isTouchGestureEnabled}
    >
      <Wrapper className={className}>
        <CalendarHeader
          headerSize={headerSize}
          headerTitlePosition={headerTitlePosition}
        />
        <CalendarBody />
      </Wrapper>
    </CalendarProvider>
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
