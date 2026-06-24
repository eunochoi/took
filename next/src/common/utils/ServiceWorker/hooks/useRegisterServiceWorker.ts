'use client';

import { useEffect } from 'react';

export const useRegisterServiceWorker = () => {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    let cancelled = false;

    const register = async () => {
      try {
        const existingRegistrations =
          await navigator.serviceWorker.getRegistrations();

        const alreadyRegistered = existingRegistrations.some((registration) => {
          return registration.active?.scriptURL.endsWith('/sw.js');
        });

        if (alreadyRegistered) {
          console.log('Service Worker already registered');
          return;
        }

        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
          updateViaCache: 'none',
        });

        if (!cancelled) {
          console.log('Service Worker registered:', registration);
        }
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    };

    register();

    return () => {
      cancelled = true;
    };
  }, []);
};