'use client';

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";

import EmotionFilter from "@/app/(routes)/(app)/list/_components/EmotionFilter";
import MonthFilter from "@/app/(routes)/(app)/list/_components/MonthFilter";
import AppPage from "@/common/components/layout/AppPage";
import ScrollToTopButton from "@/common/components/ui/ScrollToTopButton";
import { authAction } from "@/common/auth/authAction";
import { getDiaryList } from "@/common/actions/diary";
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
        <button
          className='small'
          onClick={() => { openEmotionFilter(); }}
        >
          <MdEmojiEmotions />
        </button>
        <button
          className='small'
          onClick={openMonthFilter}
        >
          <MdCalendarMonth />
        </button>
        <button
          className='normal'
          onClick={sortOrderChange}
        >
          <span>{toggleValue === 'DESC' ? 'New' : 'Old'}</span>
        </button>
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
        <Observer ref={inViewRef} />
    </AppPage>
  );
}

export default ListView;

const Observer = styled.div`
  flex-shrink: 0;
  width: 100%;
  height: 50px;
`;
