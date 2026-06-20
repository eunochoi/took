import { cookies } from 'next/headers';

import { DEFAULT_TIMEZONE, TIMEZONE_COOKIE_NAME } from './timezoneConstants';

export { DEFAULT_TIMEZONE, TIMEZONE_COOKIE_NAME };

const isValidTimezone = (timezone: string) => {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: timezone });
    return true;
  } catch {
    return false;
  }
};

export const getUserTimezone = async () => {
  const cookieStore = await cookies();
  const timezoneCookie = cookieStore.get(TIMEZONE_COOKIE_NAME)?.value;
  const timezone = timezoneCookie ? decodeURIComponent(timezoneCookie) : DEFAULT_TIMEZONE;

  if (isValidTimezone(timezone)) {
    return timezone;
  }

  return DEFAULT_TIMEZONE;
};

export const formatDateInTimezone = (date: Date, timezone: string) => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);

  const year = parts.find((part) => part.type === 'year')?.value;
  const month = parts.find((part) => part.type === 'month')?.value;
  const day = parts.find((part) => part.type === 'day')?.value;

  return `${year}-${month}-${day}`;
};

export const addDaysToDateString = (dateString: string, days: number) => {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() + days);

  return [
    date.getUTCFullYear(),
    String(date.getUTCMonth() + 1).padStart(2, '0'),
    String(date.getUTCDate()).padStart(2, '0'),
  ].join('-');
};

export const getDateStringDayDiff = (prevDateString: string, currentDateString: string) => {
  const [prevYear, prevMonth, prevDay] = prevDateString.split('-').map(Number);
  const [currentYear, currentMonth, currentDay] = currentDateString.split('-').map(Number);
  const prevTime = Date.UTC(prevYear, prevMonth - 1, prevDay);
  const currentTime = Date.UTC(currentYear, currentMonth - 1, currentDay);

  return (currentTime - prevTime) / 86400000;
};

export const getTodayStringInUserTimezone = async () => {
  const timezone = await getUserTimezone();
  return formatDateInTimezone(new Date(), timezone);
};

export const getDaysAgoStringInUserTimezone = async (days: number) => {
  const todayString = await getTodayStringInUserTimezone();
  return addDaysToDateString(todayString, -days);
};

export const getCurrentYearInUserTimezone = async () => {
  const todayString = await getTodayStringInUserTimezone();
  return Number(todayString.split('-')[0]);
};
