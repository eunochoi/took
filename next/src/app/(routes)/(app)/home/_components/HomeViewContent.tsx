'use client';

import { cn } from "@/common/utils/cn";
import DiaryAnalysis from "./DiaryAnalysis";
import EmotionStats from "./EmotionStats";
import HabitAnalysis from "./HabitAnalysis";
import TodayRecordSection from "./TodayRecordSection";

import type { DiaryStats, HabitStats } from "@/common/actions/stats";
import HomeYearChangePrompt from "./HomeYearChangePrompt";

interface Props {
  initialDate: string;
  selectedYear: number;
  diaryStats?: DiaryStats;
  habitStats?: HabitStats;
  onOpenYearPicker: () => void;
}

const HomeViewContent = ({ initialDate, selectedYear, diaryStats, habitStats, onOpenYearPicker }: Props) => {
  return (
    <section className={cn("pt-3 grid flex-1 w-full min-w-0 grid-cols-1 items-start desktop:grid-cols-[minmax(0,11fr)_minmax(0,9fr)] desktop:gap-x-8")}>
      <div className="hidden min-w-0 desktop:col-start-2 desktop:row-start-1 desktop:sticky desktop:top-[calc(var(--page-toolbar-height,68px)+24px)] desktop:flex desktop:flex-col desktop:gap-12 desktop:self-start desktop:border-l desktop:border-theme-border/60 desktop:pl-8">
        <TodayRecordSection initialDate={initialDate} />
        <HomeYearChangePrompt onOpenYearPicker={onOpenYearPicker} />
      </div>
      <div className="flex min-w-0 flex-col gap-14 desktop:gap-20 desktop:col-start-1 desktop:row-start-1">
        <DiaryAnalysis
          stats={diaryStats}
          year={selectedYear}
        />
        <EmotionStats
          year={selectedYear}
          emotionCounts={diaryStats?.emotionCounts ?? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
          halfYearEmotionCounts={diaryStats?.halfYearEmotionCounts ?? Array(2).fill(null).map(() => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0])}
        />
        <HabitAnalysis
          year={selectedYear}
          stats={habitStats}
        />
        <div className="desktop:hidden">
          <HomeYearChangePrompt onOpenYearPicker={onOpenYearPicker} />
        </div>
      </div>
    </section>
  );
};

export default HomeViewContent;
