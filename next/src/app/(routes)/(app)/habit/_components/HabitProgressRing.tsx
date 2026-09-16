import { cn } from "@/common/utils/cn";

interface Props {
  completedCount: number;
  rate: number | string;
  totalCount: number;
  className?: string;
}

const HabitProgressRing = ({ completedCount, rate, totalCount, className }: Props) => {
  const rateValue = Math.min(Math.max(Number(rate) || 0, 0), 100);

  return (
    <div className={cn("flex h-28 w-28 shrink-0 items-start justify-center rounded-full p-2.5 tablet:h-40 tablet:w-40 tablet:p-4", className)}
      style={{
        background: `conic-gradient(rgb(var(--theme-accent)) ${rateValue}%, rgb(var(--theme-accent) / 0.16) ${rateValue}% 100%)`,
      }}
      role="img"
      aria-label={`오늘 습관 달성률 ${rateValue}% (${completedCount}/${totalCount} 완료)`}
    >
      <div className="flex h-full w-full items-center justify-center rounded-full bg-theme-surface">
        <strong className="font-title text-xl font-bold text-theme-accent tablet:text-3xl">{rateValue}%</strong>
      </div>
    </div>
  );
};

export default HabitProgressRing;
