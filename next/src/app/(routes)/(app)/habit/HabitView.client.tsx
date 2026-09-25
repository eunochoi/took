'use client';

import HabitViewContent from "./_components/HabitViewContent";
import HabitViewToolbar from "./_components/HabitViewToolbar";
import HabitViewTopSection from "./_components/HabitViewTopSection";

import { getHabitList } from "@/common/actions/habit";
import { authAction } from "@/common/auth/authAction";
import AppPageLayout from "@/common/components/layout/AppPageLayout";
import { MAX_HABIT_COUNT } from "@/common/constants/habit";
import { usePrefetchPage } from "@/common/hooks/usePrefetchPage";
import { useSortToggle } from "@/common/hooks/useSortToggle";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useRef } from "react";
import { useCustomHabitOrder } from "./_hooks/useCustomHabitOrder";
import { useTodayHabitRate } from "./_hooks/useTodayHabitRate";

const HabitView = () => {
  usePrefetchPage();
  const router = useRouter();
  const pageRef = useRef<HTMLDivElement | null>(null);
  const { todayDoneHabitCount, todayDoneHabitRate } = useTodayHabitRate();
  const { sortValue, onToggle } = useSortToggle({ sortKey: 'habit' });
  const { customHabitOrder, isStorageReady } = useCustomHabitOrder();

  useEffect(() => {
    pageRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [sortValue]);

  const { data: habits } = useQuery({
    queryKey: ['habits', 'list', sortValue, customHabitOrder],
    queryFn: () => authAction(() => getHabitList({ sortType: sortValue, customHabitOrder })),
    enabled: isStorageReady,
  });

  const totalHabitCount = habits?.length ? habits?.length : 0;

  const onAddHabit = () => {
    if (habits && habits.length >= MAX_HABIT_COUNT) {
      enqueueSnackbar(`습관은 최대 ${MAX_HABIT_COUNT}개 생성 가능합니다.`);
    }
    else {
      router.push('/inter/input/addHabit', { scroll: false });
    }
  };

  return (
    <AppPageLayout
      showScrollToTop
      appPageTopSection={<HabitViewTopSection />}
      mainSectionClassName="flex-1 bg-theme-surface px-[4dvw] py-2 tablet:px-9 tablet:py-4 desktop:px-14 desktop:py-8"
      pageRef={pageRef}
      toolbar={
        <HabitViewToolbar
          onToggle={onToggle}
          onAddHabit={onAddHabit}
          sortValue={sortValue}
        />
      }
      appPageMainSection={
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

export default HabitView;
