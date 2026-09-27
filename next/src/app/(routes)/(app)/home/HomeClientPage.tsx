'use client';

import HomePageContent from "./_components/HomePageContent";

import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { getAvailableYears, getDiaryStats, getHabitStats } from "@/common/actions/stats";
import { authAction } from "@/common/auth/authAction";
import AppPageLayout from "@/common/components/layout/AppPageLayout";
import { usePrefetchPage } from "@/common/hooks/usePrefetchPage";
import { AnimatePresence } from 'framer-motion';
import HomePageYearPicker from './_components/HomePageYearPicker';
import HomePageTopSection from './_components/HomePageTopSection';

const HomeClientPage = ({ initialDate }: { initialDate: string }) => {
  usePrefetchPage();
  const currentYear = Number(initialDate.slice(0, 4));
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryYear = Number(searchParams.get('year'));
  const selectedYear = Number.isInteger(queryYear) && queryYear >= 1900 && queryYear <= 2100 ? queryYear : currentYear;
  const [isYearPickerOpen, setIsYearPickerOpen] = useState(false);

  const handleApplyYear = (year: number) => {
    const params = new URLSearchParams(searchParams);

    if (year === currentYear) params.delete('year');
    else params.set('year', year.toString());

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
    setIsYearPickerOpen(false);
  };

  const { data: availableYears, isPending: isYearsPending, isError: isYearsError, refetch: refetchYears } = useQuery({
    queryKey: ['stats', 'years'],
    queryFn: () => authAction(getAvailableYears),
    staleTime: 5 * 60 * 1000,
  });

  const { data: diaryStats, isError: isDiaryStatsError, refetch: refetchDiaryStats } = useQuery({
    queryKey: ['stats', 'diary', selectedYear],
    queryFn: () => authAction(() => getDiaryStats({ year: selectedYear })),
    staleTime: 60 * 1000,
  });

  const { data: habitStats, isError: isHabitStatsError, refetch: refetchHabitStats } = useQuery({
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
        topSection={<HomePageTopSection initialDate={initialDate} />}
        mainSection={
          <HomePageContent
            initialDate={initialDate}
            selectedYear={selectedYear}
            diaryStats={diaryStats}
            habitStats={habitStats}
            isDiaryStatsError={isDiaryStatsError}
            isHabitStatsError={isHabitStatsError}
            onRetryDiaryStats={() => { void refetchDiaryStats(); }}
            onRetryHabitStats={() => { void refetchHabitStats(); }}
            onOpenYearPicker={() => setIsYearPickerOpen(true)}
          />
        }
      />
      <AnimatePresence>
        {isYearPickerOpen && (
          <HomePageYearPicker
            key="year-picker"
            onClose={() => setIsYearPickerOpen(false)}
            years={years}
            isPending={isYearsPending}
            isError={isYearsError}
            onRetry={() => { void refetchYears(); }}
            selectedYear={selectedYear}
            onApplyYear={handleApplyYear}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default HomeClientPage;
