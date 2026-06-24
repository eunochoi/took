import { cn } from "@/common/utils/cn";
import { Children, HTMLAttributes, ReactElement, cloneElement, forwardRef, isValidElement } from "react";

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
  ({ className, children, ...props }, ref) => {
    const icon = Children.map(children, (child) => {
      if (!isValidElement<{ className?: string }>(child)) return child;

      return cloneElement(child as ReactElement<{ className?: string }>, {
        className: cn("h-full w-full fill-current", child.props.className),
      });
    });

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex h-[1.2em] w-[1.2em] shrink-0 items-center justify-center text-xl leading-none text-theme",
          className,
        )}
        {...props}
      >
        {icon}
      </span>
    );
  },
);
SectionTitleIcon.displayName = "SectionTitleIcon";
