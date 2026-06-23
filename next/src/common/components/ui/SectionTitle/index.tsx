import { cn } from "@/common/utils/cn";
import { HTMLAttributes, forwardRef } from "react";

type SpanProps = HTMLAttributes<HTMLSpanElement>;

export const SectionTitle = forwardRef<HTMLSpanElement, SpanProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("inline-flex items-center gap-2 text-xl font-medium leading-[1.2] text-theme", className)}
      {...props}
    />
  ),
);
SectionTitle.displayName = "SectionTitle";

export const SectionTitleIcon = forwardRef<HTMLSpanElement, SpanProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex h-[1.2em] w-[1.2em] shrink-0 items-center justify-center text-xl leading-none text-theme [&>svg]:h-full [&>svg]:w-full [&>svg]:fill-current",
        className,
      )}
      {...props}
    />
  ),
);
SectionTitleIcon.displayName = "SectionTitleIcon";
