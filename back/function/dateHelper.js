const { formatInTimeZone } = require('date-fns-tz');
const { subDays } = require('date-fns');

function validateDateFormat(dateString) {
  if (!dateString || typeof dateString !== 'string') {
    return false;
  }

  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) {
    return false;
  }

  // 잘못된 날짜(예: 2월 30일) 체크
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  return date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day;
}

function getUserTimezone(req) {
  const timezone = req.cookies?.timezone || 'UTC';
  try {
    Intl.DateTimeFormat(undefined, { timeZone: timezone });
    return timezone;
  } catch (e) {
    console.warn(`Invalid timezone: ${timezone}, using UTC`);
    return 'UTC';
  }
}

function getTodayInTimezone(timezone) {
  return formatInTimeZone(new Date(), timezone, 'yyyy-MM-dd');
}

function getDaysAgoInTimezone(days, timezone) {
  const date = subDays(new Date(), days);
  return formatInTimeZone(date, timezone, 'yyyy-MM-dd');
}

function getMonthRange(monthString) {
  if (!monthString || !/^\d{4}-\d{2}$/.test(monthString)) {
    throw new Error('Invalid month format. Expected yyyy-MM');
  }

  const [year, month] = monthString.split('-').map(Number);
  const lastDay = new Date(year, month, 0).getDate();

  return {
    startDate: `${year}-${String(month).padStart(2, '0')}-01`,
    endDate: `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`
  };
}

function getYearRange(year) {
  const y = typeof year === 'string' ? parseInt(year, 10) : year;

  if (isNaN(y) || y < 1900 || y > 2100) {
    throw new Error('Invalid year. Expected 1900-2100');
  }

  return {
    startDate: `${y}-01-01`,
    endDate: `${y}-12-31`
  };
}

module.exports = {
  validateDateFormat,
  getUserTimezone,
  getTodayInTimezone,
  getDaysAgoInTimezone,
  getMonthRange,
  getYearRange
};
