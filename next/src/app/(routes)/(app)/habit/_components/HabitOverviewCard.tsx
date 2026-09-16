import { AppSurfaceCard } from "@/common/components/ui/AppSection/card";
import { MdAdd, MdCheckBox } from "react-icons/md";

interface Props {
  habitCount: number;
  maxHabitCount: number;
  onAddHabit: () => void;
}

const HabitOverviewCard = ({ habitCount, maxHabitCount, onAddHabit }: Props) => {
  const isLimitReached = habitCount >= maxHabitCount;

  return (
    <AppSurfaceCard className="flex flex-col gap-4">
      <header className="flex min-w-0 items-center gap-3">
        <MdCheckBox className="h-9 w-9 shrink-0 text-theme-accent" aria-hidden="true" />
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-theme-text-primary">습관 관리</h2>
          <p className="mt-1 text-sm text-theme-text-tertiary">꾸준히 이어갈 습관을 관리해보세요.</p>
        </div>
      </header>

      <div className="flex min-h-14 items-center justify-between rounded-theme bg-theme-bg p-3">
        <span className="text-sm text-theme-text-tertiary">생성된 습관</span>
        <strong className="text-2xl text-theme-accent">
          {habitCount}
          <span className="ml-1 text-sm font-semibold text-theme-text-tertiary">/ {maxHabitCount}</span>
        </strong>
      </div>

      <button
        className="flex min-h-14 items-center justify-center gap-1.5 rounded-theme bg-theme-accent px-4 py-3 text-xs desktop:text-sm font-semibold text-theme-text-on-accent transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
        disabled={isLimitReached}
        onClick={onAddHabit}
        type="button"
      >
        <MdAdd className="text-base" aria-hidden="true" />
        {isLimitReached ? '습관 개수 한도 도달' : '습관 추가'}
      </button>
    </AppSurfaceCard>
  );
};

export default HabitOverviewCard;
