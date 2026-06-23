'use client';

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

import EmotionFilter from "@/app/(routes)/(app)/list/_components/EmotionFilter";
import MonthFilter from "@/app/(routes)/(app)/list/_components/MonthFilter";
import AppPage from "@/common/components/layout/AppPage";
import ScrollToTopButton from "@/common/components/ui/ScrollToTopButton";
import { authAction } from "@/common/auth/authAction";
import { getDiaryList } from "@/common/actions/diary";
import TopButton from "@/common/components/ui/TopButtons/TopButton";
import { EMOTIONS } from "@/common/constants/emotions";
import { EMOTION_UNSELECTED, getDefaultYear, MONTH_UNSELECTED } from "@/common/constants/filterDefaults";
import { useCurrentUser } from "@/common/hooks/useCurrentUser";
import { useModalParam } from "@/common/hooks/useModalParam";
import { usePrefetchPage } from "@/common/hooks/usePrefetchPage";
import { MdCalendarMonth, MdEmojiEmotions } from 'react-icons/md';
import { Diaries } from "./_components/Diaries";
import { useFilter } from "./_hooks/useFilter";
import { useListToggle } from "./_hooks/useListToggle";
import { diaryData } from "./_types/diaryData";

const DIDARY_FETCH_LIMIT = 10;

const ListView = () => {
  usePrefetchPage();

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const { data: user } = useCurrentUser();
  const currentUserEmail = user?.email ?? '';
  const { ref: inViewRef, inView } = useInView({ threshold: 0, delay: 0 });

  const { isOpen: isEmotionFilterOpen, open: openEmotionFilter, close: closeEmotionFilter } = useModalParam('emotion-filter');
  const { isOpen: isMonthFilterOpen, open: openMonthFilter, close: closeMonthFilter } = useModalParam('month-filter');
  const { selectedYear, selectedMonth, emotionToggle, setSelectedYear, setSelectedMonth, setEmotionToggle } = useFilter();
  const { toggleValue, sortOrderChange } = useListToggle({ ref: wrapperRef });
  const isEmotionSelected = emotionToggle !== EMOTION_UNSELECTED;
  const isPeriodSelected = selectedYear !== getDefaultYear() || selectedMonth !== MONTH_UNSELECTED;
  const selectedEmotionLabel = EMOTIONS[emotionToggle]?.nameKr ?? '';
  const selectedPeriodLabel = selectedMonth === MONTH_UNSELECTED ? `${selectedYear}년` : `${selectedYear}년 ${selectedMonth}월`;

  const { data: flatDiaries, fetchNextPage, isFetching, hasNextPage } = useInfiniteQuery({
    queryKey: ['diary', 'list', 'emotion', emotionToggle, 'sort', toggleValue, 'year', selectedYear, 'month', selectedMonth],
    queryFn: ({ pageParam }) => authAction(() => {
      return getDiaryList({
        sort: toggleValue,
        search: emotionToggle,
        pageParam,
        limit: DIDARY_FETCH_LIMIT,
        selectedYear: selectedYear,
        selectedMonth: selectedMonth
      });
    }),
    initialPageParam: 0,
    select: (data) => data.pages.flat() as diaryData[],
    getNextPageParam: (lastPage, allPages) => (lastPage?.length === 0 ? undefined : allPages?.length),
  });

  useEffect(() => {
    if (currentUserEmail && !isFetching && hasNextPage && inView) fetchNextPage();
  }, [inView, hasNextPage, isFetching, currentUserEmail, fetchNextPage])

  return (
    <AppPage
      contentVariant="list"
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
          onClick={sortOrderChange}
        >
          <span>{toggleValue === 'DESC' ? 'New' : 'Old'}</span>
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
        {flatDiaries && <Diaries diaries={flatDiaries} />}
        <div ref={inViewRef} className="h-[50px] w-full shrink-0" />
    </AppPage>
  );
}

export default ListView;
