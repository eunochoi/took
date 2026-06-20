import { useCallback, useRef } from "react";

interface UseSwipeProps {
  isTouchGestureEnabled: boolean;
  prevMonth: () => void;
  nextMonth: () => void;
}

export const useSwipe = ({
  isTouchGestureEnabled,
  prevMonth,
  nextMonth }: UseSwipeProps) => {

  const touchStartX = useRef<number | null>(null)
  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!isTouchGestureEnabled) return;
    touchStartX.current = e.changedTouches[0].clientX;
  }, [isTouchGestureEnabled])
  const handleTouchEnd = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!isTouchGestureEnabled || touchStartX.current === null) return;


    const touchEndX = e.changedTouches[0].clientX;
    const touchDiff = touchEndX - touchStartX.current;
    // console.log('swipe diff : ', touchDiff);
    if (touchDiff > 100) prevMonth?.();
    else if (touchDiff < -100) nextMonth?.();
  }, [isTouchGestureEnabled, prevMonth, nextMonth])

  return {
    handleTouchStart,
    handleTouchEnd
  };
}