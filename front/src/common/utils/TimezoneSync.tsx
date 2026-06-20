'use client';

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { DEFAULT_TIMEZONE, TIMEZONE_COOKIE_NAME } from './date/timezoneConstants';

const getCookieValue = (name: string) => {
  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.split('=').slice(1).join('=')) : null;
};

const setTimezoneCookie = (timezone: string) => {
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';

  document.cookie = [
    `${TIMEZONE_COOKIE_NAME}=${encodeURIComponent(timezone)}`,
    'Path=/',
    'Max-Age=31536000',
    'SameSite=Lax',
    secure,
  ].filter(Boolean).join('; ');
};

export const TimezoneSync = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!browserTimezone) return;

    const cookieTimezone = getCookieValue(TIMEZONE_COOKIE_NAME);
    if (cookieTimezone === browserTimezone) return;

    setTimezoneCookie(browserTimezone);

    if (browserTimezone !== DEFAULT_TIMEZONE) {
      queryClient.invalidateQueries({ queryKey: ['diary'] });
      queryClient.invalidateQueries({ queryKey: ['habit'] });
      queryClient.invalidateQueries({ queryKey: ['habits'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    }
  }, [queryClient]);

  return null;
};
