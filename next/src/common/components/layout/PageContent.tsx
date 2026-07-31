'use client';

import { cn } from "@/common/utils/cn";
import { HTMLMotionProps, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";

export type PageContentProps = HTMLMotionProps<'div'>;

export const PageContent = forwardRef<HTMLDivElement, PageContentProps>(
  ({ className, ...props }, ref) => {
    const pathname = usePathname();
    const prefersReducedMotion = useReducedMotion();
    const shouldReduceMotion = prefersReducedMotion ?? false;

    return (
      <motion.div
        ref={ref}
        key={pathname ?? 'page-content'}
        className={cn(
          "flex h-auto w-full max-w-[650px] flex-col",
          "max-tablet:px-[4dvw] max-tablet:pb-[var(--mobileNav)] max-tablet:pt-0",
          "tablet:px-9 tablet:pb-9 tablet:pt-9",
          className,
        )}
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0.2 : 0.3, ease: 'easeOut' }}
        {...props}
      />
    );
  },
);
PageContent.displayName = "PageContent";
