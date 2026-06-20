'use client';

import DiaryAddButton from '@/common/components/ui/Diary/DiaryAddButton';
import DiaryCardShell from '@/common/components/ui/Diary/DiaryCardShell';
import DiaryHabits from '@/common/components/ui/Diary/DiaryHabits';
import type { DiaryHabit } from '@/common/types/diary';
import { parseLocalDate } from '@/common/utils/date/parseLocalDate';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import styled from 'styled-components';

interface Props {
  date: string;
  habits?: DiaryHabit[];
}

const EmptyCalendarDiary = ({ date, habits = [] }: Props) => {
  const dateForDisplay = parseLocalDate(date);
  const formattedDate = format(dateForDisplay, 'yyyy년 M월 d일');
  const day = format(dateForDisplay, 'eeee', { locale: ko });

  return (
    <Wrapper>
      <EmptySlide>
        <Header>
          <DateInfo>
            <span className="date">{formattedDate}</span>
            <span className="week">{day}</span>
          </DateInfo>
        </Header>
        <DiaryAddButton date={date} />
        <DiaryHabits habits={habits} />
      </EmptySlide>
    </Wrapper>
  );
};

export default EmptyCalendarDiary;

const Wrapper = styled(DiaryCardShell).attrs<{ $type?: 'small' }>({ $type: 'small' })``;

const EmptySlide = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
`;

const Header = styled.div`
  width: 100%;
  padding: 14px;
  padding-bottom: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DateInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  span {
    font-weight: 500;
    font-size: 20px;
  }

  .week {
    color: grey;
  }

  .date {
    color: rgb(var(--greyTitle));
  }
`;
