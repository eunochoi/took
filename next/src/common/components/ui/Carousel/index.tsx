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
  showImageBorder?: boolean;
  resetOnChange?: boolean;
  containerClassName?: string;
  className?: string;
  onPageChange?: (page: number) => void;
}

const defaultCarouselWrapperClass = 'relative aspect-square w-full overflow-hidden';

const Carousel = ({
  children,
  showIndicator = true,
  showImageBorder = false,
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

    const slideGap = gap ? 8 : 0;
    const newPage = Math.max(0, Math.min(childrenArray.length - 1, Math.round(scrollLeft / (clientWidth + slideGap))));
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
              gap && "gap-2",
            )}
            onScroll={handleScroll}
          >
            {childrenArray.map((child, i) => (
              <div
                key={`slide-${i}`}
                className={cn("box-border flex h-full w-full min-w-full shrink-0 snap-start snap-always items-center justify-center overflow-hidden",
                  showImageBorder && "[&_img]:border-2 [&_img]:border-theme-border-muted [&_img]:rounded-xl"
                )}
              >
                {child}
              </div>
            ))}
          </div>
          {showIndicator && indicatorPosition === 'overlay' && childrenArray.length > 1 && (
            <Indicator
              page={page}
              indicatorLength={childrenArray.length}
              position={indicatorPosition}
            />
          )}
        </div>
      </div>
      {showIndicator && indicatorPosition === 'below' && childrenArray.length > 1 && (
        <Indicator
          page={page}
          indicatorLength={childrenArray.length}
          position={indicatorPosition}
        />
      )}
    </div>
  );
};

export default Carousel;
