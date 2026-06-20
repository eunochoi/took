import styled from "styled-components";

import { authAction } from "@/common/actions/authAction";
import { getHabitYearlyStatus } from "@/common/actions/habit";
import { useQuery } from "@tanstack/react-query";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { addYears, format, subYears } from "date-fns";
import { useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface Props {
  displayDate: Date;
  setDisplayDate: Dispatch<SetStateAction<Date>>
}

const YearHabitChart = ({ setDisplayDate, displayDate }: Props) => {
  const params = useSearchParams(); //for habit id
  const habitId = params.get('id');

  const { data } = useQuery({
    queryKey: ['habit', 'id', habitId, 'year', format(displayDate, 'yyyy')],
    queryFn: () => authAction(() => getHabitYearlyStatus({ id: habitId, year: format(displayDate, 'yyyy') })),
  });
  const year = format(displayDate, 'yyyy');


  const currentYear = () => {
    setDisplayDate(new Date());
  };
  const nextYear = () => {
    const temp = addYears(displayDate, 1);
    setDisplayDate(temp);
  };
  const preYear = () => {
    const temp = subYears(displayDate, 1);
    setDisplayDate(temp);
  };


  return (
    <Wrapper>
      <YearInfo>
        <button onClick={preYear}><MdKeyboardArrowLeft /></button>
        <button onClick={currentYear}>{year}</button>
        <button onClick={nextYear}><MdKeyboardArrowRight /></button>
      </YearInfo>
      <Title>습관 성취 그래프</Title>
      <Chart>
        {[...Array(12)].map((_, i: number) =>
          <BarWrapper className="barWrapper" key={'month' + i + 1} $count={data ? data[i] / 31 * 100 : 0}>
            <div className="barEmpty">{data && data[i] > 0 && data[i]}</div>
            <div className="bar"></div>
            <div className="month">{i + 1}</div>
          </BarWrapper>)}
      </Chart>
    </Wrapper>);
}

export default YearHabitChart;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  color: rgb(var(--greyTitle));

  border-radius: 20px;
  padding: 16px;
  background-color: rgba(255,255,255,0.6);
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);
  >span{
    padding: 8px 0;
  }
`

const Chart = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
`
const BarWrapper = styled.div<{ $count: number }>`
  width: 100%;
  height: 100%;
  margin: 0 4px;

  display: flex;
  flex-direction: column;
  text-align: center;
  .barEmpty{
    flex-grow: 1;
    display : flex;
    flex-direction: column;
    justify-content: end;
    padding-bottom: 8px;
  }
  .bar{
    height: ${(props) => props.$count + '%'};
    border-radius: 8px;
    background-color: ${(props) => props.theme.themeColor ? props.theme.themeColor : '#979FC7'};  
  }
  .month{
    /* font-weight: 500; */
    padding: 8px 0;
  }
`
const Title = styled.span`
  line-height: 100%;
  font-size: 18px;
  /* font-weight: 500; */
  color: grey;
  margin: 12px 0;
`
const YearInfo = styled.div`
  width: 100%;
  margin: 4px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 20px;
  color: rgb(var(--greyTitle));
  /* font-weight: 600; */
  
  button{
    padding: 0 8px;
  }
`
