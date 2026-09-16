'use client';

import { cn } from "@/common/utils/cn";
import HabitProgressRing from "./HabitProgressRing";

interface Props {
  completedCount: number;
  rate: number | string;
  totalCount: number;
  className?: string;
}

const HabitPageTitle = ({ completedCount, rate, totalCount, className }: Props) => {

  return (
    <header className={cn("mb-6 tablet:mb-8 grid h-auto w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 tablet:gap-8", className)} aria-label="오늘의 습관 진행률">
      <div className="flex min-w-0 flex-col items-start justify-center">
        <p className="text-base text-theme-text-secondary tablet:text-lg">
          습관 {totalCount}개 중 {completedCount}개를 완료했어요.
        </p>
      </div>

      <HabitProgressRing
        completedCount={completedCount}
        rate={rate}
        totalCount={totalCount}
      />
    </header>
  );
};

export default HabitPageTitle;
