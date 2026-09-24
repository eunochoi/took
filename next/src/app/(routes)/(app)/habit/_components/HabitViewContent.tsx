'use client';

import type { HabitData } from "@/common/actions/habit/types";
import { AppStatCard } from "@/common/components/ui/AppSection/stat";
import EmptyStateCard from "@/common/components/ui/EmptyStateCard";
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
  );
};

export default HabitViewContent;
