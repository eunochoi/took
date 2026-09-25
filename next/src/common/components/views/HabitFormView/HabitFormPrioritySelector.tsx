import { HABIT_PRIORITY_VALUES } from '@/common/constants/habit';
import { cn } from '@/common/utils/cn';
import { StarRating } from '../../ui/StarRating';
import { HABIT_PRIORITY_LABELS } from './constants';

interface HabitFormPrioritySelectorProps {
  priority: number;
  setPriority: (value: number) => void;
}

const HabitFormPrioritySelector = ({
  priority,
  setPriority,
}: HabitFormPrioritySelectorProps) => (
  <div role="radiogroup" aria-labelledby="habit-priority-title" className="grid w-full grid-cols-3 gap-2">
    {HABIT_PRIORITY_VALUES.map((value) => (
      <label key={value} className="relative min-w-0">
        <input
          checked={value === priority}
          className="peer sr-only"
          name="priority"
          onChange={() => setPriority(value)}
          type="radio"
          value={value}
        />
        <span className={cn(
          'flex min-h-20 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border px-2 py-3 transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-theme-accent peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
          value === priority
            ? 'border-theme-accent bg-theme-accent/10 text-theme-accent'
            : 'border-theme-border-muted text-theme-text-secondary',
        )}>
          <span aria-hidden="true">
            <StarRating maxRating={3} rating={value + 1} />
          </span>
          <span className="font-title text-sm font-medium">{HABIT_PRIORITY_LABELS[value]}</span>
        </span>
      </label>
    ))}
  </div>
);

export default HabitFormPrioritySelector;
