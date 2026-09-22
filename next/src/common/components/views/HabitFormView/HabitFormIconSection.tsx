import HabitIcon from '@/common/components/ui/HabitIcon';
import { HABIT_ICON_KEYS, type HabitIconKey } from '@/common/constants/habitIcons';
import { cn } from '@/common/utils/cn';

interface HabitFormIconSectionProps {
  iconKey: HabitIconKey;
  setIconKey: (value: HabitIconKey) => void;
}

const HabitFormIconSection = ({ iconKey, setIconKey }: HabitFormIconSectionProps) => (
  <section aria-labelledby="habit-icon-title" className="flex w-full flex-col gap-3 pt-5">
    <div className="flex items-center justify-between gap-3">
      <h2 id="habit-icon-title" className="font-title text-base font-semibold text-theme-text-primary">습관 아이콘</h2>
      <span className="flex h-9 w-9 items-center justify-center bg-transparent">
        <HabitIcon iconKey={iconKey} className="text-2xl" />
      </span>
    </div>
    <div role="group" aria-labelledby="habit-icon-title" className="grid grid-cols-5 gap-2">
      {HABIT_ICON_KEYS.map((key, index) => (
        <button
          key={key}
          type="button"
          aria-label={`습관 아이콘 ${index + 1}`}
          aria-pressed={iconKey === key}
          onClick={() => setIconKey(key)}
          className={cn(
            'flex min-h-14 min-w-0 items-center justify-center rounded-xl border bg-transparent p-2 transition-colors disabled:cursor-not-allowed disabled:opacity-50',
            iconKey === key
              ? 'border-theme-accent'
              : 'border-transparent tablet:hover:border-theme-accent/50',
          )}
        >
          <HabitIcon iconKey={key} className="shrink-0 text-2xl" />
        </button>
      ))}
    </div>
  </section>
);

export default HabitFormIconSection;
