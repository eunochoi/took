import { ReactNode } from "react";

import { AppCard } from "@/common/components/ui/AppSection/card";
import { AppSection } from "@/common/components/ui/AppSection/section";
import { cn } from "@/common/utils/cn";

interface SettingSectionCardProps {
  children: ReactNode;
  className?: string;
}

export const SettingSectionCard = ({ children, className }: SettingSectionCardProps) => {
  return (
    <AppCard className={cn(className)}>
      <AppSection className="gap-6">
        {children}
      </AppSection>
    </AppCard>
  );
};
