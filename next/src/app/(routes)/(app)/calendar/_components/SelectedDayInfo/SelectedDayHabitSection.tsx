import type { HabitsByDate } from '@/common/actions/habit';
import { cn } from '@/common/utils/cn';
import { MdCheck, MdChevronRight, MdLockOutline } from 'react-icons/md';

interface Props {
  habitData?: HabitsByDate;
  pendingHabitId: number | null;
  onToggleHabit: (habitId: number, completed: boolean) => Promise<void>;
}

const SelectedDayHabitSection = ({ habitData, pendingHabitId, onToggleHabit }: Props) => {
  const habits = habitData?.habits ?? [];
  const completedHabitCount = habits.filter((habit) => habit.completed).length;

  return (
    <div className="rounded-theme border border-theme-text-disabled/20 p-3.5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-theme-text-primary">오늘의 습관</h3>
        {habitData?.isFuture ? (
          <span className="flex items-center gap-1 text-sm text-theme-text-tertiary">
            <MdLockOutline /> 기록 전
          </span>
        ) : habitData?.canEdit ? (
          <span className="text-sm font-semibold text-theme-accent">
            {completedHabitCount}/{habits.length} 완료
          </span>
        ) : (
          <span className="flex items-center gap-1 text-sm text-theme-text-tertiary">
            <MdLockOutline /> {completedHabitCount}개 완료
          </span>
        )}
      </div>

      {habitData?.isFuture ? (
        <div className="flex min-h-20 items-center justify-center rounded-theme bg-theme-bg/60 px-4 text-center text-sm text-theme-text-tertiary">
          미래 날짜에는 습관을 기록할 수 없어요.
        </div>
      ) : habits.length > 0 ? (
        <div className="flex flex-col gap-2">
          {habits.map((habit) => (
            <button
              key={habit.id}
              className={cn(
                'flex min-h-12 w-full items-center gap-3 rounded-theme bg-theme-bg/60 px-3 text-left text-theme-text-primary transition-opacity',
                habitData?.canEdit ? 'cursor-pointer' : 'cursor-default',
                pendingHabitId === habit.id && 'opacity-50',
              )}
              disabled={!habitData?.canEdit || pendingHabitId !== null}
              onClick={() => void onToggleHabit(habit.id, habit.completed)}
              type="button"
              aria-pressed={habit.completed}
            >
              <span
                className={cn(
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-theme-text-disabled text-base transition-colors',
                  habit.completed && 'border-theme-accent bg-theme-accent text-theme-text-on-accent',
                )}
              >
                {habit.completed && <MdCheck />}
              </span>
              <span className="min-w-0 flex-1 truncate text-base">{habit.name}</span>
              {habitData?.canEdit && <MdChevronRight className="shrink-0 text-xl text-theme-text-disabled" />}
            </button>
          ))}
        </div>
      ) : (
        <div className="flex min-h-20 items-center justify-center rounded-theme bg-theme-bg/60 px-4 text-center text-sm text-theme-text-tertiary">
          {habitData?.canEdit ? '이 날짜에 등록된 습관이 없어요.' : '완료한 습관 기록이 없어요.'}
        </div>
      )}

      {!habitData?.isFuture && !habitData?.canEdit && (
        <p className="mt-3 text-xs leading-relaxed text-theme-text-tertiary">
          이전 날짜는 완료한 습관만 확인할 수 있어요.
        </p>
      )}
    </div>
  );
};

export default SelectedDayHabitSection;
