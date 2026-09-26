'use client';

import Image, { type ImageProps } from 'next/image';
import { useContext } from 'react';
import { twMerge } from 'tailwind-merge';

import type { Emotion } from '@/common/constants/emotions';
import { SettingsContext } from '@/common/settings/SettingsContext';
import { DEFAULT_EMOTION_ICON_STYLE, type EmotionIconStyle } from '@/common/types/setting';
import { SimpleEmotionIcon } from './SimpleEmotionIcon';

type EmotionImageProps = Omit<ImageProps, 'src'> & {
  emotion: Emotion;
  iconStyle?: EmotionIconStyle;
};

export default function EmotionImage({ emotion, iconStyle, alt, width = emotion.src.width, height = emotion.src.height, sizes, className, style, ...props }: EmotionImageProps) {
  const settings = useContext(SettingsContext);
  const selectedStyle = iconStyle ?? settings?.emotionIcon.style ?? DEFAULT_EMOTION_ICON_STYLE;

  if (selectedStyle === 'simple') {
    return (
      <SimpleEmotionIcon
        emotion={emotion}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={{ scale: 0.85, ...style }}
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
        <text x="50" y="54" textAnchor="middle" dominantBaseline="central" fontSize="76" fontFamily="Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif">
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
      sizes={sizes ?? (width === emotion.src.width ? '64px' : `${width}px`)}
      className={className}
      style={style}
    />
  );
}
