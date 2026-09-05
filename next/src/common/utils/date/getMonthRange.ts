import { endOfMonth, format } from 'date-fns';

import { isValidLocalDateString } from './isValidLocalDateString';
import { parseLocalDate } from './parseLocalDate';

export const getMonthRange = (month: string) => {
  if (typeof month !== 'string' || !/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) return null;

  const startDate = `${month}-01`;
  if (!isValidLocalDateString(startDate)) return null;

  return {
    startDate,
    endDate: format(endOfMonth(parseLocalDate(startDate)), 'yyyy-MM-dd'),
  };
};
