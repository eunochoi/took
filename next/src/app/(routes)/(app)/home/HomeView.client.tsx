'use client';

import { AnimatePresence } from "framer-motion";

import { useQuery } from "@tanstack/react-query";
import { getYear } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { MdCalendarMonth } from "react-icons/md";



import { getAvailableYears, getDiaryStats, getHabitStats } from "@/common/actions/stats";
import { authAction } from "@/common/auth/authAction";
import AppPageLayout from "@/common/components/layout/AppPageLayout";
import TopButton from "@/common/components/ui/TopButton";
import Wordmark from "@/common/components/ui/Wordmark";
import { useModalParam } from "@/common/hooks/useModalParam";
import { usePrefetchPage } from "@/common/hooks/usePrefetchPage";

import { EMOTIONS } from "@/common/constants/emotions";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image";
import DiaryAnalysis from "./_components/DiaryAnalysis";
import EmotionStats from "./_components/EmotionStats";
import HabitAnalysis from "./_components/HabitAnalysis";
import TodayRecordSection from "./_components/TodayRecordSection";
import YearFilter from "./_components/YearFilter";

const GREETING_TEXT = {
  title: '오늘도 하나씩',
  sub: ['감정도 습관도, 툭.', '조금씩 더 나은 내가 돼요.']
}

const HomeView = ({ initialDate }: { initialDate: string }) => {
  usePrefetchPage();
  const today = format(new Date(initialDate), 'M월 d일(EEE)', { locale: ko });
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
      beforeToolbar={
        <div className="flex flex-col gap-8">
          <div className="tablet:hidden"><Wordmark className="text-[48px]" /></div>
          <div className="flex flex-col font-title gap-4 desktop:gap-8">
            <span className="m-0 text-3xl desktop:text-4xl font-semibold text-theme-text-primary">{today}</span>
            <h1 className="flex gap-4 items-center m-0">
              <span className="text-4xl desktop:text-6xl font-bold text-theme-text-primary">{GREETING_TEXT.title}</span>
              <Image src={EMOTIONS[6].src} alt="greeting emotion icon" className="h-12 mb-1 w-auto rotate-[10deg]" />
            </h1>
            <div className="m-0 text-xl desktop:text-2xl desktop:mb-4 leading-relaxed text-theme-text-secondary">
              <p>{GREETING_TEXT.sub[0]}</p>
              <p>{GREETING_TEXT.sub[1]}</p>
            </div>
          </div>
          <div className="mb-4 desktop:hidden">
            <TodayRecordSection initialDate={initialDate} />
          </div>
        </div>
      }
      showScrollToTop
      topButton={
        <>
          <TopButton onClick={openYearFilter}>
            <MdCalendarMonth size={18} className="shrink-0" aria-hidden="true" />
            {selectedYear}년
          </TopButton>
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
