import type { CSSProperties } from 'react';
import type { IconType } from 'react-icons';
import { FaFaceAngry, FaFaceDizzy, FaFaceGrimace, FaFaceGrinBeam, FaFaceGrinHearts, FaFaceMeh, FaFaceSadTear, FaFaceSmile, FaFaceSmileWink, FaFaceSurprise } from 'react-icons/fa6';
import { twMerge } from 'tailwind-merge';

import type { Emotion } from '@/common/constants/emotions';

interface Props {
  emotion: Emotion;
  alt: string;
  width: number | `${number}`;
  height: number | `${number}`;
  className?: string;
  style?: CSSProperties;
}

const SIMPLE_EMOTION_ICONS: IconType[] = [
  FaFaceSmile,
  FaFaceGrinBeam,
  FaFaceGrinHearts,
  FaFaceSmileWink,
  FaFaceSurprise,
  FaFaceGrimace,
  FaFaceSadTear,
  FaFaceAngry,
  FaFaceDizzy,
  FaFaceMeh,
];

const SIMPLE_EMOTION_SHAPES = [
  '56% 44% 53% 47% / 45% 55% 43% 57%',
  '44% 56% 48% 52% / 55% 43% 57% 45%',
  '53% 47% 58% 42% / 43% 57% 48% 52%',
  '47% 53% 44% 56% / 56% 46% 54% 44%',
  '58% 42% 51% 49% / 48% 52% 42% 58%',
  '43% 57% 55% 45% / 53% 47% 58% 42%',
  '52% 48% 42% 58% / 57% 43% 49% 51%',
  '57% 43% 46% 54% / 42% 58% 55% 45%',
  '45% 55% 57% 43% / 54% 46% 41% 59%',
  '51% 49% 45% 55% / 46% 54% 56% 44%',
];

export const SimpleEmotionIcon = ({ emotion, alt, width, height, className, style }: Props) => {
  const FaceIcon = SIMPLE_EMOTION_ICONS[emotion.id] ?? FaFaceMeh;

  return (
    <span
      className={twMerge('relative inline-block w-[var(--simple-width)] max-w-full align-middle', className)}
      style={{ '--simple-width': `${width}px`, aspectRatio: `${width} / ${height}`, ...style } as CSSProperties}
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: emotion.color, borderRadius: SIMPLE_EMOTION_SHAPES[emotion.id] ?? SIMPLE_EMOTION_SHAPES[9] }}
      />
      <div
        className="absolute inset-[15%] rounded-full"
        style={{ backgroundColor: `color-mix(in srgb, ${emotion.color} 55%, #111 45%)` }}
      />
      <FaceIcon
        className="absolute inset-[9%] h-[82%] w-[82%]"
        style={{ color: emotion.color }}
        aria-hidden="true"
        focusable="false"
      />
    </span>
  );
};
