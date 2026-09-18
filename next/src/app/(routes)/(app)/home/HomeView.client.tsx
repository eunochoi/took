'use client';

import { AnimatePresence } from "framer-motion";

import { useQuery } from "@tanstack/react-query";
import { getYear } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useMemo, useRef } from "react";
import { MdCalendarMonth } from "react-icons/md";

import { getAvailableYears, getDiaryStats, getHabitStats } from "@/common/actions/stats";
import { authAction } from "@/common/auth/authAction";
import AppPageLayout from "@/common/components/layout/AppPageLayout";
import CaptureTopButton from "@/common/components/ui/CaptureTopButton";
import TopButton from "@/common/components/ui/TopButton";
import { useModalParam } from "@/common/hooks/useModalParam";
import { usePrefetchPage } from "@/common/hooks/usePrefetchPage";

import DiaryAnalysis from "./_components/DiaryAnalysis";
import EmotionStats from "./_components/EmotionStats";
import HabitAnalysis from "./_components/HabitAnalysis";
import TodayRecordSection from "./_components/TodayRecordSection";
import YearFilter from "./_components/YearFilter";

const HomeView = ({ initialDate }: { initialDate: string }) => {
  usePrefetchPage();

  const captureRef = useRef<HTMLDivElement>(null);
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

  const { data: diaryStats, isSuccess: diaryReady, isFetching: diaryFetching } = useQuery({
    queryKey: ['stats', 'diary', selectedYear],
    queryFn: () => authAction(() => getDiaryStats({ year: selectedYear })),
    staleTime: 60 * 1000,
  });

  const { data: habitStats, isSuccess: habitReady, isFetching: habitFetching } = useQuery({
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
    <AppPageLayout
      title="기록 돌아보기"
      description="작은 기록이 모여 나다운 하루가 돼요"
      showMobileLogo
      showScrollToTop
      topButton={
        <>
          <TopButton onClick={openYearFilter}>
            <MdCalendarMonth size={18} className="shrink-0" aria-hidden="true" />
            {selectedYear}년
          </TopButton>
          <CaptureTopButton targetRef={captureRef} disabled={!diaryReady || !habitReady || diaryFetching || habitFetching} />
        </>
      }
      contentProps={{
        className: "flex-1 gap-3 max-tablet:gap-5 tablet:gap-6",
      }}
      afterContent={
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
      }>
      <div className="grid w-full min-w-0 grid-cols-1 items-start gap-14 desktop:grid-cols-[minmax(0,11fr)_minmax(0,9fr)] desktop:gap-x-8 desktop:gap-y-6">
        <div className="min-w-0 desktop:col-start-2 desktop:row-start-1 desktop:sticky desktop:top-[calc(var(--page-toolbar-height,68px)+24px)] desktop:self-start">
          <TodayRecordSection initialDate={initialDate} />
        </div>

        <div
          ref={captureRef}
          data-capture-key={`records-${selectedYear}`}
          data-capture-title={`${selectedYear}년 기록 돌아보기`}
          data-capture-ready={diaryReady && habitReady && !diaryFetching && !habitFetching}
          className="flex min-w-0 flex-col gap-14 desktop:col-start-1 desktop:row-start-1"
        >
          <DiaryAnalysis
            stats={diaryStats}
            year={selectedYear}
          />

          <div className="min-w-0">
            <EmotionStats
              emotionCounts={diaryStats?.emotionCounts ?? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
              monthlyEmotionCounts={diaryStats?.monthlyEmotionCounts ?? Array(12).fill(null).map(() => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0])}
            />
          </div>

          <HabitAnalysis
            stats={habitStats}
          />
        </div>
      </div>
    </AppPageLayout>
  );
};

export default HomeView;
