'use client';

import { useQuery } from "@tanstack/react-query";
import { getYear } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { MdCalendarMonth } from "react-icons/md";

import { getAvailableYears, getDiaryStats, getHabitStats } from "@/common/actions/stats";
import { authAction } from "@/common/auth/authAction";
import AppPageLayout from "@/common/components/layout/AppPageLayout";
import ToolbarButton from "@/common/components/ui/ToolbarButton";
import { useModalParam } from "@/common/hooks/useModalParam";
import { usePrefetchPage } from "@/common/hooks/usePrefetchPage";
import { AnimatePresence } from 'framer-motion';
import HomeViewTopArea from './_components/HomeViewTopArea';
import DiaryAnalysis from "./_components/DiaryAnalysis";
import EmotionStats from "./_components/EmotionStats";
import HabitAnalysis from "./_components/HabitAnalysis";
import TodayRecordSection from "./_components/TodayRecordSection";
import YearFilter from './_components/YearFilter';

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
          <>
            <ToolbarButton onClick={openYearFilter}>
              <MdCalendarMonth size={18} className="shrink-0" aria-hidden="true" />
              {selectedYear}년
            </ToolbarButton>
          </>
        }
        contentProps={{
          className: "flex-1 gap-3 max-tablet:gap-5 tablet:gap-6",
        }}>
        <div className="grid w-full min-w-0 grid-cols-1 items-start gap-14 desktop:grid-cols-[minmax(0,11fr)_minmax(0,9fr)] desktop:gap-x-8 desktop:gap-y-6">
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
