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
    <header className={cn("my-6 tablet:mb-8 grid h-auto w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 tablet:gap-8", className)} aria-labelledby="habit-page-title">
      <div className="flex min-w-0 flex-col items-start justify-center">
        <h1 id="habit-page-title" className="font-title text-3xl font-bold leading-[1.18] text-theme-accent tablet:text-4xl">
          오늘도
          <br />
          이어가 볼까요?
        </h1>
        <p className="mt-4 text-base text-theme-text-secondary tablet:text-lg">
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
