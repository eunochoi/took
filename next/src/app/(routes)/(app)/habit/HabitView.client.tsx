'use client';

import { getHabitList } from "@/common/actions/habit";
import { authAction } from "@/common/auth/authAction";
import AppPageLayout, { APP_PAGE_CONTENT_PADDING_CLASS_NAME } from "@/common/components/layout/AppPageLayout";
import AppPageTitle from "@/common/components/layout/AppPageTitle";
import { AppStatCard } from "@/common/components/ui/AppSection/stat";
import EmptyStateCard from "@/common/components/ui/EmptyStateCard";
import ToolbarButton from "@/common/components/ui/ToolbarButton";
import { MAX_HABIT_COUNT } from "@/common/constants/habit";
import { usePrefetchPage } from "@/common/hooks/usePrefetchPage";
import { useSortToggle } from "@/common/hooks/useSortToggle";
import type { HabitSort } from "@/common/types/sort";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useRef } from "react";
import { MdAdd, MdChecklist, MdSort } from 'react-icons/md';
import HabitBox from "./_components/HabitBox";
import HabitTodayProgress from "./_components/HabitTodayProgress";
import { useCustomHabitOrder } from "./_hooks/useCustomHabitOrder";
import { useTodayHabitRate } from "./_hooks/useTodayHabitRate";

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
      contentWrapperClassName={APP_PAGE_CONTENT_PADDING_CLASS_NAME}
      appPageTopArea={<AppPageTitle title="습관 만들기" description="작은 실천으로 만들어가는 나의 일상" />}
      pageRef={pageRef}
      showScrollToTop
      toolbar={
        <>
          <ToolbarButton onClick={onToggle}>
            <MdSort size={18} className="shrink-0" aria-hidden="true" />
            {HABIT_SORT_LABELS[sortValue]}
          </ToolbarButton>
          <ToolbarButton aria-label="습관 추가" onClick={onAddHabit} title="습관 추가">
            <MdAdd className="text-xl" aria-hidden="true" />
          </ToolbarButton>
        </>
      }>
      <div className="w-full desktop:grid desktop:grid-cols-[minmax(0,11fr)_minmax(0,9fr)] desktop:grid-rows-[auto_1fr] desktop:items-start desktop:gap-x-8 desktop:gap-y-0">
        <div className="flex flex-col mb-4 gap-4 desktop:col-start-2 desktop:row-start-2">
          {totalHabitCount > 0 && <AppStatCard className="flex flex-col items-center justify-between !p-4 !h-auto !min-h-0">
            <HabitTodayProgress
              completedCount={todayDoneHabitCount}
              rate={todayDoneHabitRate}
              totalCount={totalHabitCount}
            />
          </AppStatCard>}
        </div>

        <section className="mt-0 flex min-w-0 flex-col desktop:col-start-1 desktop:row-start-2">
          <div className="grid h-auto w-full shrink-0 grid-cols-2 grid-rows-[auto] gap-3">
            {habits?.length === 0 ? (
              <EmptyStateCard
                className="col-span-2"
                description="작은 목표 하나부터 만들고, 매일의 변화를 쌓아보세요."
                icon={<MdChecklist aria-hidden="true" />}
                title="아직 만든 습관이 없어요."
              />
            ) : habits?.map((habit) => <HabitBox key={habit.id} id={habit.id} name={habit.name} priority={habit.priority} iconKey={habit.iconKey} />)}
          </div>
        </section>
      </div >

    </AppPageLayout >
  );
}

export default HabitView;
