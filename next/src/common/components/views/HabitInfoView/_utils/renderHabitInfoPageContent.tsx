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

  width: 28px;
  height: 28px;
  border-radius: 28px;
  &.done{
    background-color: ${(props) => props.theme.themeColor ? props.theme.themeColor : '#979FC7'};
    color: white;
  }
`
