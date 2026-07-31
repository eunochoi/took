'use client';

import { useQuery } from "@tanstack/react-query";
import { getYear } from "date-fns";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { getAvailableYears, getDiaryStats, getHabitStats } from "@/common/actions/stats";
import { authAction } from "@/common/auth/authAction";
import AppPageLayout from "@/common/components/layout/AppPageLayout";
import TopButton from "@/common/components/ui/TopButtons/TopButton";
import { useModalParam } from "@/common/hooks/useModalParam";
import { usePrefetchPage } from "@/common/hooks/usePrefetchPage";

import DiaryAnalysis from "./_components/DiaryAnalysis";
import EmotionStats from "./_components/EmotionStats";
import GreetingSection from "./_components/GreetingSection";
import HabitAnalysis from "./_components/HabitAnalysis";
import YearFilter from "./_components/YearFilter";

const HomeView = () => {
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
    <AppPageLayout
      topButtons={
        <TopButton size="auto" onClick={openYearFilter}>
          <span>{selectedYear}년</span>
        </TopButton>
      }
      contentProps={{
        className: "gap-14 max-[479px]:pb-[calc(var(--mobileNav)+48px)] max-[479px]:pt-2 min-[480px]:pb-12 min-[480px]:pt-2",
      }}
      afterContent={
        <YearFilter
          isOpen={isYearFilterOpen}
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
      }>
      <GreetingSection />

      <DiaryAnalysis
        stats={diaryStats}
        year={selectedYear}
      />

      <EmotionStats
        emotionCounts={diaryStats?.emotionCounts ?? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
        monthlyEmotionCounts={diaryStats?.monthlyEmotionCounts ?? Array(12).fill(null).map(() => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0])}
      />

      <HabitAnalysis
        stats={habitStats}
      />
    </AppPageLayout>
  );
};

export default HomeView;
