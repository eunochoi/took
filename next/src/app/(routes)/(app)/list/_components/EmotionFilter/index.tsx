'use client';

import { EmotionSelector } from "@/common/components/ui/EmotionSelector";
import { SelectionPanel } from "@/common/components/ui/SelectionPanel";
import { EMOTION_UNSELECTED } from "@/common/constants/filterDefaults";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdRefresh } from "react-icons/md";

interface Props {
  contentRef: React.MutableRefObject<HTMLDivElement | null>;
  isOpen: boolean;
  onClose: (params?: URLSearchParams) => void;
  setEmotionToggle: (d: number) => void;
}

const EmotionFilter = ({
  contentRef,
  isOpen,
  onClose,
  setEmotionToggle,
}: Props) => {
  const searchParams = useSearchParams();

  const [tempEmotion, setTempEmotion] = useState<number>(EMOTION_UNSELECTED);
  const emotion = searchParams.get('emotion');

  useEffect(() => {
    if (isOpen) {
      if (emotion) setTempEmotion(Number(emotion));
      else setTempEmotion(EMOTION_UNSELECTED);
    }
  }, [isOpen, emotion]);

  const onSubmit = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('modal');

    if (tempEmotion !== EMOTION_UNSELECTED) params.set('emotion', tempEmotion.toString());
    else params.delete('emotion');

    setEmotionToggle(tempEmotion);
    onClose(params);

    setTimeout(() => {
      contentRef?.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, 200);
  };

  const onInitialize = () => {
    setTempEmotion(EMOTION_UNSELECTED);
  };

  return (
    <SelectionPanel
      isOpen={isOpen}
      title="감정 선택"
      minHeightClassName="max-[479px]:min-h-[300px]"
      resetLabel={<><MdRefresh />초기화</>}
      onClose={() => onClose()}
      onReset={onInitialize}
      onSubmit={onSubmit}
    >
      <EmotionSelector value={tempEmotion} onChange={setTempEmotion} />
    </SelectionPanel>
  );
};

export default EmotionFilter;
