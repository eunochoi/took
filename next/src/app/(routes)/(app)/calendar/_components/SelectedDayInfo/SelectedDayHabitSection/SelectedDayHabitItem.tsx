import type { HabitByDate } from '@/common/actions/habit';
import { cn } from '@/common/utils/cn';
import { MdCheck, MdChevronRight } from 'react-icons/md';

interface Props {
  habit: HabitByDate;
  canEdit: boolean;
  pendingHabitId: number | null;
  onOpenHabitInfo: (habitId: number) => void;
  onToggleHabit: (habitId: number, completed: boolean) => Promise<void>;
}

const SelectedDayHabitItem = ({ habit, canEdit, pendingHabitId, onOpenHabitInfo, onToggleHabit }: Props) => {
  const isPending = pendingHabitId === habit.id;

  return (
    <div className={cn('flex w-full items-center justify-between gap-2 transition-opacity', isPending && 'opacity-50')}>
      <button
        className={cn(
          'flex min-h-9 min-w-0 flex-1 items-center gap-2.5 rounded-lg text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-accent',
          canEdit ? 'cursor-pointer' : 'cursor-default',
        )}
        disabled={!canEdit || pendingHabitId !== null}
        onClick={() => void onToggleHabit(habit.id, habit.completed)}
        type="button"
        aria-pressed={habit.completed}
      >
        <span
          aria-hidden="true"
          className={cn(
            'flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-[1.5px] transition-colors duration-150 motion-reduce:transition-none',
            habit.completed
              ? 'border-theme-accent bg-theme-accent text-theme-text-on-accent'
              : 'border-theme-text-disabled/60 bg-theme-surface',
          )}
        >
          <MdCheck className={cn('h-3.5 w-3.5 transition-opacity motion-reduce:transition-none', habit.completed ? 'opacity-100' : 'opacity-0')} />
        </span>
        <span className="min-w-0 truncate text-sm">{habit.name}</span>
      </button>
      <button
        className="flex h-6 w-6 shrink-0 items-center justify-center text-theme-text-disabled"
        onClick={() => onOpenHabitInfo(habit.id)}
        type="button"
        aria-label={`${habit.name} 습관 정보 보기`}
      >
        <MdChevronRight className="text-xl" />
      </button>
    </div>
  );
};

export default SelectedDayHabitItem;
