import { cn } from "@/common/utils/cn";

interface Props {
  completedCount: number;
  rate: number | string;
  totalCount: number;
  className?: string;
}

const HabitProgressRing = ({ completedCount, rate, totalCount, className }: Props) => {
  const rateValue = Number(rate);

  return (
    <div className={cn("flex h-28 w-28 shrink-0 items-start justify-center rounded-full p-2.5 tablet:h-40 tablet:w-40 tablet:p-4", className)}
      style={{
        background: `conic-gradient(rgb(var(--theme-accent)) ${rateValue}%, rgb(var(--theme-surface) / 0.78) ${rateValue}% 100%)`,
      }}
      role="img"
      aria-label={`오늘 습관 달성률 ${rate}% (${completedCount}/${totalCount} 완료)`}
    >
      <div className="flex h-full w-full items-center justify-center rounded-full bg-theme-bg">
        <strong className="font-title text-xl font-bold text-theme-accent tablet:text-3xl">{rate}%</strong>
      </div>
    </div>
  );
};

export default HabitProgressRing;
