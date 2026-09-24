'use client';

import { HabitStats } from "@/common/actions/stats";
import { AppSection, AppSectionHeader, AppSectionMeta, AppSectionTitle } from "@/common/components/ui/AppSection/section";
import AppUnderlineTabs from "@/common/components/ui/AppUnderlineTabs";
import HabitIcon from "@/common/components/ui/HabitIcon";
import { StarRating } from "@/common/components/ui/StarRating";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const [habitTab, setHabitTab] = useState<HabitTab>('top');

  const habits = habitTab === 'top' ? stats?.topHabits : stats?.bottomHabits;
  const handleHabitClick = (habitId: number) => {
    router.push(`/inter/habitInfo?id=${habitId}`, { scroll: false });
  };

  return (
    <AppSection>
      <AppSectionHeader>
        <AppSectionTitle>습관 기록</AppSectionTitle>
        <AppSectionMeta>전체 {stats?.totalHabits ?? 0}개의 목표 습관</AppSectionMeta>
      </AppSectionHeader>

      <AppUnderlineTabs
        options={HABIT_TAB_OPTIONS}
        value={habitTab}
        onChange={setHabitTab}
      />

      {habits && habits.length > 0 ?
        <ol className="m-0 list-none divide-y divide-theme-border/60 p-2">
          {habits.slice(0, 3).map((habit) => (
            <li key={habit.id}>
              <button
                type="button"
                onClick={() => handleHabitClick(habit.id)}
                className="flex w-full min-w-0 items-center gap-6 rounded-lg py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-theme-accent tablet:gap-4"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-transparent">
                  <HabitIcon iconKey={habit.iconKey} className="text-4xl" />
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="truncate text-base leading-relaxed text-theme-text-primary">
                    {habit.name}
                  </span>
                  <StarRating maxRating={3} rating={habit.priority + 1} className="shrink-0 gap-0.5 text-base opacity-80" />
                </div>
                <span className="flex shrink-0 items-baseline gap-1 font-title tabular-nums">
                  <span className="text-2xl font-semibold text-theme-accent">{habit.count}</span>
                  <span className="text-sm text-theme-text-secondary">회</span>
                </span>
              </button>
            </li>
          ))}
        </ol> :
        <p className="m-0 px-2 py-8 text-center text-sm text-theme-text-secondary text-center">
          아직 완료한 습관이 없어요.
        </p>}

      <p className="m-0 px-2 text-sm leading-relaxed text-theme-text-secondary text-center">
        완료한 적 없는 습관은 &apos;Top 3&apos;에 나타나지 않습니다.
      </p>
    </AppSection>
  );
};

export default HabitAnalysis;
