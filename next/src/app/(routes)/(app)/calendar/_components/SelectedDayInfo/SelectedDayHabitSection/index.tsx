import type { HabitsByDate } from '@/common/actions/habit';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MdCheckBox, MdExpandLess, MdExpandMore, MdLockOutline } from 'react-icons/md';
import SelectedDaySectionHeader from '../SelectedDaySectionHeader';
import SelectedDayHabitItem from './SelectedDayHabitItem';

const COLLAPSED_HABIT_COUNT = 3;
const emptyMessageClassName = 'py-4 text-center text-sm leading-relaxed text-theme-text-tertiary desktop:text-sm';

interface Props {
  habitData?: HabitsByDate;
  pendingHabitId: number | null;
  onToggleHabit: (habitId: number, completed: boolean) => Promise<void>;
}

const SelectedDayHabitSection = ({ habitData, pendingHabitId, onToggleHabit }: Props) => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const habits = habitData?.habits ?? [];
  const completedHabitCount = habits.filter((habit) => habit.completed).length;
  const canExpand = habits.length > COLLAPSED_HABIT_COUNT;
  const visibleHabits = isExpanded ? habits : habits.slice(0, COLLAPSED_HABIT_COUNT);
  const onOpenHabitInfo = (habitId: number) => {
    router.push(`/inter/habitInfo?id=${habitId}`, { scroll: false });
  };

  return (
    <div className="min-w-0 p-1">
      <SelectedDaySectionHeader title="오늘의 습관" icon={<MdCheckBox />}>
        {habitData?.isFuture ? (
          <span className="flex items-center gap-1 text-xs text-theme-text-tertiary desktop:text-sm">
            <MdLockOutline className="text-sm" /> 기록 전
          </span>
        ) : habitData?.canEdit ? (
          <span className="text-xs font-semibold text-theme-accent desktop:text-sm">
            {completedHabitCount}/{habits.length} 완료
          </span>
        ) : (
          <span className="flex items-center gap-1 text-xs text-theme-text-tertiary desktop:text-sm">
            <MdLockOutline className="text-sm" /> {completedHabitCount}개 완료
          </span>
        )}
      </SelectedDaySectionHeader>

      <div className="px-2 py-3">
        {habitData?.isFuture ? (
          <p className={emptyMessageClassName}>미래 날짜에는 습관을 기록할 수 없어요.</p>
        ) : habits.length > 0 ? (
          <div className="flex flex-col gap-2">
            {visibleHabits.map((habit) => (
              <SelectedDayHabitItem
                key={habit.id}
                habit={habit}
                canEdit={habitData?.canEdit === true}
                pendingHabitId={pendingHabitId}
                onOpenHabitInfo={onOpenHabitInfo}
                onToggleHabit={onToggleHabit}
              />
            ))}
            {canExpand && (
              <button
                className="flex min-h-8 w-full items-center justify-center gap-1 text-xs font-semibold text-theme-accent desktop:text-sm"
                onClick={() => setIsExpanded((previousIsExpanded) => !previousIsExpanded)}
                type="button"
                aria-expanded={isExpanded}
              >
                {isExpanded ? (
                  <>
                    <span>접기</span><MdExpandLess className="text-lg" />
                  </>
                ) : (
                  <>
                    <span>더보기{` (${habits.length - 3})`}</span><MdExpandMore className="text-lg" />
                  </>
                )}
              </button>
            )}
          </div>
        ) : (
          <p className={emptyMessageClassName}>이 날짜의 습관 기록이 없어요.</p>
        )}
      </div>
    </div>
  );
};

export default SelectedDayHabitSection;
