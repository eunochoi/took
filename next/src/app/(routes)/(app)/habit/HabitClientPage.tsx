'use client';

import HabitPageContent from "./_components/HabitPageContent";
import HabitPageSkeleton from "./_components/HabitPageSkeleton";
import HabitPageToolbar from "./_components/HabitPageToolbar";
import HabitPageTopSection from "./_components/HabitPageTopSection";

import { authAction } from "@/common/auth/authAction";
import AppPageLayout from "@/common/components/layout/AppPageLayout";
import { MAX_HABIT_COUNT } from "@/common/constants/habit";
import { getTodayString } from "@/common/functions/getTodayString";
import { usePrefetchPage } from "@/common/hooks/usePrefetchPage";
import { habitQueries } from "@/common/queries/habitQueries";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { showNotice } from '@/common/components/ui/Notice/notice';
import { useEffect, useRef, useState } from "react";
import { useHabitSortPreferences } from "./_hooks/useHabitSortPreferences";
import { useTodayHabitRate } from "./_hooks/useTodayHabitRate";

const HabitClientPage = ({ todayString }: { todayString: string }) => {
  usePrefetchPage();
  const [activeDate, setActiveDate] = useState(todayString);
  const router = useRouter();
  const pageRef = useRef<HTMLDivElement | null>(null);
  const { todayDoneHabitCount, todayDoneHabitRate } = useTodayHabitRate();
  const { sortValue, priorityFirst, onToggleSort, onTogglePriorityFirst, customHabitOrder, isStorageReady } = useHabitSortPreferences();

  useEffect(() => {
    const updateDate = () => setActiveDate(getTodayString());
    updateDate();
    const interval = window.setInterval(updateDate, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    pageRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [sortValue, priorityFirst]);

  const { data: habits, isError: isHabitsError, refetch: refetchHabits } = useQuery({
    ...habitQueries.page({ sortType: sortValue, priorityFirst, customHabitOrder }, activeDate, authAction),
    enabled: isStorageReady,
    placeholderData: (previousData, previousQuery) => previousQuery?.queryKey[2] === activeDate ? previousData : undefined,
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
          disabledAdd={!habits}
        />
      }
      mainSection={habits === undefined && !isHabitsError ? (
        <HabitPageSkeleton />
      ) : habits === undefined ? (
        <div className="flex min-h-64 w-full flex-col items-center justify-center gap-3 text-center text-theme-text-secondary">
          <span>습관 목록을 불러오지 못했어요.</span>
          <button type="button" className="text-theme-accent" onClick={() => { void refetchHabits(); }}>다시 시도</button>
        </div>
      ) : (
        <HabitPageContent
          habits={habits}
          todayString={activeDate}
          totalHabitCount={totalHabitCount}
          todayDoneHabitCount={todayDoneHabitCount}
          todayDoneHabitRate={todayDoneHabitRate}
        />
      )}
    />
  );
}

export default HabitClientPage;
