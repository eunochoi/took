'use client';

import DiaryListViewContent from "./_components/DiaryListViewContent";
import DiaryListViewToolbar from "./_components/DiaryListViewToolbar";
import DiaryListViewTopSection from "./_components/DiaryListViewTopSection";

import { AnimatePresence } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";


import DiaryListPageEmotionPicker from "@/app/(routes)/(app)/diary/_components/DiaryListPageEmotionPicker";
import DiaryListPagePeriodPicker from "@/app/(routes)/(app)/diary/_components/DiaryListPagePeriodPicker";
import { getDiaryList } from "@/common/actions/diary";
import { authAction } from "@/common/auth/authAction";
import AppPageLayout from "@/common/components/layout/AppPageLayout";
import { DIARY_LIST_PAGE_SIZE } from "@/common/constants/diary";
import { EMOTIONS } from "@/common/constants/emotions";
import { EMOTION_UNSELECTED, MONTH_UNSELECTED } from "@/common/constants/filterDefaults";
import { useCurrentUser } from "@/common/hooks/useCurrentUser";
import { usePrefetchPage } from "@/common/hooks/usePrefetchPage";
import { useSortToggle } from "@/common/hooks/useSortToggle";
import type { DiaryData } from "@/common/types/diary";
import { useDiaryListFilter } from "./_hooks/useDiaryListFilter";

const DiaryClientPage = () => {
  usePrefetchPage();

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: user } = useCurrentUser();
  const currentUserEmail = user?.email ?? '';
  const { ref: inViewRef, inView } = useInView({ root: wrapperRef.current, threshold: 0, delay: 0 });

  const { selectedYear, selectedMonth, emotionToggle, setSelectedYear, setSelectedMonth, setEmotionToggle } = useDiaryListFilter();
  const [isEmotionPickerOpen, setIsEmotionPickerOpen] = useState(false);
  const [isPeriodPickerOpen, setIsPeriodPickerOpen] = useState(false);
  const { sortValue, onToggle } = useSortToggle({ sortKey: 'diary' });
  const [statsYear, setStatsYear] = useState(new Date().getFullYear());
  const isEmotionSelected = emotionToggle !== EMOTION_UNSELECTED;
  const isPeriodSelected = selectedYear !== null;
  const selectedEmotionLabel = EMOTIONS[emotionToggle]?.nameKr ?? '';
  const selectedPeriodLabel = selectedYear === null
    ? '전체 기간'
    : selectedMonth === MONTH_UNSELECTED ? `${selectedYear}년` : `${selectedYear}년 ${selectedMonth}월`;

  const handleApplyPeriod = (year: number | null, month: number) => {
    const params = new URLSearchParams(searchParams);

    if (year !== null) params.set('year', year.toString());
    else params.delete('year');
    if (year !== null && month !== MONTH_UNSELECTED) params.set('month', month.toString());
    else params.delete('month');

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
    setSelectedYear(year);
    setSelectedMonth(year === null ? MONTH_UNSELECTED : month);
    setIsPeriodPickerOpen(false);

    setTimeout(() => {
      wrapperRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, 200);
  };

  const handleApplyEmotion = (emotion: number) => {
    const params = new URLSearchParams(searchParams);

    if (emotion !== EMOTION_UNSELECTED) params.set('emotion', emotion.toString());
    else params.delete('emotion');

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
    setEmotionToggle(emotion);
    setIsEmotionPickerOpen(false);

    setTimeout(() => {
      wrapperRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, 200);
  };

  const { data: flatDiaries, fetchNextPage, isFetching, hasNextPage } = useInfiniteQuery({
    queryKey: ['diary', 'diaryList', 'emotion', emotionToggle, 'sort', sortValue, 'year', selectedYear, 'month', selectedMonth],
    queryFn: ({ pageParam }) => authAction(() => {
      return getDiaryList({
        sortType: sortValue,
        search: emotionToggle,
        pageParam,
        limit: DIARY_LIST_PAGE_SIZE,
        selectedYear: selectedYear,
        selectedMonth: selectedMonth
      });
    }),
    initialPageParam: 0,
    select: (data) => data.pages.flat() as DiaryData[],
    getNextPageParam: (lastPage, allPages) => (lastPage?.length === 0 ? undefined : allPages?.length),
  });
  const isDiaryListEmpty = flatDiaries !== undefined && flatDiaries.length === 0;
  const hasAppliedFilter = isEmotionSelected || isPeriodSelected;

  useEffect(() => {
    if (currentUserEmail && !isFetching && hasNextPage && inView) fetchNextPage();
  }, [inView, hasNextPage, isFetching, currentUserEmail, fetchNextPage])

  useEffect(() => {
    wrapperRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [sortValue]);

  return (
    <>
      <AppPageLayout
        topSection={<DiaryListViewTopSection />}

        pageRef={wrapperRef}
        showScrollToTop
        toolbar={
          <DiaryListViewToolbar
            openPeriodFilter={() => setIsPeriodPickerOpen(true)}
            isPeriodSelected={isPeriodSelected}
            selectedPeriodLabel={selectedPeriodLabel}
            onToggle={onToggle}
            sortValue={sortValue}
            openEmotionFilter={() => setIsEmotionPickerOpen(true)}
            isEmotionSelected={isEmotionSelected}
            selectedEmotionLabel={selectedEmotionLabel}
          />
        }
        mainSection={
          <DiaryListViewContent
            flatDiaries={flatDiaries}
            isDiaryListEmpty={isDiaryListEmpty}
            hasAppliedFilter={hasAppliedFilter}
            inViewRef={inViewRef}
            statsYear={statsYear}
            setStatsYear={setStatsYear}
          />
        }
      />
      <AnimatePresence>
        {isEmotionPickerOpen && (
          <DiaryListPageEmotionPicker
            key="emotion-picker"
            selectedEmotion={emotionToggle}
            onClose={() => setIsEmotionPickerOpen(false)}
            onApply={handleApplyEmotion}
          />
        )}
        {isPeriodPickerOpen && (
          <DiaryListPagePeriodPicker
            key="period-picker"
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            onClose={() => setIsPeriodPickerOpen(false)}
            onApply={handleApplyPeriod}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default DiaryClientPage;
