'use client';

import { PickerDialog } from "@/common/components/ui/Dialog/PickerDialog";
import {
  PICKER_ACTIONS_CLASS,
  PICKER_ACTION_GROUP_CLASS,
  PICKER_BODY_CLASS,
  PICKER_CANCEL_BUTTON_CLASS,
  PICKER_CONFIRM_BUTTON_CLASS,
  PICKER_CONTENT_CLASS,
  PICKER_RESET_BUTTON_CLASS,
  PICKER_TITLE_CLASS,
} from '@/common/components/ui/Dialog/PickerDialog/constants';
import { EmotionSelector } from "@/common/components/ui/EmotionSelector";
import { EMOTION_UNSELECTED } from "@/common/constants/filterDefaults";
import { useState } from "react";
import { MdRefresh } from "react-icons/md";

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

  const onInitialize = () => {
    setTempEmotion(EMOTION_UNSELECTED);
  };

  return (
    <PickerDialog labelledBy="diary-emotion-picker-title" onClose={onClose}>
      <div className={PICKER_CONTENT_CLASS}>
        <h2 id="diary-emotion-picker-title" className={PICKER_TITLE_CLASS}>감정 선택</h2>
        <div className={PICKER_BODY_CLASS}>
          <EmotionSelector value={tempEmotion} onChange={setTempEmotion} />
        </div>
        <div className={PICKER_ACTIONS_CLASS}>
          <button className={PICKER_RESET_BUTTON_CLASS} onClick={onInitialize} type="button"><MdRefresh />초기화</button>
          <div className={PICKER_ACTION_GROUP_CLASS}>
            <button className={PICKER_CANCEL_BUTTON_CLASS} onClick={onClose} type="button">취소</button>
            <button className={PICKER_CONFIRM_BUTTON_CLASS} onClick={onSubmit} type="button">확인</button>
          </div>
        </div>
      </div>
    </PickerDialog>
  );
};

export default DiaryListPageEmotionPicker;
