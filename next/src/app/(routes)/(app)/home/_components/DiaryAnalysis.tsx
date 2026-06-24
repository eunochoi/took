'use client';

import { DiaryStats } from "@/common/actions/stats";

import { AppCardGrid, AppSurfaceCard } from "@/common/components/ui/AppSection/card";
import { AppInfoCard, AppInfoContent, AppInfoText } from "@/common/components/ui/AppSection/info";
import { AppSection, AppSectionHeader, AppSectionMeta, AppSectionTitle, AppSubsectionTitle } from "@/common/components/ui/AppSection/section";
import { AppStatCard, AppStatLabel, AppStatUnit, AppStatValue, AppStatValueWrapper } from "@/common/components/ui/AppSection/stat";
import { getStreakMessage } from "../_messages/streakMessages";

interface Props {
  stats?: DiaryStats;
  year: number;
}

const monthlyBarClass = "min-h-1 w-3/5 max-w-5 rounded-[3px] transition-[height] duration-300 ease-in-out";

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

      <AppCardGrid $columns={3}>
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

      <div className="flex flex-col gap-6">
        <AppSubsectionTitle>{year}년 월간 기록 그래프</AppSubsectionTitle>
        <AppSurfaceCard className="flex items-end justify-between px-2 py-4">
          {(stats?.monthlyCount ?? Array(12).fill(0)).map((count, index) => {
            const maxCount = Math.max(...(stats?.monthlyCount ?? [1]), 1);
            const barHeight = count > 0 ? Math.max((count / maxCount) * 72, 8) : 4;
            return (
              <div key={index} className="flex flex-1 flex-col items-center gap-1.5">
                <div className="flex h-20 w-full items-end justify-center">
                  <div
                    className={count > 0 ? `${monthlyBarClass} bg-theme` : `${monthlyBarClass} bg-[rgba(var(--greyTitle),0.15)]`}
                    style={{ height: `${barHeight}px` }}
                  />
                </div>
                <span className="text-sm text-[rgba(var(--greyTitle),0.6)]">{index + 1}</span>
              </div>
            );
          })}
        </AppSurfaceCard>
      </div>
    </AppSection>
  );
};

export default DiaryAnalysis;
