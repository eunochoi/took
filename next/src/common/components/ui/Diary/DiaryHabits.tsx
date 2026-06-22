import type { DiaryHabit } from '@/common/types/diary';
import { useRouter } from "next/navigation";

interface Props {
  habits: DiaryHabit[];
}

const DiaryHabits = ({ habits }: Props) => {
  const router = useRouter();
  const completedCount = habits?.length ?? 0;

  const handleHabitClick = (habitId: number) => {
    router.push(`/inter/habitInfo?id=${habitId}`, { scroll: false });
  };

  return (
    <div className="flex h-auto w-full shrink-0 flex-nowrap justify-start gap-2 overflow-x-scroll px-3.5 pb-3.5 pt-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <span className="flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-[14px] bg-theme px-3.5 py-1 leading-[1.4] [&>span]:text-sm [&>span]:font-medium [&>span]:capitalize [&>span]:text-white">
        <span>{completedCount}개 완료</span>
      </span>
      {habits?.map((habit) => (
        <span
          key={habit.id}
          className="flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-[14px] px-3.5 py-1 leading-[1.4] [&>span]:text-sm [&>span]:font-medium [&>span]:capitalize [&>span]:text-grey-title"
          onClick={() => handleHabitClick(habit.id)}
          style={{ backgroundColor: "color-mix(in srgb, var(--theme-color) 40%, white)" }}
        >
          <span>{habit.name}</span>
        </span>
      ))}
    </div>
  );
};

export default DiaryHabits;
