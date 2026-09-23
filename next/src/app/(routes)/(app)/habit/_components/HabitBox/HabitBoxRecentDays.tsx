import { cn } from "@/common/utils/cn";
import { format, subDays } from "date-fns";
import { ko } from "date-fns/locale";
import { MdCheck } from 'react-icons/md';

interface Props {
  name: string;
  recentDateStatus: boolean[] | undefined;
  controlsDisabled: boolean;
  onToggleHabit: (checked: boolean, dateString: string) => Promise<void>;
}

const HabitBoxRecentDays = ({ name, recentDateStatus, controlsDisabled, onToggleHabit }: Props) => {
  const currentDate = new Date();
  let recentDateArray = new Array(4).fill(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()));
  recentDateArray = recentDateArray.map((e, i) => subDays(e, i));

  return (
    <div className="grid grid-cols-[repeat(4,max-content)] justify-around">
      {recentDateArray.map((date, i) => {
        const checked = !!recentDateStatus?.[i];
        const dateString = format(date, 'yyyy-MM-dd');
        return (
          <label key={dateString} className="flex cursor-pointer flex-col items-center gap-1 text-sm text-theme-text-secondary">
            <span className={i === 0 ? 'text-theme-accent font-semibold' : ''}>{format(date, 'eee', { locale: ko })}</span>
            <span>{format(date, 'd')}</span>
            <input
              className="peer sr-only"
              type="checkbox"
              aria-label={`${name} ${format(date, 'M월 d일')} 완료`}
              checked={checked}
              disabled={controlsDisabled}
              onChange={(event) => onToggleHabit(event.currentTarget.checked, dateString)}
            />
            <span className={cn(
              "mt-1 flex h-5 w-5 items-center justify-center rounded-md border-[1.5px] transition-colors duration-150 motion-reduce:transition-none",
              checked
                ? "border-theme-accent bg-theme-accent text-theme-text-on-accent"
                : "border-theme-text-disabled/60 bg-theme-surface",
            )}>
              <MdCheck className={cn("h-3.5 w-3.5 transition-opacity motion-reduce:transition-none", checked ? "opacity-100" : "opacity-0")} aria-hidden="true" />
            </span>
          </label>
        );
      })}
    </div>
  );
};

export default HabitBoxRecentDays;
