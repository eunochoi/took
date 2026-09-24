'use client';

import { cn } from "@/common/utils/cn";
import DiaryAnalysis from "./DiaryAnalysis";
import EmotionStats from "./EmotionStats";
import HabitAnalysis from "./HabitAnalysis";
import TodayRecordSection from "./TodayRecordSection";

import type { DiaryStats, HabitStats } from "@/common/actions/stats";

interface Props {
  initialDate: string;
  selectedYear: number;
  diaryStats?: DiaryStats;
  habitStats?: HabitStats;
}

const HomeViewContent = ({ initialDate, selectedYear, diaryStats, habitStats }: Props) => {
  return (
    <div className={cn("grid flex-1 w-full min-w-0 grid-cols-1 items-start gap-14 desktop:grid-cols-[minmax(0,11fr)_minmax(0,9fr)] desktop:gap-x-8 desktop:gap-y-6")}>
      <div className="hidden desktop:block min-w-0 desktop:col-start-2 desktop:row-start-1 desktop:sticky desktop:top-[calc(var(--page-toolbar-height,68px)+24px)] desktop:self-start desktop:border-l desktop:border-theme-border/60 desktop:pl-8">
        <TodayRecordSection initialDate={initialDate} />
      </div>

      <div
        className="flex min-w-0 flex-col gap-14 desktop:col-start-1 desktop:row-start-1"
      >
        <DiaryAnalysis
          stats={diaryStats}
          year={selectedYear}
        />
        <EmotionStats
          emotionCounts={diaryStats?.emotionCounts ?? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
          halfYearEmotionCounts={diaryStats?.halfYearEmotionCounts ?? Array(2).fill(null).map(() => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0])}
        />
        <HabitAnalysis
          stats={habitStats}
        />
      </div>
    </div>
  );
};

export default HomeViewContent;
