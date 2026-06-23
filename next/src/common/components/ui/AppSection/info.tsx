import { cn } from "@/common/utils/cn";
import { forwardRef } from "react";
import { APP_CARD_CLASS } from "./constants";
import { DivProps, ParagraphProps } from "./types";

export const AppInfoCard = forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(APP_CARD_CLASS, "flex flex-col gap-3 px-4 py-5 min-[480px]:px-5 min-[480px]:py-6", className)}
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
        "flex w-full items-start justify-center gap-3 [&>span]:flex-1 [&>span]:break-words [&>span]:text-justify [&>span]:text-sm [&>span]:leading-normal [&>span]:text-grey-title",
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
      className={cn("m-0 break-words text-justify text-sm leading-normal text-theme", className)}
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
        APP_CARD_CLASS,
        "m-0 break-words px-4 py-5 text-justify text-base leading-normal text-grey-title min-[480px]:px-5 min-[480px]:py-6",
        className,
      )}
      {...props}
    />
  ),
);
AppNoteCard.displayName = "AppNoteCard";
