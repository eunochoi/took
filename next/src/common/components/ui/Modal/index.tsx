'use client';

import { cn } from '@/common/utils/cn';
import { motion, useIsPresent, useReducedMotion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';

export type ModalVariant = 'top' | 'bottom' | 'center-base' | 'right' | 'full';

export interface ResponsiveModalVariant {
  base: ModalVariant;
  tablet: ModalVariant;
  desktop: ModalVariant;
}

interface ModalProps {
  ariaLabel: string;
  children: ReactNode;
  onClose: () => void;
  variant: ResponsiveModalVariant;
  overlayClassName?: string;
  contentClassName?: string;
  dismissible?: boolean;
}

const overlayClass = 'fixed inset-0 bg-theme-overlay/25 backdrop-blur-sm';
const contentClass = 'bg-theme-accent-light flex min-h-0 flex-col overflow-hidden';

const baseContentVariantClass: Record<ModalVariant, string> = {
  top: 'absolute inset-x-0 top-0 mx-auto h-fit max-h-[calc(100dvh-var(--modalHeader))] w-full rounded-b-3xl shadow-theme-panel-mobile landscape-short:max-h-[calc(100dvh-12px)]',
  bottom: 'absolute inset-x-0 bottom-0 mx-auto h-fit max-h-[calc(100dvh-var(--modalHeader))] w-full rounded-t-3xl shadow-theme-panel-mobile landscape-short:max-h-[calc(100dvh-12px)]',
  'center-base': 'absolute inset-0 m-auto h-[85dvh] min-w-[400px] w-[40dvw] max-w-[calc(100dvw-32px)] rounded-theme shadow-theme-panel',
  right: 'absolute inset-0 h-full w-full rounded-none',
  full: 'absolute inset-0 h-full w-full rounded-none',
};

const tabletContentVariantClass: Record<ModalVariant, string> = {
  top: 'tablet:h-fit tablet:max-h-[85dvh] tablet:w-[500px] tablet:rounded-b-3xl tablet:shadow-theme-panel',
  bottom: 'tablet:h-fit tablet:max-h-[85dvh] tablet:w-[500px] tablet:rounded-t-3xl tablet:shadow-theme-panel',
  'center-base': 'tablet:h-[85dvh] tablet:min-w-[400px] tablet:w-[40dvw] tablet:max-w-[calc(100dvw-32px)] tablet:rounded-theme tablet:shadow-theme-panel',
  right: 'tablet:inset-y-0 tablet:right-0 tablet:left-auto tablet:h-[100dvh] tablet:w-[500px] tablet:rounded-l-3xl tablet:rounded-r-none tablet:shadow-theme-modal',
  full: 'tablet:h-full tablet:w-full tablet:rounded-none tablet:shadow-none',
};

const desktopContentVariantClass: Record<ModalVariant, string> = {
  top: 'desktop:h-auto desktop:max-h-[85dvh] desktop:w-[500px] desktop:rounded-b-3xl desktop:shadow-theme-panel',
  bottom: 'desktop:h-auto desktop:max-h-[85dvh] desktop:w-[500px] desktop:rounded-t-3xl desktop:shadow-theme-panel',
  'center-base': 'desktop:h-[85dvh] desktop:min-w-[400px] desktop:w-[40dvw] desktop:max-w-[calc(100dvw-32px)] desktop:rounded-theme desktop:shadow-theme-modal',
  right: 'desktop:inset-y-0 desktop:right-0 desktop:left-auto desktop:h-[100dvh] desktop:w-[500px] desktop:rounded-l-3xl desktop:rounded-r-none desktop:shadow-theme-modal',
  full: 'desktop:h-full desktop:w-full desktop:rounded-none desktop:shadow-none',
};

const getActiveVariant = ({ base, tablet, desktop }: ResponsiveModalVariant) => {
  if (typeof window === 'undefined') return base;
  if (window.innerWidth >= 1024) return desktop;
  if (window.innerWidth >= 480) return tablet;
  return base;
};

export const Modal = ({
  ariaLabel,
  children,
  onClose,
  variant,
  overlayClassName,
  contentClassName,
  dismissible = true,
}: ModalProps) => {
  const isPresent = useIsPresent();
  const reduceMotion = useReducedMotion();
  const [activeVariant, setActiveVariant] = useState(() => getActiveVariant(variant));
  const offset = reduceMotion ? 0 : 50;
  const hiddenPosition = activeVariant === 'top' || activeVariant === 'bottom'
    ? { x: 0, y: activeVariant === 'top' ? -offset : offset }
    : activeVariant === 'right'
      ? { x: offset, y: 0 }
      : { x: 0, y: 0 };
  const transition = { duration: reduceMotion ? 0 : 0.3, ease: 'easeInOut' as const };

  useEffect(() => {
    const updateActiveVariant = () => setActiveVariant(getActiveVariant(variant));
    updateActiveVariant();
    window.addEventListener('resize', updateActiveVariant);
    return () => window.removeEventListener('resize', updateActiveVariant);
  }, [variant]);

  useEffect(() => {
    if (!dismissible || !isPresent) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !event.defaultPrevented) {
        event.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [dismissible, isPresent, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, pointerEvents: 'none' }}
      transition={transition}
      className={cn(
        overlayClass,
        overlayClassName,
      )}
      onClick={() => {
        if (dismissible && isPresent) onClose();
      }}
    >
      <motion.div
        initial={hiddenPosition}
        animate={{ x: 0, y: 0 }}
        exit={hiddenPosition}
        transition={transition}
        aria-label={ariaLabel}
        aria-modal="true"
        className={cn(
          contentClass,
          contentClassName,
          baseContentVariantClass[variant.base],
          tabletContentVariantClass[variant.tablet],
          desktopContentVariantClass[variant.desktop],
        )}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
