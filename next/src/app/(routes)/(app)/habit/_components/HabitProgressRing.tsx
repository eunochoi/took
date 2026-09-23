import { cn } from "@/common/utils/cn";

interface Props {
  completedCount: number;
  rate: number | string;
  totalCount: number;
  className?: string;
}

const HabitProgressRing = ({ completedCount, rate, totalCount, className }: Props) => {
  const rateValue = Math.min(Math.max(Number(rate) || 0, 0), 100);
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - rateValue / 100);

  return (
    <div
      className={cn("relative flex shrink-0 items-center justify-center", className)}
      role="img"
      aria-label={`오늘 습관 달성률 ${rateValue}% (${completedCount}/${totalCount} 완료)`}
    >
      <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r={radius} fill="rgb(var(--theme-surface))" />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="rgb(var(--theme-accent) / 0.16)"
          strokeWidth="10"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="rgb(var(--theme-accent))"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          strokeWidth="10"
          className="transition-[stroke-dashoffset] duration-500 ease-out motion-reduce:transition-none"
        />
      </svg>
      <strong className="absolute font-title text-xl font-bold text-theme-accent tablet:text-3xl">{rateValue}%</strong>
    </div>
  );
};

export default HabitProgressRing;
