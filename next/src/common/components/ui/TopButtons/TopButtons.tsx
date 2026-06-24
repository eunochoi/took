'use client';

import { cn } from "@/common/utils/cn";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  className?: string;
  classname?: string;
}

const TopButtons = ({ children, className, classname }: Props) => {
  return (
    <div
      className={cn(
        "sticky left-0 right-0 top-0 z-[91] flex w-full shrink-0 items-center justify-end gap-1.5",
        "max-[479px]:h-[var(--mobileHeader)] max-[479px]:px-[4dvw]",
        "min-[480px]:h-[var(--mobileHeader)] min-[480px]:px-5 min-[1025px]:px-12",
        className,
        classname,
      )}
    >
      {children}
    </div>
  );
};

export default TopButtons;
