'use client';

import { cn } from "@/common/utils/cn";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import Indicator from "./Indicator";

interface CarouselProps {
  children: ReactNode;
  showIndicator?: boolean;
  indicatorPosition?: 'overlay' | 'below';
  gap?: boolean;
  resetOnChange?: boolean;
  containerClassName?: string;
  className?: string;
  onPageChange?: (page: number) => void;
}

const defaultCarouselWrapperClass = 'relative aspect-square w-full overflow-hidden';

const Carousel = ({
  children,
  showIndicator = true,
  indicatorPosition = 'below',
  gap = true,
  resetOnChange = false,
  containerClassName,
  className,
  onPageChange,
}: CarouselProps) => {
  const childrenArray = React.Children.toArray(children);
  const slideWrapperRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<number>(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollLeft, clientWidth } = e.currentTarget;
    if (clientWidth === 0) return;

    const newPage = Math.max(0, Math.min(childrenArray.length - 1, Math.round(scrollLeft / (clientWidth + (gap ? 16 : 0)))));
    if (newPage === page) return;

    setPage(newPage);
    onPageChange?.(newPage);
  };

  useEffect(() => {
    if (resetOnChange) {
      slideWrapperRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [children, resetOnChange]);

  if (childrenArray.length === 0) return null;

  return (
    <div className={twMerge("relative flex w-full flex-col", containerClassName)}>
      <div className={twMerge(defaultCarouselWrapperClass, className)}>
        <div className="absolute inset-0 flex min-h-0 flex-col">
          <div
            ref={slideWrapperRef}
            className={cn(
              "flex min-h-0 w-full flex-1 snap-x snap-mandatory overflow-x-scroll overflow-y-hidden scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
              gap && "gap-4",
            )}
            onScroll={handleScroll}
          >
            {childrenArray.map((child, i) => (
              <div
                key={`slide-${i}`}
                className="box-border flex h-full w-full min-w-full shrink-0 snap-start snap-always items-center justify-center overflow-hidden"
              >
                {child}
              </div>
            ))}
          </div>
          {showIndicator && indicatorPosition === 'overlay' && childrenArray.length > 1 && (
            <Indicator
              slideWrapperRef={slideWrapperRef}
              page={page}
              indicatorLength={childrenArray.length}
              gap={gap}
              position={indicatorPosition}
            />
          )}
        </div>
      </div>
      {showIndicator && indicatorPosition === 'below' && childrenArray.length > 1 && (
        <Indicator
          slideWrapperRef={slideWrapperRef}
          page={page}
          indicatorLength={childrenArray.length}
          gap={gap}
          position={indicatorPosition}
        />
      )}
    </div>
  );
};

export default Carousel;
