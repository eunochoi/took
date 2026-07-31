import { cn } from "@/common/utils/cn";
import { HTMLAttributes, forwardRef } from "react";

interface DiaryCardShellProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'small' | 'large';
}

const DiaryCardShell = forwardRef<HTMLDivElement, DiaryCardShellProps>(
  ({ variant = 'large', className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "box-border w-full overflow-hidden rounded-theme bg-theme-surface shadow-[0_2px_12px_rgb(var(--theme-shadow-color)/0.06)] backdrop-blur-xl",
        variant === 'small' && "h-[170px]",
        variant === 'large' && "flex h-auto min-h-[250px] shrink-0 flex-col items-start justify-between max-[479px]:min-h-[200px]",
        className,
      )}
      {...props}
    />
  ),
);

DiaryCardShell.displayName = "DiaryCardShell";

export default DiaryCardShell;
