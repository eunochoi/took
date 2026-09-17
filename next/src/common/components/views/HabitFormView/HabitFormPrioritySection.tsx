import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { MdChevronRight } from 'react-icons/md';
import { StarRating } from '../../ui/StarRating';
import { HABIT_PRIORITY_LABELS } from './constants';
import HabitFormPriorityPicker from './HabitFormPriorityPicker';

interface HabitFormPrioritySectionProps {
  priority: number;
  setPriority: (value: number) => void;
}

const HabitFormPrioritySection = ({
  priority,
  setPriority,
}: HabitFormPrioritySectionProps) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  return (
    <div className="border-b border-theme-border-muted pb-4">
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isPickerOpen}
        onClick={() => setIsPickerOpen(true)}
        className="flex w-full items-center justify-between gap-3 rounded-xl py-1 text-left transition-colors tablet:hover:bg-theme-accent/5 tablet:focus-visible:!outline tablet:focus-visible:!outline-2 tablet:focus-visible:!outline-offset-4 tablet:focus-visible:!outline-theme-accent disabled:cursor-wait"
      >
        <span className="flex min-w-0 flex-col gap-1">
          <span className="text-xs text-theme-text-secondary">우선순위</span>
          <span className="font-title text-base font-semibold text-theme-text-primary">{HABIT_PRIORITY_LABELS[priority] ?? '우선순위를 골라주세요'}</span>
        </span>
        <span aria-hidden="true" className="flex h-14 shrink-0 items-center justify-center">
          <StarRating className='text-xl' rating={priority + 1} />
        </span>
        <span className="flex shrink-0 items-center gap-0.5 text-xs text-theme-text-secondary">
          변경
          <MdChevronRight aria-hidden="true" className="h-5 w-5" />
        </span>
      </button>
      <AnimatePresence>
        {isPickerOpen && (
          <HabitFormPriorityPicker
            priority={priority}
            onClose={() => setIsPickerOpen(false)}
            onConfirm={(value) => {
              setPriority(value);
              setIsPickerOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default HabitFormPrioritySection;
