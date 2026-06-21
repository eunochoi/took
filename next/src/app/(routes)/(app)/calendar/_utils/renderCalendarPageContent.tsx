import { format } from "date-fns";
import Image from "next/image";
import styled from "styled-components";

import { CalendarDateContentProps } from "@/common/components/ui/Calendar/types";
import { EMOTIONS } from "@/common/constants/emotions";
import { lightenColor } from "@/common/utils/lightenColor";

interface DiaryDateData {
  habitsCount: number;
  isVisible: boolean;
  emotionType: number;
}

export const renderCalendarPageContent = ({ date, dateData }: CalendarDateContentProps<DiaryDateData>) => {
  const {
    habitsCount = 0,
    isVisible: hasDiary = false,
    emotionType = -1,
  } = dateData || {};
  const hasHabit = habitsCount > 0;
  const formattedDate = format(date, 'd');
  const emotion = EMOTIONS[emotionType];

  if (hasDiary && emotion) {
    return (
      <Wrapper>
        <Image src={emotion.src} alt={emotion.nameKr} />
        {habitsCount > 0 && <Badge>{habitsCount}</Badge>}
      </Wrapper>
    );
  }
  if (!hasDiary && hasHabit) {
    return (
      <CenterBadge>{habitsCount}</CenterBadge>
    );
  }
  return (<span className="date">{formattedDate}</span>);
};


const Wrapper = styled.div`
  position: relative; 
  width: 100%;
  z-index: 2;

  & > img {
    width: 100%; 
    height: auto;
  }
`;

const Badge = styled.div`
  position: absolute;
  z-index: 10;
  top: -10px; 
  right: -10px;

  width: 26px;
  height: 26px;
  font-size: 16px;
  border-radius: 50% 45% 55% 50% / 60% 50% 50% 55%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => props.theme.themeColor ? lightenColor(props.theme.themeColor, 30) : '#B8C4E8'};
  color: white;
  font-weight: 600;
`;

const CenterBadge = styled.div`
  width: 26px;
  height: 26px;
  font-size: 16px;
  border-radius: 50% 45% 55% 50% / 60% 50% 50% 55%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => props.theme.themeColor ? lightenColor(props.theme.themeColor, 30) : '#B8C4E8'};
  color: white;
  font-weight: 600;
  
  transform: scale(1.3);
`;
