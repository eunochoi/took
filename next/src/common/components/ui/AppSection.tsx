import { cn } from "@/common/utils/cn";
import { HTMLAttributes, forwardRef } from "react";

export const AppSection = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <section
      ref={ref}
      className={cn("m-0 flex w-full flex-col gap-4", className)}
      {...props}
    />
  ),
);
AppSection.displayName = "AppSection";

export const AppSectionHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-baseline justify-between gap-3 py-2", className)}
      {...props}
    />
  ),
);
AppSectionHeader.displayName = "AppSectionHeader";

export const AppSectionTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn("m-0 text-xl  font-bold text-theme-text-primary", className)}
      {...props}
    />
  ),
);
AppSectionTitle.displayName = "AppSectionTitle";

export const AppSectionMeta = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("text-base  font-medium text-theme-accent", className)}
      {...props}
    />
  ),
);
AppSectionMeta.displayName = "AppSectionMeta";
