import { cn } from "@/common/utils/cn";

interface Props {
  name: string;
  recentDateStatus: boolean[] | undefined;
  controlsDisabled: boolean;
  onCompleteToday: () => Promise<void>;
}

const HabitBoxProgress = ({ name, recentDateStatus, controlsDisabled, onCompleteToday }: Props) => {
  const completedCount = recentDateStatus?.filter(Boolean).length ?? 0;
  const todayCompleted = !!recentDateStatus?.[0];

  return (
    <div className="mt-auto flex flex-col gap-3">
      <div>
        <p className="mb-1.5 text-xs text-theme-text-secondary sm:text-sm">최근 4일 {recentDateStatus ? `${completedCount}/4회` : '—/4회'}</p>
        <div role="progressbar" aria-label={`${name} 최근 4일 완료 횟수`} aria-valuemin={0} aria-valuemax={4} aria-valuenow={recentDateStatus ? completedCount : undefined} className="h-1.5 overflow-hidden rounded-full bg-theme-bg">
          <div className="h-full rounded-full bg-theme-accent transition-all" style={{ width: `${completedCount * 25}%` }} />
        </div>
      </div>
      <button
        type="button"
        disabled={controlsDisabled || todayCompleted}
        onClick={onCompleteToday}
        className={cn(
          "min-h-10 w-full rounded-xl px-2 py-2 text-sm font-medium",
          todayCompleted ? "bg-theme-bg text-theme-accent/80" : "bg-theme-accent text-white",
        )}
      >
        {todayCompleted ? '오늘 완료했어요' : '오늘 완료하기'}
      </button>
    </div>
  );
};

export default HabitBoxProgress;
