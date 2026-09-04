import type { HabitByDate } from '@/common/actions/habit';
import { cn } from '@/common/utils/cn';
import { MdCheck, MdChevronRight } from 'react-icons/md';
import { selectedDayInfoStyles } from '../selectedDayInfoStyles';

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
    <div className={cn(selectedDayInfoStyles.habit.item, isPending && 'opacity-50')}>
      <button
        className={cn(selectedDayInfoStyles.habit.toggleButton, canEdit ? 'cursor-pointer' : 'cursor-default')}
        disabled={!canEdit || pendingHabitId !== null}
        onClick={() => void onToggleHabit(habit.id, habit.completed)}
        type="button"
        aria-pressed={habit.completed}
      >
        <span
          className={cn(
            selectedDayInfoStyles.habit.selector,
            habit.completed && 'border-theme-accent bg-theme-accent text-theme-text-on-accent',
          )}
        >
          {habit.completed && <MdCheck />}
        </span>
        <span className={selectedDayInfoStyles.habit.name}>{habit.name}</span>
      </button>
      <button
        className={selectedDayInfoStyles.habit.infoButton}
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
