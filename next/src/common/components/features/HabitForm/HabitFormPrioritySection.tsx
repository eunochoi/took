import HabitFormPrioritySelector from './HabitFormPrioritySelector';

interface HabitFormPrioritySectionProps {
  priority: number;
  setPriority: (value: number) => void;
}

const HabitFormPrioritySection = ({
  priority,
  setPriority,
}: HabitFormPrioritySectionProps) => (
  <section aria-labelledby="habit-priority-title" className="flex w-full flex-col gap-3">
    <h2 id="habit-priority-title" className="font-title text-base font-semibold text-theme-text-primary">우선순위</h2>
    <HabitFormPrioritySelector priority={priority} setPriority={setPriority} />
  </section>
);

export default HabitFormPrioritySection;
