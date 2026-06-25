import { cn } from "@/common/utils/cn";
import { HTMLAttributes, forwardRef } from "react";
import { APP_CARD_CLASS } from "./constants";
import { DivProps, ParagraphProps } from "./types";

export const AppStatCard = forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        APP_CARD_CLASS,
        "flex min-h-[100px] flex-col justify-between gap-2 px-2 py-4 min-[480px]:min-h-[110px] min-[480px]:p-4",
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
      className={cn("m-0 text-center text-base text-[#8a8da3]", className)}
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
      className={cn("text-2xl font-extrabold leading-none text-theme min-[480px]:text-xl", className)}
      {...props}
    />
  ),
);
AppStatValue.displayName = "AppStatValue";

export const AppStatUnit = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("text-sm font-bold text-[#8a8da3]", className)}
      {...props}
    />
  ),
);
AppStatUnit.displayName = "AppStatUnit";
