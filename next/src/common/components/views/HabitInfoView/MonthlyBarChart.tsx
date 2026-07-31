import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import { AppSurfaceCard } from "@/common/components/ui/AppSection/card";
import { cn } from "@/common/utils/cn";

interface Props {
  data?: number[];
  year: string;
  onCurrentYear: () => void;
  onNextYear: () => void;
  onPrevYear: () => void;
}

const yearButtonClass = "flex p-[3px] text-theme-text-secondary";

const MonthlyBarChart = ({ data, year, onCurrentYear, onNextYear, onPrevYear }: Props) => {
  const maxCount = Math.max(...(data ?? [1]), 1);

  return (
    <AppSurfaceCard className="flex flex-col gap-4">
      <header className="flex w-full items-center justify-between py-1.5">
        <button className={yearButtonClass} onClick={onPrevYear} type="button"><MdKeyboardArrowLeft /></button>
        <button className={cn(yearButtonClass, " text-xl capitalize text-theme-text-primary")} onClick={onCurrentYear} type="button">
          {year}년
        </button>
        <button className={yearButtonClass} onClick={onNextYear} type="button"><MdKeyboardArrowRight /></button>
      </header>

      <div className="flex min-h-[200px] w-full items-end justify-between">
        {[...Array(12)].map((_, i: number) => {
          const count = data?.[i] ?? 0;
          const hasValue = count > 0;
          const height = hasValue ? Math.max((count / maxCount) * 160, 8) : 4;

          return (
            <div key={'month' + i + 1} className="flex min-w-0 flex-1 flex-col items-center gap-1.5">
              <div className="flex h-[178px] w-full flex-col items-center justify-end gap-1.5">
                <div className="min-h-[18px] text-sm text-theme-text-tertiary">{hasValue && count}</div>
                <div
                  className={hasValue ? "min-h-1 w-3/5 max-w-5 rounded-[3px] bg-theme-accent transition-[height] duration-200 ease-in-out" : "min-h-1 w-3/5 max-w-5 rounded-[3px] bg-theme-text-primary/15 transition-[height] duration-200 ease-in-out"}
                  style={{ height: `${height}px` }}
                />
              </div>
              <span className="text-sm text-theme-text-tertiary">{i + 1}</span>
            </div>
          );
        })}
      </div>
    </AppSurfaceCard>
  );
};

export default MonthlyBarChart;
