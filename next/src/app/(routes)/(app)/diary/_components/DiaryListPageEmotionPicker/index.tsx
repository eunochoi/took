'use client';

import { EmotionSelector } from "@/common/components/ui/EmotionSelector";
import { PickerDialog } from "@/common/components/ui/PickerDialog";
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
      <div className="flex w-full flex-col gap-6 px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-8 tablet:px-7 tablet:py-6 desktop:px-10 desktop:py-8 landscape-short:gap-4 landscape-short:px-6 landscape-short:py-6">
        <h2 id="diary-emotion-picker-title" className="font-title text-xl font-bold text-theme-text-primary">감정 선택</h2>
        <div className="w-full min-w-0">
          <EmotionSelector value={tempEmotion} onChange={setTempEmotion} />
        </div>
        <div className="flex w-full flex-wrap items-center gap-3 border-t border-theme-border/60 pt-6">
          <button className="mr-auto flex min-h-10 shrink-0 items-center gap-1 rounded-xl px-4 py-2 text-sm font-semibold text-theme-text-secondary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-accent disabled:cursor-not-allowed disabled:opacity-50" onClick={onInitialize} type="button"><MdRefresh />초기화</button>
          <div className="ml-auto flex items-center gap-3">
            <button className="min-h-10 shrink-0 rounded-xl px-4 py-2 text-sm font-semibold text-theme-text-secondary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-accent disabled:cursor-not-allowed disabled:opacity-50" onClick={onClose} type="button">취소</button>
            <button className="min-h-10 shrink-0 rounded-xl bg-theme-accent px-4 py-2 text-sm font-semibold text-theme-text-on-accent transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-accent disabled:cursor-not-allowed disabled:opacity-50" onClick={onSubmit} type="button">확인</button>
          </div>
        </div>
      </div>
    </PickerDialog>
  );
};

export default DiaryListPageEmotionPicker;
