import EmotionImage from '@/common/components/ui/EmotionImage';
import { EMOTIONS } from '@/common/constants/emotions';
import { cn } from '@/common/utils/cn';
import { motion, useIsPresent } from 'framer-motion';
import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { MdCheck, MdClose } from 'react-icons/md';

interface DiaryFormEmotionPickerProps {
  emotion: number;
  onClose: () => void;
  onConfirm: (emotion: number) => void;
}

const DiaryFormEmotionPicker = ({ emotion, onClose, onConfirm }: DiaryFormEmotionPickerProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [draftEmotion, setDraftEmotion] = useState(emotion);
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

  // The native modal makes the parent diary inert and keeps focus in this picker.
  return createPortal(
    <dialog
      ref={dialogRef}
      aria-labelledby="diary-emotion-picker-title"
      aria-describedby="diary-emotion-picker-description"
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

        transition={{ duration: 0.3, ease: "easeInOut" }}
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
          transition={{ duration: 0.3, ease: "easeInOut" }}

          className="pointer-events-auto max-h-[85dvh] w-full overflow-y-auto rounded-t-3xl bg-theme-surface shadow-theme-modal [--picker-offset:50px] tablet:w-[440px] tablet:max-w-[calc(100dvw-32px)] tablet:rounded-3xl desktop:[--picker-offset:0px]"
        >
          <fieldset disabled={!isPresent} className="relative m-0 min-w-0 border-0 px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-7 tablet:px-7 tablet:pt-9">
            <button
              type="button"
              aria-label="감정 선택 닫기"
              onClick={onClose}
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-theme-text-secondary"
            >
              <MdClose aria-hidden="true" className="h-5 w-5" />
            </button>
            <h2 id="diary-emotion-picker-title" className="mt-6 text-center font-title text-xl font-semibold tracking-tight">오늘의 감정을 골라주세요</h2>
            <p id="diary-emotion-picker-description" className="mt-2 text-center text-sm text-theme-text-secondary">하루를 가장 잘 표현하는 감정 하나</p>
            <div role="group" aria-label="감정 선택" className="mb-8 mt-7 grid grid-cols-5 gap-x-1 gap-y-5">
              {EMOTIONS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={draftEmotion === item.id}
                  onClick={() => setDraftEmotion(item.id)}
                  className={cn(
                    'relative flex min-w-0 flex-col items-center gap-2 rounded-2xl border px-1 py-3 transition-colors',
                    draftEmotion === item.id ? 'border-theme-accent bg-theme-accent/10' : 'border-transparent',
                  )}
                >
                  <EmotionImage emotion={item} alt="" width={48} height={48} className="h-11 w-11 max-w-full object-contain tablet:h-12 tablet:w-12" />
                  <span className="text-xs font-medium">{item.nameKr}</span>
                  {draftEmotion === item.id && <MdCheck aria-hidden="true" className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-theme-accent p-0.5 text-theme-text-on-accent" />}
                </button>
              ))}
            </div>
            <button
              type="button"
              disabled={!EMOTIONS.some((item) => item.id === draftEmotion)}
              onClick={() => onConfirm(draftEmotion)}
              className="flex min-h-14 w-full items-center justify-center rounded-full bg-theme-accent px-5 font-title text-base font-semibold text-theme-text-on-accent transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
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

export default DiaryFormEmotionPicker;
