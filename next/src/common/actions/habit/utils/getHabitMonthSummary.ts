import { differenceInCalendarDays } from 'date-fns';

import type { HabitMonthData } from '../../../types/calendar';
import { parseLocalDate } from '../../../utils/date/parseLocalDate';

interface Params {
  monthStart: string;
  monthEnd: string;
  createdDate: string;
  today: string;
  lastLockedDate: string;
  completedDates: string[];
}

export const getHabitMonthSummary = ({
  monthStart, monthEnd, createdDate, today, lastLockedDate, completedDates,
}: Params): HabitMonthData['summary'] => {
  const targetStart = createdDate > monthStart ? createdDate : monthStart;
  const hasTargetDays = targetStart <= monthEnd;
  const targetDays = hasTargetDays
    ? differenceInCalendarDays(parseLocalDate(monthEnd), parseLocalDate(targetStart)) + 1
    : 0;
  const completedThrough = today < monthEnd ? today : monthEnd;
  const lockedThrough = lastLockedDate < monthEnd ? lastLockedDate : monthEnd;

  let completedCount = 0;
  let lockedCompletedCount = 0;
  for (const date of completedDates) {
    if (date < targetStart || date > monthEnd) continue;
    if (date <= completedThrough) completedCount += 1;
    if (date <= lockedThrough) lockedCompletedCount += 1;
  }

  const lockedTargetDays = hasTargetDays
    ? Math.max(0, differenceInCalendarDays(parseLocalDate(lockedThrough), parseLocalDate(targetStart)) + 1)
    : 0;

  return {
    periodStart: hasTargetDays ? targetStart : null,
    periodEnd: hasTargetDays ? monthEnd : null,
    targetDays,
    completedCount,
    completionRate: targetDays > 0 ? Number(((completedCount / targetDays) * 100).toFixed(1)) : null,
    missedCount: Math.max(0, lockedTargetDays - lockedCompletedCount),
  };
};
