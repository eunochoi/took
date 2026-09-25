'use client';

import { cn } from "@/common/utils/cn";
import { AnimatePresence } from "framer-motion";
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
      // 상하단 fade, top button을 주기위한 wrapper, 전체 틀
      <div className={cn("relative min-h-0 w-full overflow-hidden", className)}>
        {/* 내부 컨텐츠가 증가함에 따라 스크롤이 생기는 컨테이너 */}
        <div
          ref={setScrollArea}
          className={cn("h-full w-full overflow-y-auto", scrollAreaClassName)}
          {...props}
        >
          {/* 내부 컨텐츠가 늘어남에 따라 같이 높어나며 컨텐츠를 묶어주는 컨테이너 */}
          {/* 컨텐츠가 높이 변화에 따라 top, bottom에 스크롤 감지를 위한 바운더리가 위치 */}
          <div className={cn("relative min-h-full w-full shrink-0", contentClassName)}>
            {/* 스크롤 감지를 위한 바운더리, absoulte로 위치가 지정되어 높이가 컨텐츠 감싸는 컨테이너에 영향을 끼치지 못함 */}
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
        <AnimatePresence>
          {showScrollToTop && isVisibleTopFade && (
            <ScrollToTopButton onClick={scrollToTop} />
          )}
        </AnimatePresence>
      </div>
    );
  },
);

ScrollContainer.displayName = 'ScrollContainer';
