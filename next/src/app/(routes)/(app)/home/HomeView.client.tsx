'use client';

import HomeViewContent from "./_components/HomeViewContent";
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
import { AnimatePresence } from 'framer-motion';
import HomeViewTopArea from './_components/HomeViewTopArea';
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
        toolbar={
          <HomeViewToolbar
            selectedYear={selectedYear}
            openYearFilter={openYearFilter}
          />
        }
        mainAreaClassName={`bg-theme-surface px-[4dvw] tablet:px-9 desktop:px-14 py-2 tablet:py-4 desktop:py-8`}

        appPageMainArea={
          <HomeViewContent
            initialDate={initialDate}
            selectedYear={selectedYear}
            diaryStats={diaryStats}
            habitStats={habitStats}
          />
        }
      />
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
