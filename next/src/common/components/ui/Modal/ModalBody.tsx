'use client';

import { ScrollContainer } from "@/common/components/ui/ScrollContainer";
import { cn } from "@/common/utils/cn";
import { motion, useReducedMotion } from "framer-motion";
import { HTMLAttributes } from "react";

interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {
  withScrollFade?: boolean;
  showScrollToTop?: boolean;
  contentMode?: 'scroll' | 'fill';
}

export const ModalBody = ({
  children,
  className,
  withScrollFade = false,
  showScrollToTop = false,
  contentMode = 'scroll',
  ...props
}: ModalBodyProps) => {
  const prefersReducedMotion = useReducedMotion();
  const shouldReduceMotion = prefersReducedMotion ?? false;
  const isFillMode = contentMode === 'fill';

  return (
    <ScrollContainer
      className="flex min-h-0 flex-1"
      contentClassName={cn(
        "flex flex-col items-center justify-start",
        isFillMode ? "h-full !min-h-0" : "min-h-full",
      )}
      scrollAreaClassName={cn(
        "flex h-full w-full flex-col items-center justify-start",
        isFillMode && "!overflow-y-hidden",
        className,
      )}
      showScrollFade={!isFillMode && withScrollFade}
      showScrollToTop={showScrollToTop}
      {...props}
    >
      <motion.div
        className={cn(
          "flex w-full flex-col items-center justify-start",
          isFillMode ? "h-full min-h-0" : "min-h-full",
        )}
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0.2 : 0.3, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </ScrollContainer>
  );
};
