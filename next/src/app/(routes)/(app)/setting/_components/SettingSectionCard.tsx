import { ReactNode } from "react";

import { AppSection } from "@/common/components/ui/AppSection/section";
import { cn } from "@/common/utils/cn";

interface SettingSectionCardProps {
  children: ReactNode;
  className?: string;
}

export const SettingSectionCard = ({ children, className }: SettingSectionCardProps) => {
  return (
    <div className={cn("w-full py-6 first:pt-0 last:pb-0", className)}>
      <AppSection className="gap-0">
        {children}
      </AppSection>
    </div>
  );
};
