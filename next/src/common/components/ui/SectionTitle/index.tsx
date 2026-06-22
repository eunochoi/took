import { HTMLAttributes, forwardRef } from "react";

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

type SpanProps = HTMLAttributes<HTMLSpanElement>;

export const SectionTitle = forwardRef<HTMLSpanElement, SpanProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cx("inline-flex items-center gap-2 text-xl font-medium leading-[1.2] text-theme", className)}
      {...props}
    />
  ),
);
SectionTitle.displayName = "SectionTitle";

export const SectionTitleIcon = forwardRef<HTMLSpanElement, SpanProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cx(
        "inline-flex h-[1.2em] w-[1.2em] shrink-0 items-center justify-center text-xl leading-none text-theme [&>svg]:h-full [&>svg]:w-full [&>svg]:fill-current",
        className,
      )}
      {...props}
    />
  ),
);
SectionTitleIcon.displayName = "SectionTitleIcon";
