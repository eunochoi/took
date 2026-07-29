import { ReactNode } from "react";

import { AppCard } from "@/common/components/ui/AppSection/card";
import { AppSection } from "@/common/components/ui/AppSection/section";

interface SettingSectionCardProps {
  children: ReactNode;
  gap?: number;
}

export const SettingSectionCard = ({ children, gap }: SettingSectionCardProps) => {
  return (
    <AppCard>
      <AppSection $gap={gap}>
        {children}
      </AppSection>
    </AppCard>
  );
};
