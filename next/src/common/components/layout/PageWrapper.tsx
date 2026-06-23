'use client';
import { ScrollEdgeFade } from "@/common/components/ui/Modal/ScrollEdgeFade";
import { useScroll } from "@/common/hooks/useScrollContext";
import { cn } from "@/common/utils/cn";
import { forwardRef, useEffect, useRef, useState } from "react";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const PageWrapper = forwardRef<HTMLDivElement, PageWrapperProps>(({ children, className }, ref) => {
  const { scrolled } = useScroll();
  const [isScrollable, setIsScrollable] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = (ref && typeof ref === 'object' && 'current' in ref ? ref.current : null) || wrapperRef.current;
    if (!wrapper) return;

    const checkScrollable = () => {
      const hasScroll = wrapper.scrollHeight > wrapper.clientHeight;
      setIsScrollable(hasScroll);
    };

    const timeoutId = setTimeout(checkScrollable, 0);

    const resizeObserver = new ResizeObserver(checkScrollable);
    resizeObserver.observe(wrapper);

    const mutationObserver = new MutationObserver(checkScrollable);
    mutationObserver.observe(wrapper, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [ref, children]);

  const finalRef = (ref && typeof ref === 'object' && 'current' in ref) ? ref : wrapperRef;

  return (
    <div
      ref={finalRef}
      className={cn(
        "relative flex h-[100dvh] w-full flex-col items-center justify-start overflow-y-scroll border-none outline-none",
        className,
      )}
      data-scroll-container
    >
      <div className="pointer-events-none sticky left-0 right-0 top-0 z-[90] h-0 w-full shrink-0">
        <ScrollEdgeFade
          edge="top"
          visible={isScrollable && scrolled}
          className="absolute inset-x-0 top-0 h-[70px]"
        />
      </div>
      {children}
      <div className="pointer-events-none sticky bottom-0 left-0 right-0 z-[90] mt-auto h-0 w-full shrink-0">
        <ScrollEdgeFade
          edge="bottom"
          visible={isScrollable}
          className="absolute inset-x-0 bottom-0 h-[70px]"
        />
      </div>
    </div>
  );
});

PageWrapper.displayName = 'PageWrapper';
