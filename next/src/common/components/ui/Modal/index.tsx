'use client';

import { cn } from '@/common/utils/cn';
import { motion, useIsPresent, useReducedMotion } from 'framer-motion';
import { ReactNode, useEffect } from 'react';

export type ModalVariant = 'top' | 'bottom' | 'center-base' | 'full';

export interface ResponsiveModalVariant {
  base: ModalVariant;
  tablet: ModalVariant;
  desktop: ModalVariant;
}

export type ModalAnimation = 'top' | 'bottom' | 'left' | 'right' | 'fade';

interface ModalProps {
  ariaLabel: string;
  children: ReactNode;
  onClose: () => void;
  variant: ResponsiveModalVariant;
  overlayClassName?: string;
  dismissible?: boolean;
  animation?: ModalAnimation | ModalAnimation[];
}

const overlayClass = 'fixed left-0 top-0 flex h-[100dvh] w-[100dvw] bg-theme-overlay/5 backdrop-blur-xl';
const contentClass = 'flex min-h-0 flex-col overflow-hidden bg-theme-bg';

const baseOverlayVariantClass: Record<ModalVariant, string> = {
  top: 'items-start justify-center',
  bottom: 'items-end justify-center',
  'center-base': 'items-center justify-center',
  full: 'items-stretch justify-stretch',
};

const tabletOverlayVariantClass: Record<ModalVariant, string> = {
  top: 'tablet:items-start tablet:justify-center',
  bottom: 'tablet:items-end tablet:justify-center',
  'center-base': 'tablet:items-center tablet:justify-center',
  full: 'tablet:items-stretch tablet:justify-stretch',
};

const desktopOverlayVariantClass: Record<ModalVariant, string> = {
  top: 'desktop:items-start desktop:justify-center',
  bottom: 'desktop:items-end desktop:justify-center',
  'center-base': 'desktop:items-center desktop:justify-center',
  full: 'desktop:items-stretch desktop:justify-stretch',
};

const baseContentVariantClass: Record<ModalVariant, string> = {
  top: 'h-auto max-h-[calc(100dvh-var(--mobileHeader))] w-full rounded-b-3xl shadow-theme-panel-mobile',
  bottom: 'h-auto max-h-[calc(100dvh-var(--mobileHeader))] w-full rounded-t-3xl shadow-theme-panel-mobile',
  'center-base': 'h-[85dvh] min-w-[400px] w-[40dvw] max-w-[calc(100dvw-32px)] rounded-theme shadow-theme-panel',
  full: 'h-full w-full rounded-none',
};

const tabletContentVariantClass: Record<ModalVariant, string> = {
  top: 'tablet:h-auto tablet:max-h-[85dvh] tablet:w-full tablet:rounded-b-3xl tablet:shadow-theme-panel-mobile',
  bottom: 'tablet:h-auto tablet:max-h-[85dvh] tablet:w-full tablet:rounded-t-3xl tablet:shadow-theme-panel-mobile',
  'center-base': 'tablet:h-[85dvh] tablet:min-w-[400px] tablet:w-[40dvw] tablet:max-w-[calc(100dvw-32px)] tablet:rounded-theme tablet:shadow-theme-panel',
  full: 'tablet:h-full tablet:w-full tablet:rounded-none tablet:shadow-none',
};

const desktopContentVariantClass: Record<ModalVariant, string> = {
  top: 'desktop:h-auto desktop:max-h-[85dvh] desktop:w-full desktop:rounded-b-3xl desktop:shadow-theme-panel-mobile',
  bottom: 'desktop:h-auto desktop:max-h-[85dvh] desktop:w-full desktop:rounded-t-3xl desktop:shadow-theme-panel-mobile',
  'center-base': 'desktop:h-[85dvh] desktop:min-w-[400px] desktop:w-[40dvw] desktop:max-w-[calc(100dvw-32px)] desktop:rounded-theme desktop:shadow-theme-modal',
  full: 'desktop:h-full desktop:w-full desktop:rounded-none desktop:shadow-none',
};

export const Modal = ({
  ariaLabel,
  children,
  onClose,
  variant,
  overlayClassName,
  dismissible = true,
  animation = 'fade',
}: ModalProps) => {
  const isPresent = useIsPresent();
  const reduceMotion = useReducedMotion();
  const effects = typeof animation === 'string' ? [animation] : animation;
  const offset = reduceMotion ? 0 : 50;
  const hiddenPosition = {
    x: effects.includes('left') ? -offset : effects.includes('right') ? offset : 0,
    y: effects.includes('top') ? -offset : effects.includes('bottom') ? offset : 0,
  };
  const hiddenOpacity = effects.includes('fade') ? 0 : 1;
  const transition = { duration: reduceMotion ? 0 : 0.3, ease: 'easeInOut' as const };

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
      initial={{ opacity: hiddenOpacity }}
      animate={{ opacity: 1 }}
      exit={{ opacity: hiddenOpacity, pointerEvents: 'none' }}
      transition={transition}
      className={cn(
        overlayClass,
        baseOverlayVariantClass[variant.base],
        tabletOverlayVariantClass[variant.tablet],
        desktopOverlayVariantClass[variant.desktop],
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
