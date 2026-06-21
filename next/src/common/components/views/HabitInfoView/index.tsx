'use client';

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { getHabitById } from "@/common/actions/habit";
import { authAction } from "@/common/auth/authAction";

import { notFound } from "next/navigation";
import { Modal } from "../../ui/Modal";
import { StarRating } from "../../ui/StarRating";
import MonthInfo from "./MonthInfo";
import YearInfo from "./YearInfo";



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

  useEffect(() => {
    if (isError) notFound();
  }, [isError])

  return (
    <Modal>
      <Modal.Header headerTitleText='습관 정보' />
      <HabitInfoContent>
        <ContentSection>
          <HabitHeader>
            <PriorityStar rating={(habitDataById?.priority ?? 0) + 1} />
            <Name>{habitDataById?.name ?? '-'}</Name>
          </HabitHeader>

          <MonthInfo
            displayDate={calendarDate}
            habitId={habitId}
            setDisplayDate={setCalendarDate}
          />

          <YearInfo
            displayDate={chartDate}
            habitId={habitId}
            setDisplayDate={setChartDate} />
        </ContentSection>
      </HabitInfoContent>
    </Modal>
  );
}

export default HabitInfoView;

const HabitInfoContent = styled(Modal.Content)`
  padding: 0;
`
const ContentSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px 12px 24px 12px;

  @media (min-width:480px) {
    padding: 20px 24px 28px 24px;
  }
`
const HabitHeader = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`
const Name = styled.div`
  color: rgb(var(--greyTitle));
  font-size: 28px;
  font-weight: 600;
  text-transform: uppercase;
  text-align: center;
  word-break: keep-all;
  overflow-wrap: break-word;
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
