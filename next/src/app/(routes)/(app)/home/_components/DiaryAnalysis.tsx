'use client';

import { DiaryStats } from "@/common/actions/stats";
import styled from "styled-components";

import { getStreakMessage } from "../_messages/streakMessages";
import {
  HomeCard,
  HomeCardGrid,
  HomeCardLabel,
  HomeCardUnit,
  HomeCardValue,
  HomeCardValueWrapper,
  HomeInfoCard,
  HomeInfoContent,
  HomeInfoText,
  HomeSectionHeader,
  HomeSectionTitle,
  HomeSectionWrapper,
  HomeSubsectionTitle,
  HomeTotalCount,
} from "./HomeSection";

interface Props {
  stats?: DiaryStats;
  year: number;
}

const DiaryAnalysis = ({ stats, year }: Props) => {
  const formatTextLength = (length: number) => {
    if (length < 1000) return { value: length, unit: '자' };
    if (length < 10000) return { value: (length / 1000).toFixed(1), unit: '천자' };
    return { value: (length / 10000).toFixed(1), unit: '만자' };
  };

  const currentStreak = stats?.currentStreak?.days ?? 0;
  const longestStreak = stats?.longestStreak?.days ?? 0;
  const currentStreakLabel = stats?.streakStatus === 'pending' ? '유지 중인 기록' : '현재 연속 기록';
  const streakInfoText = stats?.streakStatus === 'pending'
    ? '* 오늘 일기를 작성하면 유지 중인 기록이 현재 연속 기록으로 이어집니다.'
    : '* 오늘 일기를 작성하면 오늘 기록까지 포함돼요.';
  const totalTextLength = stats?.totalTextLength ?? 0;
  const textLengthFormatted = formatTextLength(totalTextLength);

  const totalCount = stats?.totalCount ?? 0;

  return (
    <HomeSectionWrapper>
      <HomeSectionHeader>
        <HomeSectionTitle>일기 정보</HomeSectionTitle>
        <HomeTotalCount>{totalCount}개의 일기</HomeTotalCount>
      </HomeSectionHeader>

      <HomeCardGrid>
        <HomeCard>
          <HomeCardLabel>{currentStreakLabel}</HomeCardLabel>
          <HomeCardValueWrapper>
            <HomeCardValue>{currentStreak}</HomeCardValue>
            <HomeCardUnit>일</HomeCardUnit>
          </HomeCardValueWrapper>
        </HomeCard>

        <HomeCard>
          <HomeCardLabel>최장 연속 기록</HomeCardLabel>
          <HomeCardValueWrapper>
            <HomeCardValue>{longestStreak}</HomeCardValue>
            <HomeCardUnit>일</HomeCardUnit>
          </HomeCardValueWrapper>
        </HomeCard>

        <HomeCard>
          <HomeCardLabel>총 텍스트량</HomeCardLabel>
          <HomeCardValueWrapper>
            <HomeCardValue>{textLengthFormatted.value}</HomeCardValue>
            <HomeCardUnit>{textLengthFormatted.unit}</HomeCardUnit>
          </HomeCardValueWrapper>
        </HomeCard>
      </HomeCardGrid>

      <HomeInfoCard>
        <HomeInfoContent>
          <span>{getStreakMessage(currentStreak)}</span>
        </HomeInfoContent>
        <HomeInfoText>
          {streakInfoText}
        </HomeInfoText>
      </HomeInfoCard>

      <ChartSection>
        <HomeSubsectionTitle>{year}년 월간 기록 그래프</HomeSubsectionTitle>
        <ChartWrapper>
          {(stats?.monthlyCount ?? Array(12).fill(0)).map((count, index) => {
            const maxCount = Math.max(...(stats?.monthlyCount ?? [1]), 1);
            const barHeight = count > 0 ? Math.max((count / maxCount) * 72, 8) : 4;
            return (
              <BarWrapper key={index}>
                <BarArea>
                  <Bar $height={barHeight} $hasValue={count > 0} />
                </BarArea>
                <BarLabel>{index + 1}</BarLabel>
              </BarWrapper>
            );
          })}
        </ChartWrapper>
      </ChartSection>
    </HomeSectionWrapper>
  );
};

export default DiaryAnalysis;

const ChartSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ChartWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 16px 8px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

const BarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex: 1;
`;

const BarArea = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 80px;
  width: 100%;
`;

const Bar = styled.div<{ $height: number; $hasValue: boolean }>`
  width: 60%;
  max-width: 20px;
  min-height: 4px;
  height: ${({ $height }) => $height}px;
  background-color: ${({ $hasValue, theme }) =>
    $hasValue ? (theme.themeColor ?? '#979FC7') : 'rgba(var(--greyTitle), 0.15)'};
  border-radius: 3px;
  transition: height 0.3s ease;
`;

const BarLabel = styled.span`
  font-size: 14px;
  color: rgba(var(--greyTitle), 0.6);
`;
