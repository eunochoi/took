import { getDateStringDayDiff, getTodayStringInUserTimezone } from '../../../utils/date/userTimezone';

export const getHabitDateAccess = async (date: string) => {
  const today = await getTodayStringInUserTimezone();
  const daysAgo = getDateStringDayDiff(date, today);

  return {
    canEdit: daysAgo >= 0 && daysAgo <= 3,
    isFuture: daysAgo < 0,
  };
};
