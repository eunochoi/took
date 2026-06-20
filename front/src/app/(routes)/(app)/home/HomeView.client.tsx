'use client';

import { useQuery } from "@tanstack/react-query";
import { getYear } from "date-fns";
import { useMemo, useState } from "react";

import { ContentWrapper } from "@/common/components/layout/ContentWrapper";
import { PageWrapper } from "@/common/components/layout/PageWrapper";
import TopButtons from "@/common/components/ui/TopButtons";
import { authAction } from "@/common/actions/authAction";
import { getAvailableYears, getDiaryStats, getHabitStats } from "@/common/actions/stats";
import { useModalParam } from "@/common/hooks/useModalParam";
import { usePrefetchPage } from "@/common/hooks/usePrefetchPage";

import DiaryAnalysis from "./_components/DiaryAnalysis";
import EmotionStats from "./_components/EmotionStats";
import GreetingSection from "./_components/GreetingSection";
import HabitAnalysis from "./_components/HabitAnalysis";
import YearSelector from "./_components/YearSelector";

const HomeView = () => {
  usePrefetchPage();

  const currentYear = getYear(new Date());
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const { isOpen: isYearSelectorOpen, open: openYearSelector, close: closeYearSelector } = useModalParam('year-filter');

  const { data: availableYears } = useQuery({
    queryKey: ['stats', 'years'],
    queryFn: () => authAction(getAvailableYears),
    staleTime: 5 * 60 * 1000,
  });

  const { data: diaryStats, isLoading: isDiaryLoading } = useQuery({
    queryKey: ['stats', 'diary', selectedYear],
    queryFn: () => authAction(() => getDiaryStats({ year: selectedYear })),
    staleTime: 60 * 1000,
  });

  const { data: habitStats, isLoading: isHabitLoading } = useQuery({
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

  const isLoading = isDiaryLoading || isHabitLoading;

  return (
    <PageWrapper>
      <TopButtons>
        <button
          className='auto'
          onClick={openYearSelector}>
          <span>{selectedYear}년</span>
        </button>
      </TopButtons>

      <ContentWrapper $gap={28} $paddingTop={8} $paddingBottom={48}>
        <GreetingSection />

        <DiaryAnalysis
          stats={diaryStats}
          year={selectedYear}
          isLoading={isLoading}
        />

        <EmotionStats
          emotionCounts={diaryStats?.emotionCounts ?? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
          monthlyEmotionCounts={diaryStats?.monthlyEmotionCounts ?? Array(12).fill(null).map(() => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0])}
          isLoading={isLoading}
        />

        <HabitAnalysis
          stats={habitStats}
          isLoading={isLoading}
        />
      </ContentWrapper>

      <YearSelector
        isOpen={isYearSelectorOpen}
        onClose={closeYearSelector}
        years={years}
        selectedYear={selectedYear}
        onSelectYear={(year) => {
          setSelectedYear(year);
          closeYearSelector();
        }}
      />
    </PageWrapper>
  );
};

export default HomeView;
