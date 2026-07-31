import { cn } from "@/common/utils/cn";
import { HTMLAttributes, forwardRef } from "react";

export type PageContentProps = HTMLAttributes<HTMLDivElement>;

export const PageContent = forwardRef<HTMLDivElement, PageContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex h-auto w-full max-w-[650px] flex-col",
        "max-[479px]:px-[4dvw] max-[479px]:pb-[var(--mobileNav)] max-[479px]:pt-0",
        "min-[480px]:px-9 min-[480px]:pb-9 min-[480px]:pt-9",
        className,
      )}
      {...props}
    />
  ),
);
PageContent.displayName = "PageContent";
