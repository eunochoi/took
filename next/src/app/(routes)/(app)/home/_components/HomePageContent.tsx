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
  isDiaryStatsError: boolean;
  isHabitStatsError: boolean;
  onRetryDiaryStats: () => void;
  onRetryHabitStats: () => void;
  onOpenYearPicker: () => void;
}

const HomePageContent = ({ initialDate, selectedYear, diaryStats, habitStats, isDiaryStatsError, isHabitStatsError, onRetryDiaryStats, onRetryHabitStats, onOpenYearPicker }: Props) => {
  return (
    <section className={cn("pt-3 grid flex-1 w-full min-w-0 grid-cols-1 items-start desktop:grid-cols-[minmax(0,11fr)_minmax(0,9fr)] desktop:gap-x-8")}>
      <div className="hidden min-w-0 desktop:col-start-2 desktop:row-start-1 desktop:sticky desktop:top-[max(112px,calc(var(--page-toolbar-height,0px)+24px))] desktop:flex desktop:flex-col desktop:gap-12 desktop:self-start desktop:border-l desktop:border-theme-border/60 desktop:pl-8">
        <TodayRecordSection initialDate={initialDate} />
        <HomeYearChangePrompt onOpenYearPicker={onOpenYearPicker} />
      </div>
      <div className="flex min-w-0 flex-col gap-14 desktop:gap-20 desktop:col-start-1 desktop:row-start-1">
        {diaryStats ? (
          <>
            <DiaryAnalysis stats={diaryStats} year={selectedYear} />
            <EmotionStats
              year={selectedYear}
              emotionCounts={diaryStats.emotionCounts}
              halfYearEmotionCounts={diaryStats.halfYearEmotionCounts}
            />
          </>
        ) : (
          <div role="status" className="py-12 text-center text-theme-text-secondary">
            {isDiaryStatsError ? (
              <>
                <p>일기와 감정 기록을 불러오지 못했어요.</p>
                <button type="button" className="mt-3 text-theme-accent" onClick={onRetryDiaryStats}>다시 시도</button>
              </>
            ) : '일기와 감정 기록을 불러오는 중이에요.'}
          </div>
        )}
        {habitStats ? (
          <HabitAnalysis stats={habitStats} year={selectedYear} />
        ) : (
          <div role="status" className="py-12 text-center text-theme-text-secondary">
            {isHabitStatsError ? (
              <>
                <p>습관 기록을 불러오지 못했어요.</p>
                <button type="button" className="mt-3 text-theme-accent" onClick={onRetryHabitStats}>다시 시도</button>
              </>
            ) : '습관 기록을 불러오는 중이에요.'}
          </div>
        )}
        <div className="desktop:hidden">
          <HomeYearChangePrompt onOpenYearPicker={onOpenYearPicker} />
        </div>
      </div>
    </section>
  );
};

export default HomePageContent;
