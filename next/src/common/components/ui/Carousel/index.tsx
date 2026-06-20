'use client';

import React, { ReactNode, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Indicator from "./Indicator";

interface CarouselProps {
  children: ReactNode;
  showIndicator?: boolean;
  gap?: number;
  resetOnChange?: boolean;
  className?: string;
  onPageChange?: (page: number) => void;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

const Carousel = ({ 
  children, 
  showIndicator = true, 
  gap = 0,
  resetOnChange = false,
  className,
  onPageChange,
  objectFit = 'cover'
}: CarouselProps) => {
  const childrenArray = React.Children.toArray(children);
  const slideWrapperRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<number>(0);

  // 페이지 변경 핸들러
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const newPage = Math.round((e.currentTarget?.scrollLeft - 1) / e.currentTarget?.clientWidth);
    setPage(newPage);
    onPageChange?.(newPage);
  };

  // 슬라이드 초기화 (예: 데이터 변경 시)
  useEffect(() => {
    if (resetOnChange) {
      slideWrapperRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [children, resetOnChange]);

  if (childrenArray.length === 0) return null;

  return (
    <Wrapper className={className}>
      <SlideWrapper 
        ref={slideWrapperRef} 
        $gap={gap}
        onScroll={handleScroll}
      >
        {childrenArray.map((child, i) => (
          <SlideItem key={`slide-${i}`} $gap={gap} $objectFit={objectFit}>
            {child}
          </SlideItem>
        ))}
      </SlideWrapper>
      {showIndicator && childrenArray.length > 1 && (
        <Indicator
          slideWrapperRef={slideWrapperRef}
          page={page}
          indicatorLength={childrenArray.length}
        />
      )}
    </Wrapper>
  );
};

export default Carousel;

// 부모의 100% 크기를 따르는 래퍼
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

// 스크롤 컨테이너
const SlideWrapper = styled.div<{ $gap: number }>`
  width: 100%;
  height: 100%;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  
  /* scroll-snap 설정 */
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  
  /* 스크롤바 숨김 */
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  /* gap 설정 - 첫 번째 제외하고 margin-left 적용 */
  ${props => props.$gap > 0 && `
    > *:not(:first-child) {
      margin-left: ${props.$gap}px;
    }
  `}
`;

// 각 슬라이드 아이템
const SlideItem = styled.div<{ $gap: number; $objectFit: string }>`
  /* 부모의 전체 너비를 차지 */
  min-width: 100%;
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  
  /* scroll-snap 정렬 */
  scroll-snap-align: center;
  scroll-snap-stop: always;
  
  /* 내부 컨텐츠가 넘치지 않도록 */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;

  /* gap이 있을 때 너비 조정 */
  ${props => props.$gap > 0 && `
    min-width: calc(100% - ${props.$gap}px);
    width: calc(100% - ${props.$gap}px);
  `}
  
  /* 직계 자식 요소만 크기 제한 */
  > * {
    max-width: 100%;
    max-height: 100%;
  }
  
  /* 직계 자식이 Image(img 태그)일 때만 object-fit 적용 */
  > img {
    width: 100%;
    height: 100%;
    object-fit: ${props => props.$objectFit};
  }
`;
