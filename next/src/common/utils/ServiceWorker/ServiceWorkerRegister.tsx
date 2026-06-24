'use client';

import { useRegisterServiceWorker } from "./hooks/useRegisterServiceWorker";

export const ServiceWorkerRegister = () => {
  useRegisterServiceWorker();

  return null;
};