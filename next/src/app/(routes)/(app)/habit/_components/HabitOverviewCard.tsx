import { AppSurfaceCard } from "@/common/components/ui/AppSection/card";
import HabitTodayProgress from "./HabitTodayProgress";

interface Props {
  completedCount: number;
  habitCount: number;
  maxHabitCount: number;
  rate: number | string;
}

const HabitOverviewCard = ({ completedCount, habitCount, maxHabitCount, rate }: Props) => {
  return (
    <AppSurfaceCard className="flex flex-col gap-4">
      <header className="text-xl font-title font-semibold text-theme-text-primary">오늘의 습관</header>
      <HabitTodayProgress
        completedCount={completedCount}
        rate={rate}
        totalCount={habitCount}
      />

      <div className="flex min-h-14 items-center justify-between rounded-theme bg-theme-bg p-3">
        <span className="text-sm text-theme-text-tertiary">생성된 습관</span>
        <strong className="text-2xl text-theme-accent">
          {habitCount}
          <span className="ml-1 text-sm font-semibold text-theme-text-tertiary">/ {maxHabitCount}</span>
        </strong>
      </div>

    </AppSurfaceCard>
  );
};

export default HabitOverviewCard;
