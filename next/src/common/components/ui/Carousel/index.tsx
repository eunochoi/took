'use client';

import React, { ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/common/utils/cn";
import Indicator from "./Indicator";
import { CarouselNavigation } from "./CarouselNavigation";

interface CarouselProps {
  children: ReactNode;
  showIndicator?: boolean;
  indicatorVariant?: 'dots' | 'arrows';
  gap?: boolean;
  resetOnChange?: boolean;
  className?: string;
  onPageChange?: (page: number) => void;
}

const Carousel = ({
  children,
  showIndicator = true,
  indicatorVariant = 'dots',
  gap = false,
  resetOnChange = false,
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
    <div className={cn("relative flex h-full w-full flex-col overflow-hidden", className)}>
      <div
        ref={slideWrapperRef}
        className={cn(
          "flex min-h-0 w-full flex-1 snap-x snap-mandatory overflow-x-scroll overflow-y-hidden scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
          gap && "gap-[16px]",
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
      {showIndicator && indicatorVariant === 'arrows' && (
        <CarouselNavigation
          slideWrapperRef={slideWrapperRef}
          page={page}
          count={childrenArray.length}
          gap={gap}
        />
      )}
      {showIndicator && indicatorVariant === 'dots' && childrenArray.length > 1 && (
        <Indicator
          slideWrapperRef={slideWrapperRef}
          page={page}
          indicatorLength={childrenArray.length}
          gap={gap}
        />
      )}
    </div>
  );
};

export default Carousel;
