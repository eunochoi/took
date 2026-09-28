'use client';

import HabitPageContent from "./_components/HabitPageContent";
import HabitPageToolbar from "./_components/HabitPageToolbar";
import HabitPageTopSection from "./_components/HabitPageTopSection";

import { getHabitList } from "@/common/actions/habit";
import { authAction } from "@/common/auth/authAction";
import AppPageLayout from "@/common/components/layout/AppPageLayout";
import { MAX_HABIT_COUNT } from "@/common/constants/habit";
import { usePrefetchPage } from "@/common/hooks/usePrefetchPage";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { showNotice } from '@/common/components/ui/Notice/notice';
import { useEffect, useRef } from "react";
import { useHabitSortPreferences } from "./_hooks/useHabitSortPreferences";
import { useTodayHabitRate } from "./_hooks/useTodayHabitRate";

const HabitClientPage = () => {
  usePrefetchPage();
  const router = useRouter();
  const pageRef = useRef<HTMLDivElement | null>(null);
  const { todayDoneHabitCount, todayDoneHabitRate } = useTodayHabitRate();
  const { sortValue, priorityFirst, onToggleSort, onTogglePriorityFirst, customHabitOrder, isStorageReady } = useHabitSortPreferences();

  useEffect(() => {
    pageRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [sortValue, priorityFirst]);

  const { data: habits } = useQuery({
    queryKey: ['habits', 'list', sortValue, priorityFirst, sortValue === 'CUSTOM' ? customHabitOrder : []],
    queryFn: () => authAction(() => getHabitList({
      sortType: sortValue,
      priorityFirst,
      customHabitOrder: sortValue === 'CUSTOM' ? customHabitOrder : [],
    })),
    enabled: isStorageReady,
    placeholderData: keepPreviousData,
  });

  const totalHabitCount = habits?.length ? habits?.length : 0;

  const onAddHabit = () => {
    if (habits && habits.length >= MAX_HABIT_COUNT) {
      showNotice(`습관은 최대 ${MAX_HABIT_COUNT}개 생성 가능합니다.`);
    }
    else {
      router.push('/habit/new', { scroll: false });
    }
  };

  return (
    <AppPageLayout
      showScrollToTop
      topSection={<HabitPageTopSection />}

      pageRef={pageRef}
      toolbar={
        <HabitPageToolbar
          onToggle={onToggleSort}
          onTogglePriorityFirst={onTogglePriorityFirst}
          onAddHabit={onAddHabit}
          sortValue={sortValue}
          priorityFirst={priorityFirst}
        />
      }
      mainSection={
        <HabitPageContent
          habits={habits}
          totalHabitCount={totalHabitCount}
          todayDoneHabitCount={todayDoneHabitCount}
          todayDoneHabitRate={todayDoneHabitRate}
        />
      }
    />
  );
}

export default HabitClientPage;
