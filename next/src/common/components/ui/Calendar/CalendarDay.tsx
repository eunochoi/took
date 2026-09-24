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
    'relative flex aspect-[1/1.25] min-w-0 flex-col items-center justify-center rounded-lg text-xs transition-colors',
    day.weekday === 6
      ? 'text-theme-calendar-saturday'
      : day.weekday === 0
        ? 'text-theme-calendar-sunday'
        : 'text-theme-text-secondary',
    day.isOutsideMonth && 'opacity-30',
    onClick && 'cursor-pointer',
    className,
  );
  const accessibleLabel = [label ?? day.dateKey, isSelected ? '선택됨' : ''].filter(Boolean).join(', ');

  const content = (
    <>
      {children ?? day.dayNumber}
      {isToday && (
        <span
          aria-hidden="true"
          className="absolute -bottom-[3px] h-1.5 w-1.5 rounded-full bg-theme-accent"
        />
      )}
    </>
  );

  if (!onClick) {
    return (
      <div className={cellClassName} aria-label={accessibleLabel} aria-current={isToday ? 'date' : undefined}>
        {content}
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
      {content}
    </button>
  );
};
