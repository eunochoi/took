import { DiaryHabits as DiaryHabitPills } from '@/common/components/ui/Diary/DiaryHabits';
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

  return <DiaryHabitPills habits={habits} onHabitClick={handleHabitClick} showCount={false} />;
};

export default DiaryHabits;
