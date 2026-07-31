import { cn } from "@/common/utils/cn";
import { HTMLAttributes, forwardRef } from "react";
import { appCardClass } from "./constants";
import { DivProps, ParagraphProps } from "./types";

export const AppStatCard = forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        appCardClass,
        "flex min-h-[100px] flex-col justify-between gap-2 px-2 py-4 tablet:min-h-[110px] tablet:p-4",
        className,
      )}
      {...props}
    />
  ),
);
AppStatCard.displayName = "AppStatCard";

export const AppStatLabel = forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("m-0 text-center text-sm text-theme-text-secondary", className)}
      {...props}
    />
  ),
);
AppStatLabel.displayName = "AppStatLabel";

export const AppStatValueWrapper = forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-baseline justify-center gap-1", className)}
      {...props}
    />
  ),
);
AppStatValueWrapper.displayName = "AppStatValueWrapper";

export const AppStatValue = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("text-2xl font-extrabold leading-none text-theme-accent tablet:text-xl", className)}
      {...props}
    />
  ),
);
AppStatValue.displayName = "AppStatValue";

export const AppStatUnit = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("text-sm font-bold text-theme-text-secondary", className)}
      {...props}
    />
  ),
);
AppStatUnit.displayName = "AppStatUnit";
