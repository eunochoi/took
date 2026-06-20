import styled from "styled-components";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import { getDefaultYear, MONTH_UNSELECTED } from "@/common/constants/filterDefaults";
import { useState } from "react";
import { lightenColor } from "@/common/utils/lightenColor";

interface Props {
  selectedYear: number;
  selectedMonth: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMonth: (d: number) => void;
}

const MonthSelector = ({ selectedYear, setSelectedYear, selectedMonth, setSelectedMonth }: Props) => {

  const monthsTopNum = [1, 2, 3, 4, 5, 6];
  const monthsTopEng = ['jan', 'feb', 'mar', 'apr', 'may', 'jun'];
  const monthsBottomNum = [7, 8, 9, 10, 11, 12];
  const monthsBottomEng = ['jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

  const [touchStartX, setTouchStartX] = useState<number>(0);   //for touch gesture


  const goToNextYear = () => {
    setSelectedYear(c => c + 1);
    setSelectedMonth(MONTH_UNSELECTED);
  }
  const goToPreYear = () => {
    setSelectedYear(c => c - 1);
    setSelectedMonth(MONTH_UNSELECTED);
  }
  const goToCurrentDate = () => {
    setSelectedYear(getDefaultYear());
  };
  const selectMonth = (n: number) => {
    if (selectedMonth === n) {
      setSelectedMonth(MONTH_UNSELECTED)
    }
    else setSelectedMonth(n)
  }
  return (<Wrapper>
    <YearArea>
      <button onClick={goToPreYear}><MdKeyboardArrowLeft /></button>
      <button onClick={goToCurrentDate}>{selectedYear}</button>
      <button onClick={goToNextYear}><MdKeyboardArrowRight /></button>
    </YearArea>
    <MonthsArea
      onTouchStart={(e: any) => {
        setTouchStartX(e.changedTouches[0].clientX);
      }}
      onTouchEnd={(e: any) => {
        const touchEndX = e.changedTouches[0].clientX;
        if (touchEndX - touchStartX > 100) goToPreYear();
        else if (touchStartX - touchEndX > 100) goToNextYear();
      }}
    >
      <Section>{monthsTopNum.map((e, i) =>
        <Month
          className={selectedMonth === i + 1 ? 'selectedMonth' : ''}
          key={'month' + i + 1}
          onClick={() => selectMonth(i + 1)}>
          <span className="num">{e}</span>
          <span className="eng">{monthsTopEng[i]}</span>
        </Month>)}
      </Section>
      <Section>{monthsBottomNum.map((e, i) =>
        <Month
          className={selectedMonth === i + 7 ? 'selectedMonth' : ''}
          key={'month' + i + 6}
          onClick={() => selectMonth(i + 7)}>
          <span className="num">{e}</span>
          <span className="eng">{monthsBottomEng[i]}</span>
        </Month>)}
      </Section>
    </MonthsArea>
  </Wrapper>);
}

export default MonthSelector;


const Wrapper = styled.div`
`
const YearArea = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  button{
    font-size: 20px;
    /* font-weight: 600; */
    color: rgb(var(--greyTitle));
    padding: 3px 8px;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    padding: 6px 0;
  }
`
const MonthsArea = styled.div`
  width: 100%;
  height: 150px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
   height: 120px;
  }
`
const Month = styled.button`
  width : 16%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .num{
    font-size: 16px;
    /* font-weight: 600; */
    color: rgb(var(--greyTitle));
  }
  .eng{
    font-size: 16px;
    text-transform: capitalize;
    /* font-weight: 300; */
    color: grey;
  }
  &.selectedMonth{
    background-color: ${(props) => props.theme.themeColor ? lightenColor(props.theme.themeColor, 35) : '#C4CBE0'};
    border-radius: 14px;
    .num, .eng {
      color: white;
    }
  }
`
const Section = styled.section`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: space-between;
`


