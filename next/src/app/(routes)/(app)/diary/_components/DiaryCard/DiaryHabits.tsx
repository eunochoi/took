import type { DiaryHabit } from '@/common/types/diary';
import { useRouter } from "next/navigation";

interface Props {
  habits: DiaryHabit[];
}

const DiaryHabits = ({ habits }: Props) => {
  const router = useRouter();

  const handleHabitClick = (habitId: number) => {
    router.push(`/inter/habitInfo?id=${habitId}`, { scroll: false });
  };

  return (
    <div className="flex min-w-0 flex-wrap items-center gap-2">
      <span className="shrink-0 whitespace-nowrap rounded-full border border-transparent bg-theme-accent px-3 py-1 text-xs font-medium leading-[1.4] text-theme-text-on-accent">
        {habits.length}개 완료
      </span>
      {habits.map((habit) => (
        <button
          type="button"
          key={habit.id}
          onClick={() => handleHabitClick(habit.id)}
          className="max-w-full rounded-full border border-theme-accent/25 bg-theme-accent/10 px-3 py-1 text-left text-xs font-medium leading-[1.4] text-theme-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-accent"
        >
          <span className="block break-words">{habit.name}</span>
        </button>
      ))}
    </div>
  );
};

export default DiaryHabits;
