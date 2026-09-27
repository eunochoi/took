import HabitIcon from '@/common/components/ui/HabitIcon';
import { HABIT_ICON_KEYS, type HabitIconKey } from '@/common/constants/habitIcons';
import { cn } from '@/common/utils/cn';

interface HabitFormIconSectionProps {
  iconKey: HabitIconKey;
  setIconKey: (value: HabitIconKey) => void;
}

const HabitFormIconSection = ({ iconKey, setIconKey }: HabitFormIconSectionProps) => (
  <section aria-labelledby="habit-icon-title" className="flex w-full flex-col gap-3">
    <div className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 flex-col gap-2">
        <h2 id="habit-icon-title" className="font-title text-base font-semibold text-theme-text-primary">습관 아이콘</h2>
        <p className="text-sm leading-relaxed text-theme-text-secondary px-2">습관을 잘 표현하는 아이콘을 골라보세요.</p>
      </div>
      <span aria-label="선택한 습관 아이콘" className="m-2 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-theme-accent/10">
        <HabitIcon iconKey={iconKey} className="text-4xl" />
      </span>
    </div>
    <div role="group" aria-labelledby="habit-icon-title" className="grid grid-cols-5 gap-2 p-2">
      {HABIT_ICON_KEYS.map((key, index) => (
        <button
          key={key}
          type="button"
          aria-label={`습관 아이콘 ${index + 1}`}
          aria-pressed={iconKey === key}
          onClick={() => setIconKey(key)}
          className={cn(
            'flex min-h-14 min-w-0 items-center justify-center rounded-2xl border p-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-accent disabled:cursor-not-allowed disabled:opacity-50',
            iconKey === key
              ? 'border-theme-accent bg-theme-accent/10'
              : 'border-transparent bg-transparent',
          )}
        >
          <HabitIcon iconKey={key} className={cn('shrink-0', iconKey === key ? 'text-3xl' : 'text-2xl')} />
        </button>
      ))}
    </div>
  </section>
);

export default HabitFormIconSection;
