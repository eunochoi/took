'use client';

import EmotionImage from '@/common/components/ui/EmotionImage';
import { EMOTIONS } from '@/common/constants/emotions';
import { useSettingsContext } from '@/common/settings/useSettingsContext';
import { EMOTION_ICON_STYLE_LABELS, EMOTION_ICON_STYLE_LIST } from '@/common/types/setting';
import { cn } from '@/common/utils/cn';

export const EmotionIconStyleSelector = () => {
  const { emotionIcon } = useSettingsContext();

  return (
    <fieldset className="m-0 min-w-0 border-0 p-0">
      <legend className="sr-only">감정 아이콘 스타일</legend>
      <div className="grid grid-cols-3 gap-2">
        {EMOTION_ICON_STYLE_LIST.map((style) => (
          <label
            key={style}
            className={cn(
              'relative flex min-w-0 cursor-pointer flex-col items-center gap-3 rounded-xl border px-2 py-3 transition-colors focus-within:ring-2 focus-within:ring-theme-accent',
              emotionIcon.style === style ? 'border-theme-accent bg-theme-accent/10' : 'border-theme-border-muted bg-theme-surface',
            )}
          >
            <input
              type="radio"
              name="emotion-icon-style"
              value={style}
              checked={emotionIcon.style === style}
              onChange={() => emotionIcon.setStyle(style)}
              className="sr-only"
            />
            <span aria-hidden="true" className="flex items-center justify-center gap-1">
              {[EMOTIONS[0], EMOTIONS[6]].map((emotion) => (
                <EmotionImage key={emotion.id} emotion={emotion} iconStyle={style} alt="" width={28} height={28} className="h-7 w-7 object-contain" />
              ))}
            </span>
            <span className="whitespace-nowrap text-sm font-medium text-theme-text-primary">{EMOTION_ICON_STYLE_LABELS[style]}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
};
