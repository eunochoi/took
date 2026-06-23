import { ReactNode } from "react";

import { AppCard } from "@/common/components/ui/AppSection/card";
import { AppSection, AppSectionTitle } from "@/common/components/ui/AppSection/section";

interface SettingSectionCardProps {
  title: string;
  children: ReactNode;
  gap?: number;
}

export const SettingSectionCard = ({ title, children, gap }: SettingSectionCardProps) => {
  return (
    <AppCard>
      <AppSection $gap={gap}>
        <AppSectionTitle>{title}</AppSectionTitle>
        {children}
      </AppSection>
    </AppCard>
  );
};
