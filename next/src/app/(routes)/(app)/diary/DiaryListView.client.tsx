'use client';

import DiaryListViewContent from "./_components/DiaryListViewContent";
import DiaryListViewToolbar from "./_components/DiaryListViewToolbar";

import { AnimatePresence } from "framer-motion";

import { useInfiniteQuery } from "@tanstack/react-query";
import Image from 'next/image';
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

import bottomCat from '/public/img/bottom-cat.png';

import EmotionFilter from "@/app/(routes)/(app)/diary/_components/EmotionFilter";
import MonthFilter from "@/app/(routes)/(app)/diary/_components/MonthFilter";
import { getDiaryList } from "@/common/actions/diary";
import { authAction } from "@/common/auth/authAction";
import AppPageLayout, { APP_PAGE_CONTENT_PADDING_CLASS_NAME } from "@/common/components/layout/AppPageLayout";
import AppPageTitle from "@/common/components/layout/AppPageTitle";
import { DIARY_LIST_PAGE_SIZE } from "@/common/constants/diary";
import { EMOTIONS } from "@/common/constants/emotions";
import { EMOTION_UNSELECTED, getDefaultYear, MONTH_UNSELECTED } from "@/common/constants/filterDefaults";
import { useCurrentUser } from "@/common/hooks/useCurrentUser";
import { useModalParam } from "@/common/hooks/useModalParam";
import { usePrefetchPage } from "@/common/hooks/usePrefetchPage";
import { useSortToggle } from "@/common/hooks/useSortToggle";
import type { DiaryData } from "@/common/types/diary";
import { useDiaryListFilter } from "./_hooks/useDiaryListFilter";

const DiaryListView = () => {
  usePrefetchPage();

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const { data: user } = useCurrentUser();
  const currentUserEmail = user?.email ?? '';
  const { ref: inViewRef, inView } = useInView({ root: wrapperRef.current, threshold: 0, delay: 0 });

  const { isOpen: isEmotionFilterOpen, open: openEmotionFilter, close: closeEmotionFilter } = useModalParam('emotion-filter');
  const { isOpen: isMonthFilterOpen, open: openMonthFilter, close: closeMonthFilter } = useModalParam('month-filter');
  const { selectedYear, selectedMonth, emotionToggle, setSelectedYear, setSelectedMonth, setEmotionToggle } = useDiaryListFilter();
  const { sortValue, onToggle } = useSortToggle({ sortKey: 'diary' });
  const [statsYear, setStatsYear] = useState(new Date().getFullYear());
  const isEmotionSelected = emotionToggle !== EMOTION_UNSELECTED;
  const isPeriodSelected = selectedYear !== getDefaultYear() || selectedMonth !== MONTH_UNSELECTED;
  const selectedEmotionLabel = EMOTIONS[emotionToggle]?.nameKr ?? '';
  const selectedPeriodLabel = selectedMonth === MONTH_UNSELECTED ? `${selectedYear}년` : `${selectedYear}년 ${selectedMonth}월`;

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
        appPageTopArea={
          <div className={`bg-theme-accent-light ${APP_PAGE_CONTENT_PADDING_CLASS_NAME}`}>
            <AppPageTitle title="일기 목록" description="차곡차곡 쌓이는 나의 하루" />
            <Image src={bottomCat} alt="bottom-cat" className="ml-auto mt-auto block w-full tablet:w-2/3 desktop:w-2/3" />
          </div>
        }
        mainAreaClassName="flex-1 bg-theme-surface px-[4dvw] py-2 tablet:px-9 tablet:py-4 desktop:px-14 desktop:py-8"
        pageRef={wrapperRef}
        showScrollToTop
        toolbar={
          <DiaryListViewToolbar
            openMonthFilter={openMonthFilter}
            isPeriodSelected={isPeriodSelected}
            selectedPeriodLabel={selectedPeriodLabel}
            onToggle={onToggle}
            sortValue={sortValue}
            openEmotionFilter={openEmotionFilter}
            isEmotionSelected={isEmotionSelected}
            selectedEmotionLabel={selectedEmotionLabel}
          />
        }
        appPageMainArea={
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
        {isEmotionFilterOpen && (
          <EmotionFilter
            key="emotion-filter"
            contentRef={wrapperRef}
            onClose={closeEmotionFilter}
            setEmotionToggle={setEmotionToggle}
          />
        )}
        {isMonthFilterOpen && (
          <MonthFilter
            key="month-filter"
            contentRef={wrapperRef}
            onClose={closeMonthFilter}
            setSelectedYear={setSelectedYear}
            setSelectedMonth={setSelectedMonth}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default DiaryListView;
