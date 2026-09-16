'use client';

import { getHabitList } from "@/common/actions/habit";
import { authAction } from "@/common/auth/authAction";
import AppPageLayout from "@/common/components/layout/AppPageLayout";
import TopButton from "@/common/components/ui/TopButton";
import { MAX_HABIT_COUNT } from "@/common/constants/habit";
import { usePrefetchPage } from "@/common/hooks/usePrefetchPage";
import { useSortToggle } from "@/common/hooks/useSortToggle";
import type { HabitSort } from "@/common/types/sort";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useRef } from "react";
import { MdAdd } from 'react-icons/md';
import HabitBox from "./_components/HabitBox";
import HabitOverviewCard from "./_components/HabitOverviewCard";
import { useCustomHabitOrder } from "./_hooks/useCustomHabitOrder";
import { useTodayHabitRate } from "./_hooks/useTodayHabitRate";

interface Habit {
  id: number;
  name: string;
  priority: number;
}

const HABIT_SORT_LABELS: Record<HabitSort, string> = {
  ASC: '과거순',
  DESC: '최신순',
  PRIORITY: '중요도',
  CUSTOM: '커스텀'
}

const HabitView = () => {
  usePrefetchPage();
  const router = useRouter();
  const pageRef = useRef<HTMLDivElement | null>(null);
  const { todayDoneHabitCount, todayDoneHabitRate } = useTodayHabitRate();
  const { sortValue, onToggle } = useSortToggle({ sortKey: 'habit' });
  const { customHabitOrder } = useCustomHabitOrder();

  useEffect(() => {
    pageRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [sortValue]);

  const { data: habits } = useQuery({
    queryKey: ['habits', 'list', sortValue],
    queryFn: () => authAction(() => getHabitList({ sortType: sortValue, customHabitOrder })),
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
      title="습관"
      description="작은 실천으로 만들어가는 나의 일상"
      pageRef={pageRef}
      showScrollToTop
      topButton={
        <>
          <TopButton onClick={onToggle}>
            {HABIT_SORT_LABELS[sortValue]}
          </TopButton>
          <TopButton aria-label="습관 추가" onClick={onAddHabit} title="습관 추가">
            <MdAdd className="text-xl" aria-hidden="true" />
          </TopButton>
        </>
      }>
      <div className="w-full desktop:grid desktop:grid-cols-[minmax(0,11fr)_minmax(0,9fr)] desktop:grid-rows-[auto_1fr] desktop:items-start desktop:gap-x-8 desktop:gap-y-0">
        <div className="mb-4 desktop:hidden">
          <HabitOverviewCard
            completedCount={todayDoneHabitCount}
            habitCount={totalHabitCount}
            maxHabitCount={MAX_HABIT_COUNT}
            rate={todayDoneHabitRate}
          />
        </div>

        <section className="mt-0 flex min-w-0 flex-col desktop:col-start-1 desktop:row-start-2">
          <div className="grid h-auto w-full shrink-0 grid-cols-2 grid-rows-[auto] gap-3">
            {habits?.map((habit: Habit) => <HabitBox key={habit.id} id={habit.id} name={habit.name} priority={habit.priority} />)}
            {(habits?.length ?? 0) < MAX_HABIT_COUNT && (
              <button
                className="flex aspect-[0.8] w-full shrink-0 items-center justify-center rounded-theme bg-theme-surface text-5xl text-theme-accent shadow-[0_1px_8px_rgb(var(--theme-shadow-color)/0.04)]"
                onClick={onAddHabit}
                type="button"
              >
                <MdAdd />
              </button>
            )}
          </div>
        </section>

        <aside className="hidden w-full flex-col gap-3 desktop:col-start-2 desktop:row-start-2 desktop:flex desktop:sticky desktop:top-[calc(var(--page-toolbar-height,68px)+24px)] desktop:self-start">
          <HabitOverviewCard
            completedCount={todayDoneHabitCount}
            habitCount={totalHabitCount}
            maxHabitCount={MAX_HABIT_COUNT}
            rate={todayDoneHabitRate}
          />
        </aside>

      </div>
    </AppPageLayout >
  );
}

export default HabitView;
