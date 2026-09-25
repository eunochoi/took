import { ReactNode } from "react";

import { cn } from "@/common/utils/cn";

interface SettingSectionCardProps {
  children: ReactNode;
  className?: string;
}

export const SettingSectionCard = ({ children, className }: SettingSectionCardProps) => {
  return (
    <div className={cn("flex flex-col w-full", className)}>
      {children}
    </div>
  );
};
