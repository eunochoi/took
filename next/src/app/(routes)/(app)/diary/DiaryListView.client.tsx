'use client';

import DiaryListViewToolbar from "./_components/DiaryListViewToolbar";

import { AnimatePresence } from "framer-motion";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

import EmotionFilter from "@/app/(routes)/(app)/diary/_components/EmotionFilter";
import MonthFilter from "@/app/(routes)/(app)/diary/_components/MonthFilter";
import { getDiaryList } from "@/common/actions/diary";
import { authAction } from "@/common/auth/authAction";
import AppPageLayout, { APP_PAGE_CONTENT_PADDING_CLASS_NAME } from "@/common/components/layout/AppPageLayout";
import AppPageTitle from "@/common/components/layout/AppPageTitle";
import EmptyStateCard from "@/common/components/ui/EmptyStateCard";
import { DIARY_LIST_PAGE_SIZE } from "@/common/constants/diary";
import { EMOTIONS } from "@/common/constants/emotions";
import { EMOTION_UNSELECTED, getDefaultYear, MONTH_UNSELECTED } from "@/common/constants/filterDefaults";
import { useCurrentUser } from "@/common/hooks/useCurrentUser";
import { useModalParam } from "@/common/hooks/useModalParam";
import { usePrefetchPage } from "@/common/hooks/usePrefetchPage";
import { useSortToggle } from "@/common/hooks/useSortToggle";
import type { DiaryData } from "@/common/types/diary";
import { MdMenuBook } from 'react-icons/md';
import DiaryCard from "./_components/DiaryCard";
import DiaryStatsPanel from "./_components/DiaryStatsPanel";
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
        contentWrapperClassName={APP_PAGE_CONTENT_PADDING_CLASS_NAME}
        appPageTopArea={<AppPageTitle title="일기 목록" description="차곡차곡 쌓이는 나의 하루" />}
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
      >
        <div className="grid flex-1 w-full gap-6 desktop:grid-cols-[minmax(0,11fr)_minmax(0,9fr)] desktop:items-start desktop:gap-x-8">
          <div className="flex min-w-0 flex-col gap-4">
            <div className="flex w-full min-w-0 flex-col gap-4 desktop:self-start">
              {isDiaryListEmpty ? (
                <EmptyStateCard
                  description={hasAppliedFilter ? '필터를 바꾸거나 새로운 일기를 작성해 보세요.' : '오늘의 감정과 생각을 첫 번째 일기로 남겨보세요.'}
                  icon={<MdMenuBook aria-hidden="true" />}
                  title={hasAppliedFilter ? '선택한 조건의 일기가 없어요.' : '아직 작성한 일기가 없어요.'}
                />
              ) : flatDiaries?.map((diary) => (
                <div key={diary.id} className="flex w-full items-center justify-center">
                  <DiaryCard diaryData={diary} />
                </div>
              ))}
              <div ref={inViewRef} className="h-[50px] w-full shrink-0" />
            </div>
          </div>
          <DiaryStatsPanel
            year={statsYear}
            onChangeYear={setStatsYear}
            className="desktop:col-start-2"
          />
        </div>
      </AppPageLayout>
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
