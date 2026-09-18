'use client';

import { EmotionSelector } from "@/common/components/ui/EmotionSelector";
import { Modal } from "@/common/components/ui/Modal";
import { SelectionPanel } from "@/common/components/ui/SelectionPanel";
import { EMOTION_UNSELECTED } from "@/common/constants/filterDefaults";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { MdRefresh } from "react-icons/md";

interface Props {
  contentRef: React.MutableRefObject<HTMLDivElement | null>;
  onClose: (params?: URLSearchParams) => void;
  setEmotionToggle: (d: number) => void;
}

const EmotionFilter = ({
  contentRef,
  onClose,
  setEmotionToggle,
}: Props) => {
  const searchParams = useSearchParams();

  const emotion = searchParams.get('emotion');
  const [tempEmotion, setTempEmotion] = useState<number>(() => emotion ? Number(emotion) : EMOTION_UNSELECTED);

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
    <Modal
      ariaLabel="감정 선택"
      animation={['top', 'fade']}
      onClose={() => onClose()}
      overlayClassName="z-[98] tablet:z-[105]"
      variant={{ base: 'top', tablet: 'center-base', desktop: 'center-base' }}
    >
      <SelectionPanel
        title="감정 선택"
        resetLabel={<><MdRefresh />초기화</>}
        onCancel={() => onClose()}
        onReset={onInitialize}
        onSubmit={onSubmit}
      >
        <EmotionSelector value={tempEmotion} onChange={setTempEmotion} />
      </SelectionPanel>
    </Modal>
  );
};

export default EmotionFilter;
