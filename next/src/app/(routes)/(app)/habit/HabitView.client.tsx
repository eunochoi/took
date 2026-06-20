'use client';

import styled from "styled-components";

import { ContentWrapper } from "@/common/components/layout/ContentWrapper";
import { PageWrapper } from "@/common/components/layout/PageWrapper";
import TopButtons from "@/common/components/ui/TopButtons";
import { authAction } from "@/common/actions/authAction";
import { getHabitList } from "@/common/actions/habit";
import { usePrefetchPage } from "@/common/hooks/usePrefetchPage";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { MdAdd } from 'react-icons/md';
import HabitBox from "./_components/HabitBox";
import { useCustomHabitOrder } from "./_hooks/useCustomHabitOrder";
import { useHabitToggle } from "./_hooks/useHabitToggle";
import { useTodayHabitRate } from "./_hooks/useTodayHabitRate";

interface Habit {
  id: number;
  name: string;
  priority: number;
}

const MAX_HABIT_COUNT = 18;

type SORT = 'ASC' | 'DESC' | 'PRIORITY' | 'CUSTOM';
const SORT_TEXT: Record<SORT, string> = {
  ASC: 'old',
  DESC: 'new',
  PRIORITY: '★',
  CUSTOM: 'custom'
}

const HabitView = () => {
  usePrefetchPage();
  const router = useRouter();
  const { todayDoneHabitCount, todayDoneHabitRate } = useTodayHabitRate();
  const { toggleValue, onToggle } = useHabitToggle();
  const { customOrder } = useCustomHabitOrder();

  const { data: habits } = useQuery({
    queryKey: ['habits', 'list', toggleValue],
    queryFn: () => authAction(() => getHabitList({ sort: toggleValue, customOrder })),
  });

  const onAddHabit = () => {
    if (habits && habits.length >= MAX_HABIT_COUNT) enqueueSnackbar(`습관은 최대 ${MAX_HABIT_COUNT}개 생성 가능합니다.`, { variant: 'info' })
    else router.push('/inter/input/addHabit', { scroll: false })
  }


  return (
    <PageWrapper>
      <TopButtons>
        <button onClick={onAddHabit} className="small">
          <MdAdd />
        </button>
        <button onClick={onToggle} className={toggleValue === 'CUSTOM' ? 'large' : 'normal'} >
          <span>{SORT_TEXT[toggleValue]}</span>
        </button>
      </TopButtons>

      <ContentWrapper>
        <HabitPageTextWrapper>
          <HabitPageText className='title'>목표 습관 {todayDoneHabitRate}% 완료</HabitPageText>
          <HabitPageText className='sub'>오늘의 목표 습관 {todayDoneHabitCount}개를 실천하셨습니다 :)</HabitPageText>
        </HabitPageTextWrapper>

        <HabitBoxs>
          {habits?.map((habit: Habit) => <HabitBox key={habit.id} id={habit.id} name={habit.name} priority={habit.priority} />)}
          {(habits?.length ?? 0) < MAX_HABIT_COUNT && <EmptyBox onClick={onAddHabit}><MdAdd /></EmptyBox>}
        </HabitBoxs>
      </ContentWrapper>
    </PageWrapper >
  );
}

export default HabitView;

const HabitPageTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  margin-top: 16px;
  margin-bottom: 28px;
  gap: 8px;
`
const HabitPageText = styled.span`
  &.title{
    color: rgb(var(--greyTitle));
    width: 100%;

    font-size: 32px;
    font-family: 'BMJUA';
    @media (min-width:1025px) { //desktop
      font-size: 36px;
    }
  }
  &.sub{
    font-size: 18px;
    color: grey;
  }
`


const HabitBoxs = styled.div`
  width: 100%;
  height: auto;
  flex-shrink: 0;

  display: grid;
  grid-template-rows: auto;
  grid-template-columns: repeat(2, 1fr);

  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width:1024px) { //desktop
    grid-template-columns: repeat(3, 1fr);
  }

  
  gap: 12px;
  padding-bottom: 8px;
`
const EmptyBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  flex-shrink: 0;
  width: 100%;
  aspect-ratio: 0.8;
  
  border-radius: 24px;
  background-color: rgba(255,255,255,0.9);
  box-shadow: 0 1px 8px rgba(0,0,0,0.04);
  color: ${(props) => props.theme.themeColor ? props.theme.themeColor : '#979FC7'};
  font-size: 48px;
`
