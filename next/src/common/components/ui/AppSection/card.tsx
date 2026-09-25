import { cn } from "@/common/utils/cn";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { appCardClass } from "./constants";
import { AppCardGridProps, DivProps } from "./types";

export const AppCardGrid = forwardRef<HTMLDivElement, AppCardGridProps>(
  ({ columns = 2, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "grid w-full gap-2 tablet:gap-3",
        columns === 1 && "grid-cols-1",
        columns === 2 && "grid-cols-2",
        columns === 3 && "grid-cols-3",
        className,
      )}
      {...props}
    />
  ),
);
AppCardGrid.displayName = "AppCardGrid";

export const AppCard = forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(appCardClass, "p-4 tablet:p-5", className)}
      {...props}
    />
  ),
);
AppCard.displayName = "AppCard";

export const AppSurfaceCard = forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge(appCardClass, "w-full p-3 px-4 tablet:p-5", className)}
      {...props}
    />
  ),
);
AppSurfaceCard.displayName = "AppSurfaceCard";
