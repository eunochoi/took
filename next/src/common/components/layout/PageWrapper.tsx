'use client';
import { useScroll } from "@/common/hooks/useScrollContext";
import { forwardRef, useEffect, useRef, useState } from "react";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

const gradientStyle = (direction: "top" | "bottom"): React.CSSProperties => ({
  background: `linear-gradient(
    to ${direction},
    var(--theme-bg, #f5f5fa) 0%,
    color-mix(in srgb, var(--theme-bg, #f5f5fa) 70%, transparent) 40%,
    color-mix(in srgb, var(--theme-bg, #f5f5fa) 30%, transparent) 70%,
    transparent 100%
  )`,
});

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
      className={cx(
        "relative flex h-[100dvh] w-full flex-col items-center justify-start overflow-y-scroll border-none outline-none",
        className,
      )}
      data-scroll-container
    >
      <div className="pointer-events-none sticky left-0 right-0 top-0 z-[90] h-0 w-full shrink-0">
        <div
          className={cx(
            "absolute inset-x-0 top-0 h-[70px] transition-opacity duration-300 ease-in-out",
            isScrollable && scrolled ? "opacity-100" : "opacity-0",
          )}
          style={gradientStyle("bottom")}
        />
      </div>
      {children}
      <div className="pointer-events-none sticky bottom-0 left-0 right-0 z-[90] mt-auto h-0 w-full shrink-0">
        <div
          className={cx(
            "absolute inset-x-0 bottom-0 h-[70px] transition-opacity duration-300 ease-in-out",
            isScrollable ? "opacity-100" : "opacity-0",
          )}
          style={gradientStyle("top")}
        />
      </div>
    </div>
  );
});

PageWrapper.displayName = 'PageWrapper';
