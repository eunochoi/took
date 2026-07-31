import { cn } from "@/common/utils/cn";
import { forwardRef } from "react";
import { appCardClass } from "./constants";
import { DivProps, ParagraphProps } from "./types";

export const AppInfoCard = forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(appCardClass, "flex flex-col gap-3 px-4 py-5", className)}
      {...props}
    />
  ),
);
AppInfoCard.displayName = "AppInfoCard";

export const AppInfoContent = forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex w-full justify-start items-center gap-3 text-pretty text-justify text-sm leading-normal text-theme-text-primary",
        className,
      )}
      {...props}
    />
  ),
);
AppInfoContent.displayName = "AppInfoContent";

export const AppInfoText = forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("m-0 break-words text-justify text-sm leading-normal text-theme-accent", className)}
      {...props}
    />
  ),
);
AppInfoText.displayName = "AppInfoText";

export const AppNoteCard = forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        appCardClass,
        "m-0 break-keep px-4 py-5 text-justify text-sm leading-normal text-theme-accent",
        className,
      )}
      {...props}
    />
  ),
);
AppNoteCard.displayName = "AppNoteCard";
