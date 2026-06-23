'use client';

import { useQuery } from "@tanstack/react-query";
import { getYear } from "date-fns";
import { useMemo, useState } from "react";

import { getAvailableYears, getDiaryStats, getHabitStats } from "@/common/actions/stats";
import { authAction } from "@/common/auth/authAction";
import AppPage from "@/common/components/layout/AppPage";
import TopButton from "@/common/components/ui/TopButtons/TopButton";
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
    <AppPage
      contentVariant="normal"
      topButtons={
        <TopButton
          size="auto"
          onClick={openYearSelector}>
          <span>{selectedYear}년</span>
        </TopButton>
      }
      contentProps={{ $gap: 56, $paddingTop: 8, $paddingBottom: 48 }}
      afterContent={
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
    </AppPage>
  );
};

export default HomeView;
