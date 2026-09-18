import type { DiaryHabit } from "@/common/types/diary";

interface DiaryHabitsProps {
  habits: DiaryHabit[];
  showCount?: boolean;
  onHabitClick?: (habitId: number) => void;
}

const habitPillClass = "max-w-full rounded-full border border-theme-accent/25 bg-theme-accent/10 px-3 py-1 text-left text-xs font-medium leading-[1.4] text-theme-accent-text";

export const DiaryHabits = ({ habits, showCount = true, onHabitClick }: DiaryHabitsProps) => (
  <div className="flex min-w-0 flex-wrap items-center gap-2" aria-label="습관">
    {showCount && (
      <span className="shrink-0 whitespace-nowrap rounded-full border border-transparent bg-theme-accent/20 px-3 py-1 text-xs font-medium leading-[1.4] text-theme-accent-text">
        {habits.length}개 완료
      </span>
    )}
    {habits.map((habit) => onHabitClick ? (
      <button
        type="button"
        key={habit.id}
        onClick={() => onHabitClick(habit.id)}
        className={`${habitPillClass} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-accent`}
      >
        <span className="block break-words">{habit.name}</span>
      </button>
    ) : (
      <span key={habit.id} className={`${habitPillClass} break-words`}>
        {habit.name}
      </span>
    ))}
  </div>
);
