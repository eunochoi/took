import { ReactNode } from "react";

import { AppCard } from "@/common/components/ui/AppSection/card";
import { AppSection } from "@/common/components/ui/AppSection/section";

interface SettingSectionCardProps {
  children: ReactNode;
}

export const SettingSectionCard = ({ children }: SettingSectionCardProps) => {
  return (
    <AppCard>
      <AppSection className="gap-6">
        {children}
      </AppSection>
    </AppCard>
  );
};
