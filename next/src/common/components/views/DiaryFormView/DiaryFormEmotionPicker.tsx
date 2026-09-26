import { PickerDialog } from '@/common/components/ui/Dialog/PickerDialog';
import EmotionImage from '@/common/components/ui/EmotionImage';
import { EMOTIONS } from '@/common/constants/emotions';
import { cn } from '@/common/utils/cn';
import { useIsPresent } from 'framer-motion';
import { useState } from 'react';
import { MdCheck, MdClose } from 'react-icons/md';

interface DiaryFormEmotionPickerProps {
  emotion: number;
  onClose: () => void;
  onConfirm: (emotion: number) => void;
}

const DiaryFormEmotionPicker = ({ emotion, onClose, onConfirm }: DiaryFormEmotionPickerProps) => {
  const [draftEmotion, setDraftEmotion] = useState(emotion);
  const isPresent = useIsPresent();

  return (
    <PickerDialog
      labelledBy="diary-emotion-picker-title"
      describedBy="diary-emotion-picker-description"
      onClose={onClose}
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
    </PickerDialog>
  );
};

export default DiaryFormEmotionPicker;
