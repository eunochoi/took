'use client';

import { PickerDialog } from "@/common/components/ui/Dialog/PickerDialog";
import {
  PICKER_ACTIONS_CLASS,
  PICKER_BODY_CLASS,
  PICKER_CLOSE_BUTTON_CLASS,
  PICKER_CONFIRM_BUTTON_CLASS,
  PICKER_CONTENT_CLASS,
  PICKER_DESCRIPTION_CLASS,
  PICKER_TITLE_CLASS,
} from '@/common/components/ui/Dialog/PickerDialog/constants';
import { EmotionPicker } from "@/common/components/ui/EmotionPicker";
import { useState } from "react";
import { MdClose } from "react-icons/md";

interface Props {
  selectedEmotion: number;
  onClose: () => void;
  onApply: (emotion: number) => void;
}

const DiaryListPageEmotionPicker = ({
  selectedEmotion,
  onClose,
  onApply,
}: Props) => {
  const [tempEmotion, setTempEmotion] = useState(selectedEmotion);

  const onSubmit = () => {
    onApply(tempEmotion);
  };

  return (
    <PickerDialog labelledBy="diary-emotion-picker-title" describedBy="diary-emotion-picker-description" onClose={onClose}>
      <div className={PICKER_CONTENT_CLASS}>
        <button type="button" aria-label="감정 선택 닫기" onClick={onClose} className={PICKER_CLOSE_BUTTON_CLASS}>
          <MdClose aria-hidden="true" className="h-5 w-5" />
        </button>
        <div className="flex flex-col">
          <h2 id="diary-emotion-picker-title" className={PICKER_TITLE_CLASS}>어떤 감정의 기록을 볼까요?</h2>
          <p id="diary-emotion-picker-description" className={PICKER_DESCRIPTION_CLASS}>감정을 골라 해당 일기만 모아보세요</p>
        </div>
        <div className={PICKER_BODY_CLASS}>
          <EmotionPicker value={tempEmotion} onChange={setTempEmotion} allowDeselect />
        </div>
        <div className={PICKER_ACTIONS_CLASS}>
          <button className={PICKER_CONFIRM_BUTTON_CLASS} onClick={onSubmit} type="button">적용하기</button>
        </div>
      </div>
    </PickerDialog>
  );
};

export default DiaryListPageEmotionPicker;
