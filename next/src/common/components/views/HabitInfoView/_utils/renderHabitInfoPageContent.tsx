import { CalendarDateContentProps } from "@/common/components/ui/Calendar/types";
import { format } from "date-fns";
import styled from "styled-components";


export const renderHabitInfoPageContent = ({ date, dateData: isDone }: CalendarDateContentProps<boolean>) => {
  const formattedDate = format(date, 'd');

  return <Wrapper className={isDone ? 'done' : ''}>
    {formattedDate}
  </Wrapper>;
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 16px;
  color: #525252;

  width: 26px;
  height: 26px;
  border-radius: 26px;
  &.done{
    background-color: ${(props) => props.theme.themeColor ? props.theme.themeColor : '#979FC7'};
    color: white;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    font-size: 14px;
    width: 18px;
    height: 18px;
    border-radius: 18px;
  }
`
