import type { HTMLAttributes } from 'react';

import { cn } from '@/common/utils/cn';

const WEEKDAYS = ['월', '화', '수', '목', '금', '토', '일'];

export const CalendarGrid = ({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('w-full', className)} {...props}>
    <div className="grid grid-cols-7 py-2 text-center text-sm text-theme-text-secondary">
      {WEEKDAYS.map((weekday, index) => (
        <span
          key={weekday}
          className={cn(
            index === 5 && 'text-theme-calendar-saturday',
            index === 6 && 'text-theme-calendar-sunday',
          )}
        >
          {weekday}
        </span>
      ))}
    </div>
    <div className="grid grid-cols-7 gap-1">
      {children}
    </div>
  </div>
);
