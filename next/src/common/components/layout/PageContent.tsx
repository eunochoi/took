import { cn } from "@/common/utils/cn";
import { HTMLAttributes, forwardRef } from "react";

export type PageContentProps = HTMLAttributes<HTMLDivElement>;

export const PageContent = forwardRef<HTMLDivElement, PageContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex h-auto w-full max-w-[650px] flex-col",
        "max-tablet:px-[4dvw] max-tablet:pb-[var(--mobileNav)] max-tablet:pt-0",
        "tablet:px-9 tablet:pb-9 tablet:pt-9",
        className,
      )}
      {...props}
    />
  ),
);
PageContent.displayName = "PageContent";
