import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/common/utils/cn";

interface DiaryCardShellProps extends HTMLAttributes<HTMLDivElement> {
  $type?: 'small' | 'large';
}

const DiaryCardShell = forwardRef<HTMLDivElement, DiaryCardShellProps>(
  ({ $type = 'large', className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "box-border w-full overflow-hidden rounded-[20px] bg-white/90 shadow-[0_2px_12px_rgba(0,0,0,0.06)] backdrop-blur-xl",
        $type === 'small' && "h-[180px]",
        $type === 'large' && "flex h-auto min-h-[250px] shrink-0 flex-col items-start justify-between max-[479px]:min-h-[200px]",
        className,
      )}
      {...props}
    />
  ),
);

DiaryCardShell.displayName = "DiaryCardShell";

export default DiaryCardShell;
