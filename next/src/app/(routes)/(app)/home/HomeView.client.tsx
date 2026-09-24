'use client';

import HomeViewToolbar from "./_components/HomeViewToolbar";

import { useQuery } from "@tanstack/react-query";
import { getYear } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { getAvailableYears, getDiaryStats, getHabitStats } from "@/common/actions/stats";
import { authAction } from "@/common/auth/authAction";
import AppPageLayout from "@/common/components/layout/AppPageLayout";
import { useModalParam } from "@/common/hooks/useModalParam";
import { usePrefetchPage } from "@/common/hooks/usePrefetchPage";
import { cn } from "@/common/utils/cn";
import { AnimatePresence } from 'framer-motion';
import DiaryAnalysis from "./_components/DiaryAnalysis";
import EmotionStats from "./_components/EmotionStats";
import HabitAnalysis from "./_components/HabitAnalysis";
import HomeViewTopArea from './_components/HomeViewTopArea';
import TodayRecordSection from "./_components/TodayRecordSection";
import YearFilter from './_components/YearFilter';

const PADDING_X = "px-[4dvw] tablet:px-9 desktop:px-14";

const HomeView = ({ initialDate }: { initialDate: string }) => {
  usePrefetchPage();
  const currentYear = getYear(new Date());
  const searchParams = useSearchParams();
  const queryYear = Number(searchParams.get('year'));
  const selectedYear = Number.isInteger(queryYear) && queryYear > 0 ? queryYear : currentYear;
  const { isOpen: isYearFilterOpen, open: openYearFilter, close: closeYearFilter } = useModalParam('year-filter');

  const { data: availableYears } = useQuery({
    queryKey: ['stats', 'years'],
    queryFn: () => authAction(getAvailableYears),
    staleTime: 5 * 60 * 1000,
  });

  const { data: diaryStats } = useQuery({
    queryKey: ['stats', 'diary', selectedYear],
    queryFn: () => authAction(() => getDiaryStats({ year: selectedYear })),
    staleTime: 60 * 1000,
  });

  const { data: habitStats } = useQuery({
    queryKey: ['stats', 'habit', selectedYear],
    queryFn: () => authAction(() => getHabitStats({ year: selectedYear })),
    staleTime: 60 * 1000,
  });

  const years = useMemo(() => {
    if (!availableYears || availableYears.length === 0) {
      return [currentYear];
    }
    const yearSet = new Set([...availableYears, currentYear]);
    return Array.from(yearSet).sort((a, b) => b - a);
  }, [availableYears, currentYear]);

  return (
    <>
      <AppPageLayout
        appPageTopArea={<HomeViewTopArea initialDate={initialDate} />}
        showScrollToTop
        toolbar={
          <HomeViewToolbar
            selectedYear={selectedYear}
            openYearFilter={openYearFilter}
          />
        }
        mainAreaClassName={`bg-theme-surface ${PADDING_X} py-2 tablet:py-4 desktop:py-8`}
      >
        <div className={cn("grid flex-1 w-full min-w-0 grid-cols-1 items-start gap-14 desktop:grid-cols-[minmax(0,11fr)_minmax(0,9fr)] desktop:gap-x-8 desktop:gap-y-6")}>
          <div className="hidden desktop:block min-w-0 desktop:col-start-2 desktop:row-start-1 desktop:sticky desktop:top-[calc(var(--page-toolbar-height,68px)+24px)] desktop:self-start">
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
      </AppPageLayout>
      <AnimatePresence>
        {isYearFilterOpen && (
          <YearFilter
            key="year-filter"
            onClose={() => closeYearFilter()}
            years={years}
            selectedYear={selectedYear}
            onApplyYear={(year) => {
              const params = new URLSearchParams(searchParams);
              params.delete('modal');

              if (year === currentYear) params.delete('year');
              else params.set('year', year.toString());

              closeYearFilter(params);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default HomeView;
