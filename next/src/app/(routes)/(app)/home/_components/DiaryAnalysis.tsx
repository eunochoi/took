'use client';

import { DiaryStats } from "@/common/actions/stats";

import { AppSection, AppSectionHeader, AppSectionMeta, AppSectionTitle } from "@/common/components/ui/AppSection/section";
import { AppStatLabel, AppStatUnit, AppStatValue, AppStatValueWrapper } from "@/common/components/ui/AppSection/stat";
import { cn } from "@/common/utils/cn";
import { MdCalendarMonth, MdDescription, MdEmojiEvents } from "react-icons/md";

interface Props {
  stats?: DiaryStats;
  year: number;
}

const monthlyBarClass = "min-h-1 w-3 max-w-5 rounded-[3px] transition-[height] duration-200 ease-in-out";
const statIconClass = "h-6 w-6 text-theme-accent";
const statBoxClass = "flex min-w-0 flex-col items-center gap-2 py-3";

const DiaryAnalysis = ({ stats, year }: Props) => {
  const formatTextLength = (length: number) => {
    if (length < 1000) return { value: length, unit: '자' };
    if (length < 10000) return { value: (length / 1000).toFixed(1), unit: '천자' };
    if (length < 100000000) return { value: (length / 10000).toFixed(1), unit: '만자' };
    return { value: (length / 100000000).toFixed(1), unit: '억자' }
  };

  const currentStreak = stats?.currentStreak?.days ?? 0;
  const currentStreakLabel = stats?.streakStatus === 'pending' ? '유지 기록' : '현재 기록';
  const longestStreak = stats?.longestStreak?.days ?? 0;
  const totalTextLength = stats?.totalTextLength ?? 0;
  const textLengthFormatted = formatTextLength(totalTextLength);

  const totalCount = stats?.totalCount ?? 0;

  return (
    <AppSection>
      <AppSectionHeader>
        <AppSectionTitle>일기 기록</AppSectionTitle>
        <AppSectionMeta>{totalCount}개의 일기</AppSectionMeta>
      </AppSectionHeader>

      <div className="grid grid-cols-3 divide-x divide-theme-border/60">
        <div className={statBoxClass}>
          <MdCalendarMonth className={statIconClass} aria-hidden="true" />
          <AppStatLabel>{currentStreakLabel}</AppStatLabel>
          <AppStatValueWrapper className="items-baseline gap-1">
            <AppStatValue>{currentStreak}</AppStatValue>
            <AppStatUnit>일</AppStatUnit>
          </AppStatValueWrapper>
        </div>

        <div className={statBoxClass}>
          <MdEmojiEvents className={statIconClass} aria-hidden="true" />
          <AppStatLabel>최고 기록</AppStatLabel>
          <AppStatValueWrapper className="items-baseline gap-1">
            <AppStatValue>{longestStreak}</AppStatValue>
            <AppStatUnit>일</AppStatUnit>
          </AppStatValueWrapper>
        </div>

        <div className={statBoxClass}>
          <MdDescription className={statIconClass} aria-hidden="true" />
          <AppStatLabel>총 텍스트</AppStatLabel>
          <AppStatValueWrapper className="items-baseline gap-1">
            <AppStatValue>{textLengthFormatted.value}</AppStatValue>
            <AppStatUnit>{textLengthFormatted.unit}</AppStatUnit>
          </AppStatValueWrapper>
        </div>
      </div>
      <div className="flex flex-col gap-3 p-2">
        <div className="flex flex-row">
          {(stats?.monthlyCount ?? Array(12).fill(0)).map((count, index) => {
            const maxCount = Math.max(...(stats?.monthlyCount ?? [1]), 1);
            const barHeight = count > 0 ? Math.max((count / maxCount) * 112, 8) : 4;

            return (
              <div key={index} className="flex flex-1 flex-col items-center gap-1.5">
                <div className="flex h-32 w-full items-end justify-center">
                  <div className="flex flex-col items-center gap-1">
                    {count > 0 && (
                      <span className="text-sm font-medium leading-none text-theme-accent">
                        {count}
                      </span>
                    )}

                    <div
                      className={cn(
                        monthlyBarClass,
                        count > 0
                          ? 'bg-theme-accent'
                          : 'bg-theme-text-primary/15',
                      )}
                      style={{ height: `${barHeight}px` }}
                    />
                  </div>
                </div>

                <span className="text-sm text-theme-text-secondary">
                  {index + 1}
                </span>
              </div>
            );
          })}
        </div>

        <span className="flex justify-center text-sm text-theme-text-secondary">
          * {year}년 월간 기록 그래프
        </span>
      </div>
    </AppSection >
  );
};

export default DiaryAnalysis;
