import type { ReactNode } from 'react';

import { cn } from '@/common/utils/cn';
import type { CalendarDayModel } from './useMonthCalendar';

interface Props {
  day: CalendarDayModel;
  isToday: boolean;
  isSelected?: boolean;
  label?: string;
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
}

export const CalendarDay = ({
  day, isToday, isSelected, label, className, onClick, children,
}: Props) => {
  const cellClassName = cn(
    'relative flex aspect-[1/1.3] min-w-0 flex-col items-center justify-center rounded-lg text-xs transition-colors',
    isToday
      ? 'text-theme-accent'
      : day.weekday === 6
        ? 'text-theme-calendar-saturday'
        : day.weekday === 0
          ? 'text-theme-calendar-sunday'
          : 'text-theme-text-secondary',
    isToday && 'ring-1 ring-inset ring-theme-accent',
    isSelected && !day.isOutsideMonth && 'bg-theme-accent/10 motion-safe:animate-[calendar-selected-pop_0.35s_ease-out]',
    day.isOutsideMonth && 'opacity-30',
    onClick && 'cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-theme-accent',
    className,
  );
  const accessibleLabel = [label ?? day.dateKey, isSelected ? '선택됨' : ''].filter(Boolean).join(', ');

  if (!onClick) {
    return (
      <div className={cellClassName} aria-label={accessibleLabel} aria-current={isToday ? 'date' : undefined}>
        {children ?? day.dayNumber}
      </div>
    );
  }

  return (
    <button
      type="button"
      className={cellClassName}
      onClick={onClick}
      aria-label={accessibleLabel}
      aria-current={isToday ? 'date' : undefined}
    >
      {children ?? day.dayNumber}
    </button>
  );
};
