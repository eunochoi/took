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
  const getCellClassName = (today: boolean, selected: boolean) => cn(
    'relative flex aspect-[1/1.3] min-w-0 flex-col items-center justify-center rounded-lg text-xs transition-colors',
    today
      ? 'text-theme-accent'
      : day.weekday === 6
        ? 'text-theme-calendar-saturday'
        : day.weekday === 0
          ? 'text-theme-calendar-sunday'
          : 'text-theme-text-secondary',
    selected && !day.isOutsideMonth && 'bg-theme-accent/10 motion-safe:animate-[calendar-selected-pop_0.35s_ease-out]',
    today && 'bg-theme-accent/20',
    day.isOutsideMonth && 'opacity-30',
    onClick && 'cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-theme-accent',
    className,
  );
  const cellClassName = getCellClassName(isToday, Boolean(isSelected));
  const defaultCellClassName = getCellClassName(false, false);
  const accessibleLabel = [label ?? day.dateKey, isSelected ? '선택됨' : ''].filter(Boolean).join(', ');

  if (!onClick) {
    return (
      <div className={cellClassName} data-capture-class={defaultCellClassName} aria-label={accessibleLabel} aria-current={isToday ? 'date' : undefined}>
        {children ?? day.dayNumber}
      </div>
    );
  }

  return (
    <button
      type="button"
      className={cellClassName}
      data-capture-class={defaultCellClassName}
      onClick={onClick}
      aria-label={accessibleLabel}
      aria-current={isToday ? 'date' : undefined}
    >
      {children ?? day.dayNumber}
    </button>
  );
};
