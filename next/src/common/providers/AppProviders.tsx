'use client';

import { ReactNode } from "react";

import { SettingsProvider } from "../settings/SettingsProvider";
import { TimezoneSync } from "../utils/TimezoneSync";

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <SettingsProvider>
      <TimezoneSync />
      {children}
    </SettingsProvider>
  );
};
