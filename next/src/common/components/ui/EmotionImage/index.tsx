'use client';

import Image, { type ImageProps } from 'next/image';
import { useContext } from 'react';
import { FaFaceAngry, FaFaceDizzy, FaFaceGrimace, FaFaceGrinBeam, FaFaceGrinHearts, FaFaceMeh, FaFaceSadTear, FaFaceSmile, FaFaceSmileWink, FaFaceSurprise } from 'react-icons/fa6';
import { twMerge } from 'tailwind-merge';

import type { Emotion } from '@/common/constants/emotions';
import { SettingsContext } from '@/common/settings/SettingsContext';
import { DEFAULT_EMOTION_ICON_STYLE, type EmotionIconStyle } from '@/common/types/setting';

type EmotionImageProps = Omit<ImageProps, 'src'> & {
  emotion: Emotion;
  iconStyle?: EmotionIconStyle;
};

const SIMPLE_EMOTION_ICONS = [
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

export default function EmotionImage({ emotion, iconStyle, alt, width = emotion.src.width, height = emotion.src.height, className, style, ...props }: EmotionImageProps) {
  const settings = useContext(SettingsContext);
  const selectedStyle = iconStyle ?? settings?.emotionIcon.style ?? DEFAULT_EMOTION_ICON_STYLE;

  if (selectedStyle === 'simple') {
    const SimpleIcon = SIMPLE_EMOTION_ICONS[emotion.id] ?? FaFaceMeh;

    return (
      <SimpleIcon
        size={width}
        className={twMerge('block h-auto max-w-full', className)}
        style={{ backgroundImage: `radial-gradient(circle closest-side at center, color-mix(in srgb, ${emotion.color} 40%, #111 60%) 97%, transparent 100%)`, color: emotion.color, scale: 0.8, ...style }}
        role={alt ? 'img' : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
        focusable="false"
      />
    );
  }

  if (selectedStyle === 'emoji') {
    return (
      <svg
        viewBox="0 0 100 100"
        width={width}
        height={height}
        className={twMerge('block h-auto max-w-full', className)}
        style={style}
        role={alt ? 'img' : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
        focusable="false"
      >
        <text x="50" y="54" textAnchor="middle" dominantBaseline="central" fontSize="84" fontFamily="Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif">
          {emotion.emoji}
        </text>
      </svg>
    );
  }

  return (
    <Image
      {...props}
      alt={alt}
      src={emotion.src}
      width={width}
      height={height}
      className={className}
      style={style}
    />
  );
}
