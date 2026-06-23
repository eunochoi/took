'use client';

import { HabitStats } from "@/common/actions/stats";
import { AppCardGrid } from "@/common/components/ui/AppSection/card";
import { AppInfoCard, AppInfoContent, AppInfoText } from "@/common/components/ui/AppSection/info";
import { AppSection, AppSectionHeader, AppSectionMeta, AppSectionTitle } from "@/common/components/ui/AppSection/section";
import { AppStatCard } from "@/common/components/ui/AppSection/stat";
import AppUnderlineTabs from "@/common/components/ui/AppUnderlineTabs";
import { StarRating } from "@/common/components/ui/StarRating";
import { useState } from "react";

interface Props {
  stats?: HabitStats;
}

type HabitTab = 'top' | 'bottom';

const HABIT_TAB_OPTIONS: Array<{ label: string; value: HabitTab }> = [
  { label: '상위 Top 3', value: 'top' },
  { label: '하위 Top 3', value: 'bottom' },
];

const HabitAnalysis = ({ stats }: Props) => {
  const [habitTab, setHabitTab] = useState<HabitTab>('top');

  const habits = habitTab === 'top' ? stats?.topHabits : stats?.bottomHabits;

  return (
    <AppSection>
      <AppSectionHeader>
        <AppSectionTitle>습관 정보</AppSectionTitle>
        <AppSectionMeta>전체 {stats?.totalHabits ?? 0}개의 목표 습관</AppSectionMeta>
      </AppSectionHeader>

      <AppUnderlineTabs
        options={HABIT_TAB_OPTIONS}
        value={habitTab}
        onChange={setHabitTab}
      />

      {habits && habits.length > 0 ?
        <AppCardGrid $columns={3}>
          {habits.slice(0, 3).map((habit) => (
            <AppStatCard key={habit.id} className="h- min-w-0 items-center justify-center overflow-hidden px-2 py-3 min-[480px]:h-[130px] min-[480px]:px-3 min-[480px]:py-4">
              <StarRating rating={habit.priority + 1} className="shrink-0 gap-0.5 text-sm opacity-80 min-[480px]:text-xs" />
              <span className="line-clamp-2 max-h-[calc(1.4em*2)] w-full min-w-0 break-words text-center text-sm font-semibold leading-[1.4] text-grey-title min-[480px]:text-lg">
                {habit.name}
              </span>
              <span className="text-sm font-medium text-[rgba(var(--greyTitle),0.6)] min-[480px]:text-base">{habit.count}회</span>
            </AppStatCard>
          ))}
        </AppCardGrid> :
        <AppCardGrid $columns={1}>
          <AppInfoCard>
            <AppInfoText>* 아직 완료한 습관이 없어요 :(</AppInfoText>
          </AppInfoCard>
        </AppCardGrid>}

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
