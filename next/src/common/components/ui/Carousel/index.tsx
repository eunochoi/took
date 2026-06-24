'use client';

import React, { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/common/utils/cn";
import Indicator from "./Indicator";

interface CarouselProps {
  children: ReactNode;
  showIndicator?: boolean;
  gap?: number;
  resetOnChange?: boolean;
  className?: string;
  indicatorColor?: string;
  onPageChange?: (page: number) => void;
}

interface CarouselStyle extends CSSProperties {
  "--carousel-gap": string;
  "--carousel-slide-size": string;
}

const Carousel = ({
  children,
  showIndicator = true,
  gap = 0,
  resetOnChange = false,
  className,
  indicatorColor,
  onPageChange,
}: CarouselProps) => {
  const childrenArray = React.Children.toArray(children);
  const slideWrapperRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<number>(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const newPage = Math.round((e.currentTarget?.scrollLeft - 1) / e.currentTarget?.clientWidth);
    setPage(newPage);
    onPageChange?.(newPage);
  };

  useEffect(() => {
    if (resetOnChange) {
      slideWrapperRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [children, resetOnChange]);

  if (childrenArray.length === 0) return null;

  const carouselStyle: CarouselStyle = {
    "--carousel-gap": `${gap}px`,
    "--carousel-slide-size": gap > 0 ? `calc(100% - ${gap}px)` : "100%",
  };

  return (
    <div className={cn("relative flex h-full w-full flex-col overflow-hidden", className)}>
      <div
        ref={slideWrapperRef}
        className="flex h-full w-full snap-x snap-mandatory gap-[var(--carousel-gap)] overflow-x-scroll overflow-y-hidden scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        onScroll={handleScroll}
        style={carouselStyle}
      >
        {childrenArray.map((child, i) => (
          <div
            key={`slide-${i}`}
            className="box-border flex h-full w-[var(--carousel-slide-size)] min-w-[var(--carousel-slide-size)] shrink-0 snap-center snap-always items-center justify-center overflow-hidden"
          >
            {child}
          </div>
        ))}
      </div>
      {showIndicator && childrenArray.length > 1 && (
        <Indicator
          slideWrapperRef={slideWrapperRef}
          page={page}
          indicatorLength={childrenArray.length}
          color={indicatorColor}
        />
      )}
    </div>
  );
};

export default Carousel;
