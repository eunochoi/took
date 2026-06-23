import { cn } from "@/common/utils/cn";
import { HTMLAttributes, forwardRef } from "react";
import { AppSectionProps, DivProps } from "./types";

export const AppSection = forwardRef<HTMLElement, AppSectionProps>(
  ({ $gap, className, style, ...props }, ref) => (
    <section
      ref={ref}
      className={cn("m-0 flex w-full flex-col", className)}
      style={{ gap: $gap ?? 16, ...style }}
      {...props}
    />
  ),
);
AppSection.displayName = "AppSection";

export const AppSectionHeader = forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center justify-between gap-3", className)}
      {...props}
    />
  ),
);
AppSectionHeader.displayName = "AppSectionHeader";

export const AppSectionTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn("m-0 text-[1.35rem] font-bold text-grey-title", className)}
      {...props}
    />
  ),
);
AppSectionTitle.displayName = "AppSectionTitle";

export const AppSectionMeta = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("text-sm font-bold text-theme", className)}
      {...props}
    />
  ),
);
AppSectionMeta.displayName = "AppSectionMeta";

export const AppSubsection = forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col gap-3", className)}
      {...props}
    />
  ),
);
AppSubsection.displayName = "AppSubsection";

export const AppSubsectionTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("m-0 text-base font-bold text-grey-title", className)}
      {...props}
    />
  ),
);
AppSubsectionTitle.displayName = "AppSubsectionTitle";
