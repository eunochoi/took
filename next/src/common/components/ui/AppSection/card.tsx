import { cn } from "@/common/utils/cn";
import { forwardRef } from "react";
import { APP_CARD_CLASS } from "./constants";
import { AppCardGridProps, DivProps } from "./types";

export const AppCardGrid = forwardRef<HTMLDivElement, AppCardGridProps>(
  ({ $columns = 2, className, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("grid w-full gap-2 min-[480px]:gap-3", className)}
      style={{
        gridTemplateColumns: `repeat(${$columns}, minmax(0, 1fr))`,
        ...style,
      }}
      {...props}
    />
  ),
);
AppCardGrid.displayName = "AppCardGrid";

export const AppCard = forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(APP_CARD_CLASS, "p-4 min-[480px]:p-5", className)}
      {...props}
    />
  ),
);
AppCard.displayName = "AppCard";

export const AppSurfaceCard = forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(APP_CARD_CLASS, "w-full p-4 min-[480px]:p-5", className)}
      {...props}
    />
  ),
);
AppSurfaceCard.displayName = "AppSurfaceCard";
