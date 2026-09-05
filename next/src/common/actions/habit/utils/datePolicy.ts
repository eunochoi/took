import { addDaysToDateString, getTodayStringInUserTimezone } from '../../../utils/date/userTimezone';

const EDITABLE_DAY_COUNT = 4;

export const getHabitDateWindow = (today: string) => ({
  editableFrom: addDaysToDateString(today, -(EDITABLE_DAY_COUNT - 1)),
  lastLockedDate: addDaysToDateString(today, -EDITABLE_DAY_COUNT),
});

export const getHabitDateAccess = async (date: string, options: {
  today?: string;
} = {}) => {
  const today = options.today ?? await getTodayStringInUserTimezone();
  const { editableFrom } = getHabitDateWindow(today);
  const isFuture = date > today;
  return {
    canEdit: !isFuture && date >= editableFrom,
    isFuture,
  };
};
