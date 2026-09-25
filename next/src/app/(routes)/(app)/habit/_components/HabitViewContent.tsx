'use client';

import type { HabitData } from "@/common/actions/habit/types";
import EmptyStateCard from "@/common/components/ui/EmptyStateCard";
import { cn } from "@/common/utils/cn";
import { MdChecklist } from 'react-icons/md';
import HabitBox from "./HabitBox";
import HabitTodayProgress from "./HabitTodayProgress";

interface Props {
  habits?: HabitData[];
  totalHabitCount: number;
  todayDoneHabitCount: number;
  todayDoneHabitRate: number | string;
}

const HabitViewContent = ({ habits, totalHabitCount, todayDoneHabitCount, todayDoneHabitRate }: Props) => {
  return (
    <div className="w-full desktop:grid desktop:grid-cols-[minmax(0,11fr)_minmax(0,9fr)] desktop:items-start desktop:gap-x-8">
      {totalHabitCount > 0 && (
        <aside className="mb-8 desktop:sticky desktop:top-[calc(var(--page-toolbar-height,68px)+24px)] desktop:col-start-2 desktop:row-start-1 desktop:mb-0 desktop:border-b-0 desktop:border-l desktop:pb-0 desktop:pl-8">
          <HabitTodayProgress
            completedCount={todayDoneHabitCount}
            rate={todayDoneHabitRate}
            totalCount={totalHabitCount}
          />
        </aside>
      )}

      <section className={cn("flex min-w-0 flex-col desktop:col-start-1 desktop:row-start-1", totalHabitCount === 0 && "desktop:col-span-2")}>
        <div className={cn("grid w-full min-w-0 grid-cols-2", !!habits?.length && "gap-px bg-theme-border/60")}>
          {habits?.length === 0 ? (
            <EmptyStateCard
              className="col-span-2 !rounded-none !bg-transparent !shadow-none"
              description="작은 목표 하나부터 만들고, 매일의 변화를 쌓아보세요."
              icon={<MdChecklist aria-hidden="true" />}
              title="아직 만든 습관이 없어요."
            />
          ) : habits?.map((habit) => (
            <div key={habit.id} className="min-w-0 bg-theme-surface">
              <HabitBox id={habit.id} name={habit.name} priority={habit.priority} iconKey={habit.iconKey} />
            </div>
          ))}
          {!!habits?.length && habits.length % 2 === 1 && <div className="bg-theme-surface" aria-hidden="true" />}
        </div>
      </section>
    </div>
  );
};

export default HabitViewContent;
