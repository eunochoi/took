import { cn } from "@/common/utils/cn";
import { forwardRef } from "react";

interface Props {
  edge: 'top' | 'bottom';
}

const positionClass = {
  top: "top-0",
  bottom: "bottom-0",
} as const;

export const ScrollBoundary = forwardRef<HTMLDivElement, Props>(({ edge }, ref) => {
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 h-1",
        positionClass[edge],
      )}
    />
  );
});

ScrollBoundary.displayName = 'ScrollBoundary';
