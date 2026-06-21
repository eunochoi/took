'use client';

import { DiaryStats } from "@/common/actions/stats";
import styled from "styled-components";

import { getStreakMessage } from "../_messages/streakMessages";
import {
  AppCardGrid,
  AppInfoCard,
  AppInfoContent,
  AppInfoText,
  AppSection,
  AppSectionHeader,
  AppSectionMeta,
  AppSectionTitle,
  AppStatCard,
  AppStatLabel,
  AppStatUnit,
  AppStatValue,
  AppStatValueWrapper,
  AppSubsectionTitle,
} from "@/common/components/ui/AppSection";

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
    <AppSection>
      <AppSectionHeader>
        <AppSectionTitle>일기 정보</AppSectionTitle>
        <AppSectionMeta>{totalCount}개의 일기</AppSectionMeta>
      </AppSectionHeader>

      <AppCardGrid>
        <AppStatCard>
          <AppStatLabel>{currentStreakLabel}</AppStatLabel>
          <AppStatValueWrapper>
            <AppStatValue>{currentStreak}</AppStatValue>
            <AppStatUnit>일</AppStatUnit>
          </AppStatValueWrapper>
        </AppStatCard>

        <AppStatCard>
          <AppStatLabel>최장 연속 기록</AppStatLabel>
          <AppStatValueWrapper>
            <AppStatValue>{longestStreak}</AppStatValue>
            <AppStatUnit>일</AppStatUnit>
          </AppStatValueWrapper>
        </AppStatCard>

        <AppStatCard>
          <AppStatLabel>총 텍스트량</AppStatLabel>
          <AppStatValueWrapper>
            <AppStatValue>{textLengthFormatted.value}</AppStatValue>
            <AppStatUnit>{textLengthFormatted.unit}</AppStatUnit>
          </AppStatValueWrapper>
        </AppStatCard>
      </AppCardGrid>

      <AppInfoCard>
        <AppInfoContent>
          <span>{getStreakMessage(currentStreak)}</span>
        </AppInfoContent>
        <AppInfoText>
          {streakInfoText}
        </AppInfoText>
      </AppInfoCard>

      <ChartSection>
        <AppSubsectionTitle>{year}년 월간 기록 그래프</AppSubsectionTitle>
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
    </AppSection>
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
