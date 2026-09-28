'use client';

import { AnimatePresence } from 'framer-motion';
import { useId } from 'react';
import { PickerDialog } from './PickerDialog';
import {
  PICKER_ACTIONS_CLASS,
  PICKER_CONFIRM_BUTTON_CLASS,
  PICKER_CONTENT_CLASS,
  PICKER_DESCRIPTION_CLASS,
  PICKER_TITLE_CLASS,
} from './PickerDialog/constants';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmDialog = ({
  isOpen,
  title,
  message,
  confirmLabel,
  onClose,
  onConfirm,
}: ConfirmDialogProps) => {
  const id = useId();
  const titleId = `${id}-title`;
  const messageId = `${id}-message`;

  return (
    <AnimatePresence>
      {isOpen && (
        <PickerDialog labelledBy={titleId} describedBy={messageId} onClose={onClose}>
          <div className={PICKER_CONTENT_CLASS}>
            <div>
              <h2 id={titleId} className={PICKER_TITLE_CLASS}>{title}</h2>
              <p id={messageId} className={PICKER_DESCRIPTION_CLASS}>{message}</p>
            </div>
            <div className={`${PICKER_ACTIONS_CLASS} flex gap-3`}>
              <button
                type="button"
                className="flex min-h-12 w-full items-center justify-center rounded-full bg-theme-surface px-5  text-base text-theme-text-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-accent"
                onClick={onClose}
              >
                취소
              </button>
              <button type="button" className={PICKER_CONFIRM_BUTTON_CLASS} onClick={onConfirm}>
                {confirmLabel}
              </button>
            </div>
          </div>
        </PickerDialog>
      )}
    </AnimatePresence>
  );
};
