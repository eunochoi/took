import type { HabitsByDate } from '@/common/actions/habit';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MdExpandLess, MdExpandMore, MdLockOutline } from 'react-icons/md';
import SelectedDaySectionHeader from '../SelectedDaySectionHeader';
import { selectedDayInfoStyles } from '../selectedDayInfoStyles';
import SelectedDayHabitEmptyState from './SelectedDayHabitEmptyState';
import SelectedDayHabitItem from './SelectedDayHabitItem';

const COLLAPSED_HABIT_COUNT = 3;

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
    <div className={selectedDayInfoStyles.section.frame}>
      <SelectedDaySectionHeader title="오늘의 습관">
        {habitData?.isFuture ? (
          <span className={selectedDayInfoStyles.habit.lockedStatus}>
            <MdLockOutline className="text-sm" /> 기록 전
          </span>
        ) : habitData?.canEdit ? (
          <span className={selectedDayInfoStyles.habit.completedStatus}>
            {completedHabitCount}/{habits.length} 완료
          </span>
        ) : (
          <span className={selectedDayInfoStyles.habit.lockedStatus}>
            <MdLockOutline className="text-sm" /> {completedHabitCount}개 완료
          </span>
        )}
      </SelectedDaySectionHeader>

      <div className={selectedDayInfoStyles.section.contentInset}>
        {habitData?.isFuture ? (
          <SelectedDayHabitEmptyState message="미래 날짜에는 습관을 기록할 수 없어요." />
        ) : habits.length > 0 ? (
          <div className={selectedDayInfoStyles.habit.list}>
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
                className={selectedDayInfoStyles.habit.expandButton}
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
                    <span>모두 보기{` (${habits.length})`}</span><MdExpandMore className="text-lg" />
                  </>
                )}
              </button>
            )}
          </div>
        ) : (
          <SelectedDayHabitEmptyState
            message={habitData?.canEdit ? '이 날짜에 등록된 습관이 없어요.' : '완료한 습관 기록이 없어요.'}
          />
        )}
      </div>
    </div>
  );
};

export default SelectedDayHabitSection;
