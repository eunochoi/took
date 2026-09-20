import type { DiaryHabit } from "@/common/types/diary";

interface DiaryHabitsProps {
  habits: DiaryHabit[];
  showCount?: boolean;
  onHabitClick?: (habitId: number) => void;
}

const habitPillClass = "max-w-full rounded-full bg-theme-accent px-3 py-1 text-left text-xs font-medium leading-[1.4] text-white";

export const DiaryHabits = ({ habits, showCount = true, onHabitClick }: DiaryHabitsProps) => (
  <div className="flex min-w-0 flex-wrap items-center gap-2" aria-label="습관">
    {showCount && (
      <span className={`${habitPillClass} break-words`}>
        {habits.length}개 완료
      </span>
    )}
    {habits.map((habit) => onHabitClick ? (
      <button
        type="button"
        key={habit.id}
        onClick={() => onHabitClick(habit.id)}
        className={`${habitPillClass}`}
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
