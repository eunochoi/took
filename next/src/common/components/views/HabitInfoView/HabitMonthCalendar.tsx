import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import { AppSurfaceCard } from '@/common/components/ui/AppSection/card';
import { CalendarDay } from '@/common/components/ui/Calendar/CalendarDay';
import { CalendarGrid } from '@/common/components/ui/Calendar/CalendarGrid';
import type { CalendarDayModel } from '@/common/components/ui/Calendar/useMonthCalendar';
import type { HabitMonthData } from '@/common/types/calendar';
import { cn } from '@/common/utils/cn';

interface Props {
  habitMonthData?: HabitMonthData;
  monthLabel: string;
  days: CalendarDayModel[];
  today: string;
  isFetching: boolean;
  onCurrentMonth: () => void;
  onNextMonth: () => void;
  onPrevMonth: () => void;
  onShowDate: (date: string) => void;
}

const HabitMonthCalendar = ({
  habitMonthData, monthLabel, days, today, isFetching,
  onCurrentMonth, onNextMonth, onPrevMonth, onShowDate,
}: Props) => {
  return (
    <AppSurfaceCard>
      <header className="mb-2 flex items-center justify-between">
        <button type="button" className="p-2 text-theme-text-secondary" onClick={onPrevMonth} aria-label="이전 달">
          <MdKeyboardArrowLeft size={22} />
        </button>
        <button
          type="button"
          className="text-lg font-semibold text-theme-accent"
          onClick={onCurrentMonth}
          aria-label={`${monthLabel}, 이번 달로 이동`}
        >
          {monthLabel}
        </button>
        <button type="button" className="p-2 text-theme-text-secondary" onClick={onNextMonth} aria-label="다음 달">
          <MdKeyboardArrowRight size={22} />
        </button>
      </header>

      <CalendarGrid aria-busy={isFetching} aria-label={`${monthLabel} 습관 실천 달력`}>
        {days.map((day) => {
          const isCompleted = !day.isOutsideMonth && habitMonthData?.daysByDate[day.dateKey] === true;
          const isBeforeCreation = habitMonthData ? day.dateKey < habitMonthData.createdDate : false;
          const isFuture = day.dateKey > today;
          const isMissed = !!habitMonthData && !day.isOutsideMonth && !isBeforeCreation &&
            !isCompleted && day.dateKey < habitMonthData.editableFrom;

          return (
            <CalendarDay
              key={day.dateKey}
              day={day}
              isToday={day.dateKey === today}
              onClick={day.isOutsideMonth ? () => onShowDate(day.dateKey) : undefined}
              label={[
                day.dateKey,
                isCompleted ? '완료 기록 있음' : '',
                isMissed ? '놓친 실천' : '',
                isBeforeCreation ? '생성일 이전, 통계 제외' : '',
                isFuture ? '미래 날짜' : '',
              ].filter(Boolean).join(', ')}
            >
              <span className={cn(
                'flex h-7 w-7 items-center justify-center rounded-full',
                isCompleted && 'bg-theme-accent text-theme-text-on-accent',
                isMissed && 'bg-theme-surface-muted text-theme-text-secondary',
              )}>
                {day.dayNumber}
              </span>
            </CalendarDay>
          );
        })}
      </CalendarGrid>
    </AppSurfaceCard>
  );
};

export default HabitMonthCalendar;
