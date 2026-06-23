import type { DiaryHabit } from '@/common/types/diary';
import { cn } from '@/common/utils/cn';
import { useRouter } from "next/navigation";
import { ComponentPropsWithoutRef } from 'react';

interface Props {
  habits: DiaryHabit[];
}

interface HabitPillProps extends ComponentPropsWithoutRef<'span'> {
  value: string;
  pointer?: boolean;
};

const HabitPill = ({ value, pointer = false, className, style, ...props }: HabitPillProps) => {
  return <span
    className={cn('flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-[999px] px-3.5 py-1 leading-[1.4] text-sm font-medium capitalize text-grey-title',
      pointer ? 'pointer-events-auto' : 'pointer-events-none',
      className,
    )}
    style={{
      backgroundColor: "color-mix(in srgb, var(--theme-color) 40%, white)",
      ...style,
    }}
    {...props}
  >
    {value}
  </span>
}

const DiaryHabits = ({ habits }: Props) => {
  const router = useRouter();
  const completedCount = habits?.length ?? 0;

  const handleHabitClick = (habitId: number) => {
    router.push(`/inter/habitInfo?id=${habitId}`, { scroll: false });
  };

  return (
    <div className="flex h-auto w-full shrink-0 flex-nowrap justify-start gap-2 overflow-x-scroll px-3.5 pb-3.5 pt-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <HabitPill value={`${completedCount}개 완료`} />
      {habits?.map((habit) => (
        <HabitPill
          pointer
          key={habit.id}
          value={habit.name}
          onClick={() => handleHabitClick(habit.id)}
        />
      ))}
    </div>
  );
};

export default DiaryHabits;
