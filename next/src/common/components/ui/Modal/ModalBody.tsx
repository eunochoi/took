'use client';

import { cn } from "@/common/utils/cn";
import { HTMLAttributes, MutableRefObject, forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { ScrollEdgeFade } from "./ScrollEdgeFade";

interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {
  withScrollFade?: boolean;
}

export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ children, className, withScrollFade = false, ...props }, ref) => {
    const bodyRef = useRef<HTMLDivElement | null>(null);
    const [isScrollable, setIsScrollable] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const setRefs = useCallback((node: HTMLDivElement | null) => {
      bodyRef.current = node;

      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as MutableRefObject<HTMLDivElement | null>).current = node;
      }
    }, [ref]);

    const checkScroll = useCallback(() => {
      const body = bodyRef.current;
      if (!body || !withScrollFade) return;

      setIsScrollable(body.scrollHeight > body.clientHeight);
      setScrolled(body.scrollTop > 0);
    }, [withScrollFade]);

    useEffect(() => {
      const body = bodyRef.current;
      if (!body || !withScrollFade) return;

      checkScroll();
      body.addEventListener('scroll', checkScroll);

      const resizeObserver = new ResizeObserver(checkScroll);
      resizeObserver.observe(body);

      const mutationObserver = new MutationObserver(checkScroll);
      mutationObserver.observe(body, {
        childList: true,
        subtree: true,
      });

      return () => {
        body.removeEventListener('scroll', checkScroll);
        resizeObserver.disconnect();
        mutationObserver.disconnect();
      };
    }, [checkScroll, children, withScrollFade]);

    return (
      <div
        ref={setRefs}
        className={cn("flex w-full grow flex-col items-center justify-start overflow-y-auto", className)}
        {...props}
      >
        {withScrollFade && (
          <ScrollEdgeFade
            edge="top"
            visible={isScrollable && scrolled}
            className="sticky inset-x-0 top-0 z-[90] h-12 w-full shrink-0 -mb-12"
          />
        )}
        {children}
        {withScrollFade && (
          <ScrollEdgeFade
            edge="bottom"
            visible={isScrollable}
            className="sticky inset-x-0 bottom-0 z-[90] mt-auto h-12 w-full shrink-0"
          />
        )}
      </div>
    );
  },
);

ModalBody.displayName = 'ModalBody';
