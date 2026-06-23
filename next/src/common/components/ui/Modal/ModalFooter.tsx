'use client';

import { cn } from "@/common/utils/cn";
import { HTMLAttributes, forwardRef } from "react";

type ModalFooterProps = HTMLAttributes<HTMLDivElement>;

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex h-[var(--mobileHeader)] w-full shrink-0 items-center justify-center",
          className,
        )}
        {...props}
      />
    );
  },
);

ModalFooter.displayName = "ModalFooter";
