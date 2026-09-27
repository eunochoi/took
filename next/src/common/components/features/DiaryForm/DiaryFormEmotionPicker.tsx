import { PickerDialog } from '@/common/components/ui/Dialog/PickerDialog';
import {
  PICKER_ACTIONS_CLASS,
  PICKER_BODY_CLASS,
  PICKER_CLOSE_BUTTON_CLASS,
  PICKER_CONFIRM_BUTTON_CLASS,
  PICKER_CONTENT_CLASS,
  PICKER_DESCRIPTION_CLASS,
  PICKER_TITLE_CLASS,
} from '@/common/components/ui/Dialog/PickerDialog/constants';
import { EmotionPicker } from '@/common/components/ui/EmotionPicker';
import { EMOTIONS } from '@/common/constants/emotions';
import { useIsPresent } from 'framer-motion';
import { useState } from 'react';
import { MdClose } from 'react-icons/md';

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
      <fieldset disabled={!isPresent} className="m-0 w-full min-w-0 border-0 p-0">
        <div className={PICKER_CONTENT_CLASS}>
          <button type="button" aria-label="감정 선택 닫기" onClick={onClose} className={PICKER_CLOSE_BUTTON_CLASS}>
            <MdClose aria-hidden="true" className="h-5 w-5" />
          </button>
          <div className="flex flex-col">
            <h2 id="diary-emotion-picker-title" className={PICKER_TITLE_CLASS}>오늘의 감정을 골라주세요</h2>
            <p id="diary-emotion-picker-description" className={PICKER_DESCRIPTION_CLASS}>하루를 가장 잘 표현하는 감정 하나</p>
          </div>
          <div className={PICKER_BODY_CLASS}>
            <EmotionPicker value={draftEmotion} onChange={setDraftEmotion} />
          </div>
          <div className={PICKER_ACTIONS_CLASS}>
            <button
              type="button"
              disabled={!EMOTIONS.some((item) => item.id === draftEmotion)}
              onClick={() => onConfirm(draftEmotion)}
              className={PICKER_CONFIRM_BUTTON_CLASS}
            >
              선택 완료
            </button>
          </div>
        </div>
      </fieldset>
    </PickerDialog>
  );
};

export default DiaryFormEmotionPicker;
