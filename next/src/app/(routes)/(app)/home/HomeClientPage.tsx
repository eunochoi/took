'use client';

import HomeViewContent from "./_components/HomeViewContent";
import HomeViewToolbar from "./_components/HomeViewToolbar";

import { useQuery } from "@tanstack/react-query";
import { getYear } from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { getAvailableYears, getDiaryStats, getHabitStats } from "@/common/actions/stats";
import { authAction } from "@/common/auth/authAction";
import AppPageLayout from "@/common/components/layout/AppPageLayout";
import { usePrefetchPage } from "@/common/hooks/usePrefetchPage";
import { AnimatePresence } from 'framer-motion';
import HomePageYearPicker from './_components/HomePageYearPicker';
import HomeViewTopSection from './_components/HomeViewTopSection';

const HomeClientPage = ({ initialDate }: { initialDate: string }) => {
  usePrefetchPage();
  const currentYear = getYear(new Date());
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryYear = Number(searchParams.get('year'));
  const selectedYear = Number.isInteger(queryYear) && queryYear > 0 ? queryYear : currentYear;
  const [isYearPickerOpen, setIsYearPickerOpen] = useState(false);

  const handleApplyYear = (year: number) => {
    const params = new URLSearchParams(searchParams);

    if (year === currentYear) params.delete('year');
    else params.set('year', year.toString());

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
    setIsYearPickerOpen(false);
  };

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
        topSection={<HomeViewTopSection initialDate={initialDate} />}
        toolbar={
          <HomeViewToolbar
            selectedYear={selectedYear}
            openYearFilter={() => setIsYearPickerOpen(true)}
          />
        }
        mainSection={
          <HomeViewContent
            initialDate={initialDate}
            selectedYear={selectedYear}
            diaryStats={diaryStats}
            habitStats={habitStats}
          />
        }
      />
      <AnimatePresence>
        {isYearPickerOpen && (
          <HomePageYearPicker
            key="year-picker"
            onClose={() => setIsYearPickerOpen(false)}
            years={years}
            selectedYear={selectedYear}
            onApplyYear={handleApplyYear}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default HomeClientPage;
