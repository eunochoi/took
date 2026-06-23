'use client';

import Image from "next/image";

import { EMOTIONS } from "@/common/constants/emotions";
import { EMOTION_UNSELECTED } from "@/common/constants/filterDefaults";
import { cn } from "@/common/utils/cn";

export interface EmotionSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export const EmotionSelector = ({ value, onChange }: EmotionSelectorProps) => {
  const firstRow = EMOTIONS.slice(0, 5);
  const secondRow = EMOTIONS.slice(5, EMOTIONS.length);

  const isSelected = (id: number) => value === id || value === EMOTION_UNSELECTED;

  const handleClick = (id: number) => {
    if (value === id) onChange(EMOTION_UNSELECTED);
    else onChange(id);
  };

  const renderEmotion = (emotion: (typeof EMOTIONS)[number]) => {
    const selected = isSelected(emotion.id);

    return (
      <button
        key={emotion.name}
        className="flex flex-1 cursor-pointer flex-col items-center gap-2"
        onClick={() => handleClick(emotion.id)}
        type="button"
      >
        <Image
          className={cn(
            "h-11 w-11 shrink-0 object-contain transition-opacity duration-200 ease-in-out",
            selected ? "opacity-100" : "opacity-50",
          )}
          src={emotion.src}
          alt={emotion.nameKr}
          width={128}
          height={128}
        />
        <span
          className={cn(
            "text-center text-sm text-gray-500 transition-opacity duration-200 ease-in-out",
            selected ? "font-semibold opacity-100" : "opacity-50",
          )}
        >
          {emotion.nameKr}
        </span>
      </button>
    );
  };

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex w-full items-start justify-between">
        {firstRow.map(renderEmotion)}
      </div>
      <div className="flex w-full items-start justify-between">
        {secondRow.map(renderEmotion)}
      </div>
    </div>
  );
};
