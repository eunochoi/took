'use client';

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { getHabitById, getHabitMonthlyStatus } from "@/common/actions/habit";
import { authAction } from "@/common/auth/authAction";

import { format } from 'date-fns';
import { notFound } from "next/navigation";
import Calendar from "../../ui/Calendar";
import Carousel from "../../ui/Carousel";
import { Modal } from "../../ui/Modal";
import { StarRating } from "../../ui/StarRating";
import MonthHabitCount from "./MonthHabitCount";
import YearHabitChart from "./YearHabitChart";
import YearHabitCount from "./YearHabitCount";
import { renderHabitInfoPageContent } from "./_utils/renderHabitInfoPageContent";



interface Props {
  habitId: string;
}

const HabitInfoView = ({ habitId }: Props) => {
  const [calendarDate, setCalendarDate] = useState<Date>(new Date());
  const [chartDate, setChartDate] = useState<Date>(new Date());


  //only get habit default infomation - name, priority
  const { data: habitDataById, isError } = useQuery({
    queryKey: ['habits', 'id', habitId],
    queryFn: () => authAction(() => getHabitById({ id: habitId })),
    enabled: habitId !== null
  });
  const { data: habitDateDataMap } = useQuery({
    queryKey: ['habit', 'id', habitId, 'month', format(calendarDate, 'yyyy-MM')],
    queryFn: () => authAction(() => getHabitMonthlyStatus({ id: habitId, month: format(calendarDate, 'yyyy-MM') })),
    select: (data) => {
      const habitDateDataMap: { [key: string]: boolean } = {};
      data?.forEach((e: any) => {
        habitDateDataMap[format(e.date, 'yyMMdd')] = e?.Habits && true;
      });
      return habitDateDataMap;
    }
  });

  useEffect(() => {
    if (isError) notFound();
  }, [isError])

  return (
    <Modal>
      <Modal.Header headerTitleText='습관 정보' />
      <HabitInfoContent>
        <MobilePortNameWrapper>
          <Name>{habitDataById?.name ?? '-'}</Name>
          <PriorityStar rating={(habitDataById?.priority ?? 0) + 1} />
        </MobilePortNameWrapper>

        <CarouselWrapper>
          <Carousel>
            <CarouselPage>
              <MonthHabitCount
                displayDate={calendarDate}
                habitId={habitId}
                habitName={habitDataById?.name ?? '-'}
              />
              <CalendarWrapper>
                <Calendar
                  isTouchGestureEnabled={false}
                  variant="compact"
                  visibleMonth={calendarDate}
                  setVisibleMonth={setCalendarDate}
                  dateDataMap={habitDateDataMap}
                  renderDateContent={renderHabitInfoPageContent}
                />
              </CalendarWrapper>
            </CarouselPage>
            <CarouselPage>
              <YearHabitCount
                displayDate={chartDate}
                habitName={habitDataById?.name ?? '-'}
              />
              <YearHabitChart
                displayDate={chartDate}
                setDisplayDate={setChartDate} />
            </CarouselPage>
          </Carousel>
        </CarouselWrapper>
      </HabitInfoContent>
    </Modal>
  );
}

export default HabitInfoView;

const HabitInfoContent = styled(Modal.Content)`
  /* padding: 0 0 12px 0; */
  padding: 0;
`
const CalendarWrapper = styled.div`
  width: 100%;
  height: 100%;

  border-radius: 20px;
  padding: 12px;
  background-color: rgba(255,255,255,0.6);
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);
`
const MobilePortNameWrapper = styled.div`
  width: 100%;
  @media (min-width:480px) and (max-width:1024px) { //mobild land + tablet
    display: none;
  }
`
const Name = styled.div`
  color: rgb(var(--greyTitle));
  /* font-weight: 600; */
  font-size: 28px;
  height: auto;
  display: flex;
  justify-content: center;
  text-transform: uppercase;
  padding-top: 16px;
  @media (min-width:1025px) { //desktop
    font-size: 28px;
  }
`
const PriorityStar = styled(StarRating)`
  display: flex;
  justify-content: center;
  align-items: center;

  .star{
    font-size: 18px;
    color: ${(props) => props.theme.themeColor ? props.theme.themeColor : '#979FC7'};
  }
`

const CarouselWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 8px 0;

  @media (max-width: 479px) { //mobile port
    padding: 16px 0;
  }
`
const CarouselPage = styled.div`
  width: 100%;
  height: 100%;
  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 12px;

  @media (min-width:480px) and (max-width:1024px) {
    flex-direction: row;
  }
`
