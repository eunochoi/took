'use client';

import HabitViewContent from "./_components/HabitViewContent";
import HabitViewToolbar from "./_components/HabitViewToolbar";
import HabitViewTopSection from "./_components/HabitViewTopSection";

import { getHabitList } from "@/common/actions/habit";
import { authAction } from "@/common/auth/authAction";
import AppPageLayout from "@/common/components/layout/AppPageLayout";
import { MAX_HABIT_COUNT } from "@/common/constants/habit";
import { usePrefetchPage } from "@/common/hooks/usePrefetchPage";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
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
    queryKey: ['habits', 'list', sortValue, priorityFirst, customHabitOrder],
    queryFn: () => authAction(() => getHabitList({ sortType: sortValue, priorityFirst, customHabitOrder })),
    enabled: isStorageReady,
    placeholderData: keepPreviousData,
  });

  const totalHabitCount = habits?.length ? habits?.length : 0;

  const onAddHabit = () => {
    if (habits && habits.length >= MAX_HABIT_COUNT) {
      enqueueSnackbar(`습관은 최대 ${MAX_HABIT_COUNT}개 생성 가능합니다.`);
    }
    else {
      router.push('/habit/new', { scroll: false });
    }
  };

  return (
    <AppPageLayout
      showScrollToTop
      topSection={<HabitViewTopSection />}

      pageRef={pageRef}
      toolbar={
        <HabitViewToolbar
          onToggle={onToggleSort}
          onTogglePriorityFirst={onTogglePriorityFirst}
          onAddHabit={onAddHabit}
          sortValue={sortValue}
          priorityFirst={priorityFirst}
        />
      }
      mainSection={
        <HabitViewContent
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
