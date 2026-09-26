'use client';

import { motion, useIsPresent, useReducedMotion } from 'framer-motion';
import { ReactNode, useLayoutEffect, useRef } from 'react';
import { DialogBackdrop } from '../DialogBackdrop';
import { DIALOG_ROOT_CLASS } from '../constants';

interface PickerDialogProps {
  children: ReactNode;
  labelledBy: string;
  describedBy?: string;
  onClose: () => void;
}

// 히스토리에 남기지 않는 임시 선택 UI다. 열림 상태와 적용된 값은 상위 View가 관리한다.
export const PickerDialog = ({ children, labelledBy, describedBy, onClose }: PickerDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isPresent = useIsPresent();
  const reduceMotion = useReducedMotion();
  const offset = reduceMotion ? 0 : 'var(--picker-offset)';
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
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      className={DIALOG_ROOT_CLASS}
      onCancel={(event) => {
        event.preventDefault();
        event.stopPropagation();
        if (isPresent) onClose();
      }}
    >
      <DialogBackdrop
        transition={transition}
        onClick={() => {
          if (isPresent) onClose();
        }}
      />
      <motion.div
        ref={contentRef}
        className="absolute inset-x-0 bottom-0 max-h-[85dvh] w-full overflow-y-auto rounded-t-3xl bg-theme-accent-light shadow-theme-modal [--picker-offset:50px] tablet:inset-0 tablet:m-auto tablet:h-fit tablet:w-[440px] tablet:max-w-[calc(100dvw-32px)] tablet:rounded-3xl desktop:[--picker-offset:0px]"
        initial={{ opacity: 0, y: offset }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: offset }}
        transition={transition}
      >
        {children}
      </motion.div>
    </dialog>
  );
};
