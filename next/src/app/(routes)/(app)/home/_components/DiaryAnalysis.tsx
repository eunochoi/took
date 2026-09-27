'use client';

import { DiaryStats } from "@/common/actions/stats";

import { AppSection, AppSectionHeader, AppSectionMeta, AppSectionTitle } from "@/common/components/ui/AppSection";
import { cn } from "@/common/utils/cn";
import { MdCalendarMonth, MdEmojiEvents } from "react-icons/md";

interface Props {
  stats?: DiaryStats;
  year: number;
}

const monthlyBarClass = "min-h-1 w-3 max-w-5 rounded-[3px] transition-[height] duration-200 ease-in-out";
const statIconClass = "h-6 w-6 text-theme-accent";
const statBoxClass = "flex min-w-0 flex-col items-center gap-2 py-3";

const DiaryAnalysis = ({ stats, year }: Props) => {
  const currentStreak = stats?.currentStreak?.days ?? 0;
  const longestStreak = stats?.longestStreak?.days ?? 0;

  const totalCount = stats?.totalCount ?? 0;

  return (
    <AppSection>
      <AppSectionHeader>
        <AppSectionTitle>일기 기록</AppSectionTitle>
        <AppSectionMeta>{year}년 전체 {totalCount}개</AppSectionMeta>
      </AppSectionHeader>

      <div className="grid grid-cols-2 divide-x divide-theme-border/60">
        <div className={statBoxClass}>
          <MdCalendarMonth className={statIconClass} aria-hidden="true" />
          <p className="m-0 text-center text-sm text-theme-text-secondary">현재 연속 기록</p>
          <div className="flex items-baseline justify-center gap-1">
            <span className="flex items-baseline text-2xl font-bold leading-none text-theme-accent tablet:text-xl">{currentStreak}</span>
            <span className="text-sm font-bold text-theme-text-secondary">일</span>
          </div>
        </div>

        <div className={statBoxClass}>
          <MdEmojiEvents className={statIconClass} aria-hidden="true" />
          <p className="m-0 text-center text-sm text-theme-text-secondary">역대 최고 기록</p>
          <div className="flex items-baseline justify-center gap-1">
            <span className="flex items-baseline text-2xl font-bold leading-none text-theme-accent tablet:text-xl">{longestStreak}</span>
            <span className="text-sm font-bold text-theme-text-secondary">일</span>
          </div>
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
      </div>
    </AppSection >
  );
};

export default DiaryAnalysis;
