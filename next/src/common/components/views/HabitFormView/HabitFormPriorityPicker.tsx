import { HABIT_PRIORITY_VALUES } from '@/common/constants/habit';
import { motion, useIsPresent } from 'framer-motion';
import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { MdClose } from 'react-icons/md';
import HabitFormPrioritySelector from './HabitFormPrioritySelector';

interface HabitFormPriorityPickerProps {
  priority: number;
  onClose: () => void;
  onConfirm: (priority: number) => void;
}

const HabitFormPriorityPicker = ({ priority, onClose, onConfirm }: HabitFormPriorityPickerProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [draftPriority, setDraftPriority] = useState(priority);
  const isPresent = useIsPresent();

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dialog?.showModal();

    return () => {
      dialog?.close();
      if (trigger?.isConnected) trigger.focus();
    };
  }, []);

  // The native modal makes the parent habit form inert and keeps focus in this picker.
  return createPortal(
    <dialog
      ref={dialogRef}
      aria-labelledby="habit-priority-picker-title"
      aria-describedby="habit-priority-picker-description"
      onCancel={(event) => {
        event.preventDefault();
        if (isPresent) onClose();
      }}
      onKeyDown={(event) => event.stopPropagation()}
      onClick={(event) => event.stopPropagation()}
      className="fixed inset-0 m-0 h-[100dvh] max-h-none w-full max-w-none overflow-hidden border-0 bg-transparent p-0 text-theme-text-primary backdrop:bg-transparent"
    >
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        onClick={() => {
          if (isPresent) onClose();
        }}
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
      />
      <div className="pointer-events-none relative flex h-full items-end justify-center tablet:items-center">
        <motion.div
          initial={{ opacity: 0, y: 'var(--picker-offset)' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 'var(--picker-offset)' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="pointer-events-auto max-h-[85dvh] w-full overflow-y-auto rounded-t-3xl bg-theme-surface shadow-theme-modal [--picker-offset:50px] tablet:w-[440px] tablet:max-w-[calc(100dvw-32px)] tablet:rounded-3xl desktop:[--picker-offset:0px]"
        >
          <fieldset disabled={!isPresent} className="relative m-0 min-w-0 border-0 px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-7 tablet:px-7 tablet:pt-9">
            <button
              type="button"
              aria-label="우선순위 선택 닫기"
              onClick={onClose}
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-theme-text-secondary tablet:hover:bg-theme-accent/10 tablet:focus-visible:!outline tablet:focus-visible:!outline-2 tablet:focus-visible:!outline-theme-accent"
            >
              <MdClose aria-hidden="true" className="h-5 w-5" />
            </button>
            <h2 id="habit-priority-picker-title" className="mt-6 text-center font-title text-xl font-semibold tracking-tight">습관의 우선순위를 골라주세요</h2>
            <p id="habit-priority-picker-description" className="mt-2 text-center text-sm text-theme-text-secondary">나에게 중요한 정도를 선택해요</p>
            <div className="mb-8 mt-7">
              <HabitFormPrioritySelector priority={draftPriority} setPriority={setDraftPriority} />
            </div>
            <button
              type="button"
              disabled={!HABIT_PRIORITY_VALUES.some((value) => value === draftPriority)}
              onClick={() => onConfirm(draftPriority)}
              className="flex min-h-14 w-full items-center justify-center rounded-full bg-theme-accent px-5 font-title text-base font-semibold text-theme-text-on-accent transition-opacity tablet:hover:opacity-90 tablet:focus-visible:!outline tablet:focus-visible:!outline-2 tablet:focus-visible:!outline-offset-4 tablet:focus-visible:!outline-theme-accent disabled:cursor-not-allowed disabled:opacity-40"
            >
              선택 완료
            </button>
          </fieldset>
        </motion.div>
      </div>
    </dialog>,
    document.body,
  );
};

export default HabitFormPriorityPicker;
