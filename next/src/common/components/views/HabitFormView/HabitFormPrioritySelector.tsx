import { HABIT_PRIORITY_VALUES } from '@/common/constants/habit';
import { cn } from '@/common/utils/cn';
import { MdCheck } from 'react-icons/md';
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
  <div role="radiogroup" aria-label="우선순위 선택" className="flex w-full flex-col gap-3">
    {HABIT_PRIORITY_VALUES.map((value) => {
      const isSelected = value === priority;

      return (
        <label
          key={value}
          className={cn(
            'relative flex min-h-14 w-full cursor-pointer items-center gap-4 rounded-2xl border px-4 py-3 transition-colors tablet:focus-within:!outline tablet:focus-within:!outline-2 tablet:focus-within:!outline-offset-2 tablet:focus-within:!outline-theme-accent',
            isSelected ? 'border-theme-accent bg-theme-accent/10' : 'border-theme-border-muted tablet:hover:bg-theme-accent/5',
          )}
        >
          <input
            checked={isSelected}
            className="peer sr-only"
            name="priority"
            onChange={() => setPriority(value)}
            type="radio"
            value={value}
          />
          <div aria-hidden="true" className="flex w-20 shrink-0 items-center text-base">
            <StarRating
              rating={value + 1}
              className={isSelected ? 'text-theme-accent' : 'text-theme-text-tertiary'}
            />
          </div>
          <span className={cn(
            'flex-1 font-title text-sm font-medium',
            isSelected ? 'text-theme-accent' : 'text-theme-text-primary',
          )}>
            {HABIT_PRIORITY_LABELS[value]}
          </span>
          {isSelected && <MdCheck aria-hidden="true" className="h-5 w-5 shrink-0 text-theme-accent" />}
        </label>
      );
    })}
  </div>
);

export default HabitFormPrioritySelector;
