'use client';

import { HabitStats } from "@/common/actions/stats";
import { StarRating } from "@/common/components/ui/StarRating";
import { cn } from "@/common/utils/cn";
import { useState } from "react";
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

      <div className="flex gap-3">
        <button
          className={cn(
            "border-b-2 pb-1 text-base",
            habitTab === 'top' ? "border-theme font-semibold text-grey-title" : "border-transparent font-normal text-[rgba(var(--greyTitle),0.5)]",
          )}
          onClick={() => setHabitTab('top')}
          type="button"
        >
          상위 Top 3
        </button>
        <button
          className={cn(
            "border-b-2 pb-1 text-base",
            habitTab === 'bottom' ? "border-theme font-semibold text-grey-title" : "border-transparent font-normal text-[rgba(var(--greyTitle),0.5)]",
          )}
          onClick={() => setHabitTab('bottom')}
          type="button"
        >
          하위 Top 3
        </button>
      </div>

      <div className="grid w-full grid-cols-3 gap-2.5 overflow-hidden py-1">
        {habits && habits.length > 0 ? (
          habits.slice(0, 3).map((habit) => (
            <div key={habit.id} className="flex h-[120px] min-w-0 flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl bg-white/90 px-2 py-3 shadow-card min-[480px]:h-[130px] min-[480px]:px-3 min-[480px]:py-4">
              <StarRating rating={habit.priority + 1} className="shrink-0 gap-0.5 text-sm opacity-80 min-[480px]:text-xs" />
              <span className="line-clamp-2 max-h-[calc(1.4em*2)] w-full min-w-0 break-words text-center text-base font-semibold leading-[1.4] text-grey-title min-[480px]:text-lg">
                {habit.name}
              </span>
              <span className="text-sm font-medium text-[rgba(var(--greyTitle),0.6)] min-[480px]:text-base">{habit.count}회</span>
            </div>
          ))
        ) : (
          <div className="col-span-full flex min-h-20 w-full items-center justify-center rounded-xl bg-white/40 text-base text-[rgba(var(--greyTitle),0.5)] min-[480px]:min-h-[90px]">
            {habitTab === 'top' ? '아직 완료한 습관이 없어요' : '하위 습관이 없어요'}
          </div>
        )}
      </div>

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
