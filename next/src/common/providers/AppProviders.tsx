'use client';

import { ReactNode } from "react";

import TopLoader from "../components/ui/TopLoader";
import { ScrollProvider } from "../hooks/useScrollContext";
import { SettingsProvider } from "../settings/SettingsProvider";
import { TimezoneSync } from "../utils/TimezoneSync";

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <SettingsProvider>
      <ScrollProvider>
        <TimezoneSync />
        <TopLoader />
        {children}
      </ScrollProvider>
    </SettingsProvider>
  );
};
