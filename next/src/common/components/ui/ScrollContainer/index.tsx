'use client';

import { cn } from "@/common/utils/cn";
import { HTMLAttributes, ReactNode, forwardRef, useImperativeHandle, useState } from "react";
import { useInView } from "react-intersection-observer";
import { ScrollBoundary } from "./ScrollBoundary";
import { ScrollEdgeFade } from "./ScrollEdgeFade";
import { ScrollToTopButton } from "./ScrollToTopButton";

interface ScrollContainerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'className'> {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  fadeSizeClassName?: string;
  scrollAreaClassName?: string;
  showScrollFade?: boolean;
  showTopFade?: boolean;
  showScrollToTop?: boolean;
}

export const ScrollContainer = forwardRef<HTMLDivElement, ScrollContainerProps>(
  ({
    children,
    className,
    contentClassName,
    fadeSizeClassName = "h-24",
    scrollAreaClassName,
    showScrollFade = false,
    showTopFade = true,
    showScrollToTop = false,
    ...props
  }, ref) => {
    const [scrollArea, setScrollArea] = useState<HTMLDivElement | null>(null);
    const { ref: topBoundaryRef, inView: isTopBoundaryVisible } = useInView({
      initialInView: true,
      root: scrollArea,
      skip: !showScrollFade && !showScrollToTop,
    });
    const { ref: bottomBoundaryRef, inView: isBottomBoundaryVisible } = useInView({
      initialInView: true,
      root: scrollArea,
      skip: !showScrollFade,
    });
    const isVisibleTopFade = !isTopBoundaryVisible;
    const isVisibleBottomFade = !isBottomBoundaryVisible;

    useImperativeHandle(ref, () => scrollArea!, [scrollArea]);

    const scrollToTop = () => {
      scrollArea?.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
      <div className={cn("relative min-h-0 w-full overflow-hidden", className)}>
        <div
          ref={setScrollArea}
          className={cn("h-full w-full overflow-y-auto", scrollAreaClassName)}
          {...props}
        >
          <div className={cn("relative min-h-full w-full shrink-0", contentClassName)}>
            <ScrollBoundary ref={topBoundaryRef} edge="top" />
            {children}
            <ScrollBoundary ref={bottomBoundaryRef} edge="bottom" />
          </div>
        </div>
        {showScrollFade && (
          <>
            <ScrollEdgeFade
              edge="top"
              visible={showTopFade && isVisibleTopFade}
              className={cn("absolute inset-x-0 top-0 z-[90]", fadeSizeClassName)}
            />
            <ScrollEdgeFade
              edge="bottom"
              visible={isVisibleBottomFade}
              className={cn("absolute inset-x-0 bottom-0 z-[90]", fadeSizeClassName)}
            />
          </>
        )}
        {showScrollToTop && isVisibleTopFade && (
          <ScrollToTopButton onClick={scrollToTop} />
        )}
      </div>
    );
  },
);

ScrollContainer.displayName = 'ScrollContainer';
