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
      <HabitTodayProgress
        completedCount={completedCount}
        rate={rate}
        totalCount={habitCount}
      />
    </AppSurfaceCard>
  );
};

export default HabitOverviewCard;
