'use client';

import { StarRating } from "@/common/components/ui/StarRating";
import { HabitStats } from "@/common/actions/stats";
import { useState } from "react";
import styled from "styled-components";
import {
  AppInfoCard,
  AppInfoContent,
  AppInfoText,
  AppSection,
  AppSectionHeader,
  AppSectionMeta,
  AppSectionTitle,
} from "@/common/components/ui/AppSection";

interface Props {
  stats?: HabitStats;
}

type HabitTab = 'top' | 'bottom';

const HabitAnalysis = ({ stats }: Props) => {
  const [habitTab, setHabitTab] = useState<HabitTab>('top');

  const habits = habitTab === 'top' ? stats?.topHabits : stats?.bottomHabits;

  return (
    <AppSection>
      <AppSectionHeader>
        <AppSectionTitle>습관 정보</AppSectionTitle>
        <AppSectionMeta>{stats?.totalHabits ?? 0}개의 목표 습관</AppSectionMeta>
      </AppSectionHeader>

      <TabWrapper>
        <Tab
          $active={habitTab === 'top'}
          onClick={() => setHabitTab('top')}>
          상위 Top 3
        </Tab>
        <Tab
          $active={habitTab === 'bottom'}
          onClick={() => setHabitTab('bottom')}>
          하위 Top 3
        </Tab>
      </TabWrapper>

      <HabitList>
        {habits && habits.length > 0 ? (
          habits.slice(0, 3).map((habit) => (
            <HabitCard key={habit.id}>
              <StarRating rating={habit.priority + 1} className="star-rating" />
              <HabitName>{habit.name}</HabitName>
              <HabitCount>{habit.count}회</HabitCount>
            </HabitCard>
          ))
        ) : (
          <EmptyMessage>
            {habitTab === 'top' ? '아직 완료한 습관이 없어요' : '하위 습관이 없어요'}
          </EmptyMessage>
        )}
      </HabitList>

      <AppInfoCard>
        <AppInfoContent>
          <span>
            {habitTab === 'top'
              ? '상위 Top 3는 선택한 해에 가장 많이 완료한 습관을 보여줘요.'
              : '하위 Top 3는 선택한 해에 완료 기록이 있는 습관 중 가장 적게 완료한 습관을 보여줘요.'}
          </span>
        </AppInfoContent>
        <AppInfoText>
          * 0회 완료한 습관은 Top 3에 표시되지 않습니다.
        </AppInfoText>
      </AppInfoCard>
    </AppSection>
  );
};

export default HabitAnalysis;

const TabWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const Tab = styled.button<{ $active: boolean }>`
  font-size: 16px;
  font-weight: ${({ $active }) => $active ? '600' : '400'};
  color: ${({ $active }) => $active ? 'rgb(var(--greyTitle))' : 'rgba(var(--greyTitle), 0.5)'};
  padding-bottom: 4px;
  border-bottom: 2px solid ${({ $active, theme }) => $active ? (theme.themeColor ?? '#979FC7') : 'transparent'};
`;

const HabitList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  padding: 4px 0;
  width: 100%;
  overflow: hidden;
`;

const HabitCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-width: 0;
  height: 120px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  padding: 12px 8px;
  overflow: hidden;
  
  .star-rating {
    font-size: 14px;
    color: ${props => props.theme.themeColor ?? '#979FC7'};
    gap: 2px;
    opacity: 0.8;
    flex-shrink: 0;
  }
  
  @media (min-width: 480px) {
    height: 130px;
    padding: 16px 12px;
    
    .star-rating {
      font-size: 12px;
    }
  }
`;

const HabitName = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: rgb(var(--greyTitle));
  width: 100%;
  min-width: 0;
  text-align: center;
  line-height: 1.4;
  overflow-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-height: calc(1.4em * 2);
  
  @media (min-width: 480px) {
    font-size: 18px;
    max-height: calc(1.4em * 2);
  }
`;

const HabitCount = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: rgba(var(--greyTitle), 0.6);
  
  @media (min-width: 480px) {
    font-size: 16px;
  }
`;

const EmptyMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column: 1 / -1;
  width: 100%;
  min-height: 80px;
  font-size: 16px;
  color: rgba(var(--greyTitle), 0.5);
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 12px;
  
  @media (min-width: 480px) {
    min-height: 90px;
  }
`;
