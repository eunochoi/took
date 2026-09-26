'use client';

import { motion, useIsPresent, useReducedMotion } from 'framer-motion';
import { ReactNode, useLayoutEffect, useRef } from 'react';

interface PanelDialogProps {
  ariaLabel: string;
  children: ReactNode;
  onClose: () => void;
  dismissible?: boolean;
}

// 라우트 기반 화면을 패널로 표시한다. 닫힌 뒤의 라우트 이동은 상위 View가 처리한다.
export const PanelDialog = ({
  ariaLabel,
  children,
  onClose,
  dismissible = true,
}: PanelDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isPresent = useIsPresent();
  const reduceMotion = useReducedMotion();
  const offset = reduceMotion ? 0 : 'var(--panel-offset)';
  const transition = { duration: reduceMotion ? 0 : 0.3, ease: 'easeInOut' as const };

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (dialog && !dialog.open) dialog.showModal();

    return () => {
      if (dialog?.open) dialog.close();
      if (trigger?.isConnected) trigger.focus();
    };
  }, []);

  useLayoutEffect(() => {
    if (contentRef.current) contentRef.current.inert = !isPresent;
  }, [isPresent]);

  return (
    <dialog
      ref={dialogRef}
      aria-label={ariaLabel}
      className="fixed inset-0 h-[100dvh] w-full overflow-hidden"
      onCancel={(event) => {
        event.preventDefault();
        if (dismissible && isPresent) onClose();
      }}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-theme-overlay/25 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, pointerEvents: 'none' }}
        transition={transition}
        onClick={() => {
          if (dismissible && isPresent) onClose();
        }}
      />
      <motion.div
        ref={contentRef}
        className="absolute inset-0 flex h-full min-h-0 w-full flex-col overflow-hidden bg-theme-accent-light [--panel-offset:0px] tablet:inset-y-0 tablet:right-0 tablet:left-auto tablet:h-[100dvh] tablet:w-[500px] tablet:max-w-full tablet:rounded-l-3xl tablet:shadow-theme-modal tablet:[--panel-offset:50px]"
        initial={{ opacity: 0, x: offset }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: offset }}
        transition={transition}
      >
        {children}
      </motion.div>
    </dialog>
  );
};
