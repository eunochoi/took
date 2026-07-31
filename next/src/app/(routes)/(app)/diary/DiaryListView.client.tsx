'use client';

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

import EmotionFilter from "@/app/(routes)/(app)/diary/_components/EmotionFilter";
import MonthFilter from "@/app/(routes)/(app)/diary/_components/MonthFilter";
import { getDiaryList } from "@/common/actions/diary";
import { authAction } from "@/common/auth/authAction";
import AppPageLayout from "@/common/components/layout/AppPageLayout";
import ScrollToTopButton from "@/common/components/ui/ScrollToTopButton";
import TopButton from "@/common/components/ui/TopButtons/TopButton";
import { EMOTIONS } from "@/common/constants/emotions";
import { DIARY_LIST_PAGE_SIZE } from "@/common/constants/diary";
import { EMOTION_UNSELECTED, getDefaultYear, MONTH_UNSELECTED } from "@/common/constants/filterDefaults";
import { useCurrentUser } from "@/common/hooks/useCurrentUser";
import { useModalParam } from "@/common/hooks/useModalParam";
import { useSortToggle } from "@/common/hooks/useSortToggle";
import { usePrefetchPage } from "@/common/hooks/usePrefetchPage";
import { MdCalendarMonth, MdEmojiEmotions } from 'react-icons/md';
import { DiaryList } from "./_components/DiaryList";
import { useDiaryListFilter } from "./_hooks/useDiaryListFilter";
import type { DiaryData } from "@/common/types/diary";

const DiaryListView = () => {
  usePrefetchPage();

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const { data: user } = useCurrentUser();
  const currentUserEmail = user?.email ?? '';
  const { ref: inViewRef, inView } = useInView({ threshold: 0, delay: 0 });

  const { isOpen: isEmotionFilterOpen, open: openEmotionFilter, close: closeEmotionFilter } = useModalParam('emotion-filter');
  const { isOpen: isMonthFilterOpen, open: openMonthFilter, close: closeMonthFilter } = useModalParam('month-filter');
  const { selectedYear, selectedMonth, emotionToggle, setSelectedYear, setSelectedMonth, setEmotionToggle } = useDiaryListFilter();
  const { sortValue, onToggle } = useSortToggle({ sortKey: 'diary' });
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

  useEffect(() => {
    if (currentUserEmail && !isFetching && hasNextPage && inView) fetchNextPage();
  }, [inView, hasNextPage, isFetching, currentUserEmail, fetchNextPage])

  useEffect(() => {
    wrapperRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [sortValue]);

  return (
    <AppPageLayout
      pageRef={wrapperRef}
      topButtons={<>
        <TopButton
          size="auto"
          onClick={() => { openEmotionFilter(); }}
        >
          {isEmotionSelected ? <span>{selectedEmotionLabel}</span> : <MdEmojiEmotions />}
        </TopButton>
        <TopButton
          size="auto"
          onClick={openMonthFilter}
        >
          {isPeriodSelected ? <span>{selectedPeriodLabel}</span> : <MdCalendarMonth />}
        </TopButton>
        <TopButton
          size="default"
          onClick={onToggle}
        >
          <span>{sortValue === 'DESC' ? '최신순' : '과거순'}</span>
        </TopButton>
      </>}
      afterContent={<ScrollToTopButton contentRef={wrapperRef} />}>
      <EmotionFilter
        contentRef={wrapperRef}
        isOpen={isEmotionFilterOpen}
        onClose={closeEmotionFilter}
        setEmotionToggle={setEmotionToggle}
      />
      <MonthFilter
        contentRef={wrapperRef}
        isOpen={isMonthFilterOpen}
        onClose={closeMonthFilter}
        setSelectedYear={setSelectedYear}
        setSelectedMonth={setSelectedMonth}
      />
      {flatDiaries && <DiaryList diaries={flatDiaries} />}
      <div ref={inViewRef} className="h-[50px] w-full shrink-0" />
    </AppPageLayout>
  );
}

export default DiaryListView;
