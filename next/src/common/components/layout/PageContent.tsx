'use client';

import { cn } from '@/common/utils/cn';
import {
  HTMLMotionProps,
  motion,
  useReducedMotion,
} from 'framer-motion';
import { forwardRef } from 'react';

export type PageContentProps = HTMLMotionProps<'div'>;

export const PageContent = forwardRef<
  HTMLDivElement,
  PageContentProps
>(({ className, ...props }, ref) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={cn(
        'flex h-auto w-full flex-col',
        className,
      )}
      initial={
        prefersReducedMotion
          ? false
          : { y: 16 }
      }
      animate={{
        y: 0
      }}
      transition={{
        duration: 0.5,
        ease: 'easeOut',
      }}
      {...props}
    />
  );
});

PageContent.displayName = 'PageContent';