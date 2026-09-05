'use client';

import { useRef } from 'react';
import type { MouseEvent, TouchEvent } from 'react';

export const useMonthSwipe = (goPreviousMonth: () => void, goNextMonth: () => void) => {
  const start = useRef<{ id: number; x: number; y: number } | null>(null);
  const suppressClickUntil = useRef(0);

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    suppressClickUntil.current = 0;
    if (event.touches.length !== 1) {
      start.current = null;
      return;
    }
    const touch = event.touches[0];
    start.current = { id: touch.identifier, x: touch.clientX, y: touch.clientY };
  };

  const onTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 1) start.current = null;
  };

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const origin = start.current;
    start.current = null;
    if (!origin) return;

    const touch = Array.from(event.changedTouches).find((item) => item.identifier === origin.id);
    if (!touch) return;

    const dx = touch.clientX - origin.x;
    const dy = touch.clientY - origin.y;
    if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
      suppressClickUntil.current = Date.now() + 500;
    }
    if (Math.abs(dx) < 80 || Math.abs(dx) < Math.abs(dy) * 1.5) return;

    if (dx > 0) goPreviousMonth();
    else goNextMonth();
  };

  const onTouchCancel = () => {
    start.current = null;
  };

  const onClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if (event.detail !== 0 && Date.now() < suppressClickUntil.current) {
      event.preventDefault();
      event.stopPropagation();
      suppressClickUntil.current = 0;
    }
  };

  return { onTouchStart, onTouchMove, onTouchEnd, onTouchCancel, onClickCapture };
};
