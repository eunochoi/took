import type { ReactNode } from 'react';

import { cn } from '@/common/utils/cn';
import type { CalendarDayModel } from './useMonthCalendar';

interface Props {
  day: CalendarDayModel;
  isSelected?: boolean;
  label?: string;
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
}

export const CalendarDay = ({
  day, isSelected, label, className, onClick, children,
}: Props) => {
  const cellClassName = cn(
    'relative flex aspect-[1/1.2] min-w-0 flex-col items-center justify-center rounded-lg text-xs transition-colors',
    day.weekday === 6
      ? 'text-theme-calendar-saturday'
      : day.weekday === 0
        ? 'text-theme-calendar-sunday'
        : 'text-theme-text-secondary',
    isSelected && 'motion-safe:animate-[calendar-selected-pop_0.35s_ease-out]',
    day.isOutsideMonth && 'opacity-30',
    onClick && 'cursor-pointer',
    className,
  );
  const accessibleLabel = label ?? day.dateKey;

  if (!onClick) {
    return (
      <div className={cellClassName} aria-label={accessibleLabel}>
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
    >
      {children ?? day.dayNumber}
    </button>
  );
};
