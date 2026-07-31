'use client';

import { getHabitList } from "@/common/actions/habit";
import { authAction } from "@/common/auth/authAction";
import AppPageLayout from "@/common/components/layout/AppPageLayout";
import PageTitle from "@/common/components/ui/PageTitle";
import TopButton from "@/common/components/ui/TopButtons/TopButton";
import { usePrefetchPage } from "@/common/hooks/usePrefetchPage";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { enqueueSnackbar } from "notistack";
import { MdAdd } from 'react-icons/md';
import HabitBox from "./_components/HabitBox";
import { useCustomHabitOrder } from "./_hooks/useCustomHabitOrder";
import { useSortToggle } from "@/common/hooks/useSortToggle";
import type { HabitSort } from "@/common/types/sort";
import { useTodayHabitRate } from "./_hooks/useTodayHabitRate";

interface Habit {
  id: number;
  name: string;
  priority: number;
}

const MAX_HABIT_COUNT = 18;

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
      pageRef={pageRef}
      topButtons={
        <TopButton onClick={onToggle} size='default' >
          <span>{HABIT_SORT_LABELS[sortValue]}</span>
        </TopButton>
      }>
      <PageTitle
        title={`오늘 목표 ${todayDoneHabitRate}% 달성!`}
        description={`오늘 목표 습관 ${totalHabitCount}개 중 ${todayDoneHabitCount}개를 완료했어요. :)`}
        className="mb-7"
      />

      <div className="grid h-auto w-full shrink-0 grid-cols-2 grid-rows-[auto] gap-3 pb-2 min-[480px]:max-[1023px]:grid-cols-3 min-[1024px]:grid-cols-3">
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
    </AppPageLayout >
  );
}

export default HabitView;
