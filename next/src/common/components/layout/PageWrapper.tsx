'use client'
import { useScroll } from "@/common/hooks/useScrollContext";
import { forwardRef, useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const PageWrapper = forwardRef<HTMLDivElement, PageWrapperProps>(({ children, className }, ref) => {
  const { scrolled } = useScroll();
  const [isScrollable, setIsScrollable] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ref가 전달되었으면 그것을 사용하고, 없으면 내부 ref 사용
    const wrapper = (ref && typeof ref === 'object' && 'current' in ref ? ref.current : null) || wrapperRef.current;
    if (!wrapper) return;

    const checkScrollable = () => {
      const hasScroll = wrapper.scrollHeight > wrapper.clientHeight;
      setIsScrollable(hasScroll);
    };

    // 렌더링 완료 후 스크롤 가능 여부 체크
    const timeoutId = setTimeout(checkScrollable, 0);

    // 컨텐츠 크기 변화 감지
    const resizeObserver = new ResizeObserver(checkScrollable);
    resizeObserver.observe(wrapper);

    // DOM 변화 감지 (children 변경 시)
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

  // ref가 전달되었으면 그것을 사용하고, 없으면 내부 ref 사용
  const finalRef = (ref && typeof ref === 'object' && 'current' in ref) ? ref : wrapperRef;

  return (
    <Wrapper ref={finalRef} className={className} data-scroll-container>
      <TopGradient className={isScrollable && scrolled ? 'visible' : ''} />
      {children}
      <BottomGradient className={isScrollable ? 'visible' : ''} />
    </Wrapper>
  );
});

PageWrapper.displayName = 'PageWrapper';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100dvh;

  border: none;
  outline: none;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  overflow-y: scroll;

  animation: pageIn 0.4s ease-out;

  @keyframes pageIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const TopGradient = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 0;
  z-index: 90;
  pointer-events: none;
  flex-shrink: 0;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    
    background: linear-gradient(
      to bottom,
      var(--theme-bg, #f5f5fa) 0%,
      color-mix(in srgb, var(--theme-bg, #f5f5fa) 70%, transparent) 40%,
      color-mix(in srgb, var(--theme-bg, #f5f5fa) 30%, transparent) 70%,
      transparent 100%
    );
    
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &.visible::after {
    opacity: 1;
  }
`;

const BottomGradient = styled.div`
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 0;
  z-index: 90;
  pointer-events: none;
  flex-shrink: 0;
  margin-top: auto;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 70px;
    
    background: linear-gradient(
      to top,
      var(--theme-bg, #f5f5fa) 0%,
      color-mix(in srgb, var(--theme-bg, #f5f5fa) 70%, transparent) 40%,
      color-mix(in srgb, var(--theme-bg, #f5f5fa) 30%, transparent) 70%,
      transparent 100%
    );
    
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &.visible::after {
    opacity: 1;
  }

  @media (max-width: 479px) {
    &::after {
      height: 70px;
    }
  }
`;