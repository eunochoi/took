'use client';

import EmotionImage from '@/common/components/ui/EmotionImage';
import { EMOTIONS } from "@/common/constants/emotions";
import { EMOTION_UNSELECTED } from "@/common/constants/filterDefaults";
import { cn } from "@/common/utils/cn";
import { MdCheck } from 'react-icons/md';

export interface EmotionSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export const EmotionSelector = ({ value, onChange }: EmotionSelectorProps) => {
  const handleClick = (id: number) => {
    if (value === id) onChange(EMOTION_UNSELECTED);
    else onChange(id);
  };

  return (
    <div role="group" aria-label="감정 선택" className="grid w-full grid-cols-5 gap-x-1 gap-y-5">
      {EMOTIONS.map((emotion) => {
        const selected = value === emotion.id;

        return (
          <button
            key={emotion.name}
            aria-pressed={selected}
            className={cn(
              'relative flex min-w-0 flex-col items-center gap-2 rounded-2xl border px-1 py-3 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-accent',
              selected ? 'border-theme-accent bg-theme-accent/10' : 'border-transparent',
            )}
            onClick={() => handleClick(emotion.id)}
            type="button"
          >
            <EmotionImage
              className="h-11 w-11 max-w-full object-contain tablet:h-12 tablet:w-12"
              emotion={emotion}
              alt=""
              width={48}
              height={48}
            />
            <span className="text-xs font-medium text-theme-text-primary">{emotion.nameKr}</span>
            {selected && <MdCheck aria-hidden="true" className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-theme-accent p-0.5 text-theme-text-on-accent" />}
          </button>
        );
      })}
    </div>
  );
};
