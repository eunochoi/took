import { authAction } from "@/common/auth/authAction";
import { getHabitMonthlyStatus } from "@/common/actions/habit";
import { useQuery } from "@tanstack/react-query";
import { format, lastDayOfMonth } from "date-fns";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import styled from "styled-components";

interface Props {
  displayDate: Date;
  habitId: string;
  habitName: string;
}

const MonthHabitCount = ({ displayDate, habitId, habitName }: Props) => {

  //only habit data by month, not include habit name or priority
  const { data, isError } = useQuery({
    queryKey: ['habit', 'id', habitId, 'month', format(displayDate, 'yyyy-MM')],
    queryFn: () => authAction(() => getHabitMonthlyStatus({ id: habitId, month: format(displayDate, 'yyyy-MM') }))
  });

  useEffect(() => {
    if (isError) notFound();
  }, [isError])

  return (
    <Info>
      <span className="name">{habitName}</span>
      <div className="infoText">
        <span>{format(displayDate, 'yyyy년 M월')}</span>
        <span>습관 실천 횟수</span>
      </div>
      <div className="infoCount">{data?.length} / {format(lastDayOfMonth(displayDate), 'dd')}</div>
    </Info>
  );
}

export default MonthHabitCount;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* text-transform:lowercase; */

  padding: 32px 8px; 

  width: 100%;
  text-align: start;
  
  color: rgb(var(--greyTitle));
  /* font-weight: 500; */
  .name{
    display: none;
  }
  .infoText{
    display: flex;
    flex-direction: column;
    font-size: 18px;
    color: #5c5c5c;
    span{
      line-height: 150%;
    }
  }
  .infoCount{
    line-height: 100%;
    /* font-weight: 700; */
    font-size: 32px;
    color: ${(props) => props.theme.themeColor ? props.theme.themeColor : '#979FC7'} !important;
  }
  
  @media (min-width:480px) and (max-width:1024px) { //mobild land + tablet
    width: 50%;
    height: 100%;
    flex-direction: column;
    justify-content: space-evenly;

    .name{
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      margin: 24px 0;
      width: 90%;
     
      /* font-weight: 600; */
      font-size: 32px;
      word-break: keep-all;
    } 
    .infoText{
      text-align: center;
    }
    .infoCount{
      margin: 24px 0;
    }
  }
  @media (min-width:1025px) { //desktop
    .infoText{
      font-size: 20px;
    }
  }
`
