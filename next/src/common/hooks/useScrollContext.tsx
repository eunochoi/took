'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

interface ScrollContextType {
  scrollTop: number;
  scrolled: boolean;
}

const ScrollContext = createContext<ScrollContextType>({ scrollTop: 0, scrolled: false });

export const ScrollProvider = ({ children }: { children: ReactNode }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [container, setContainer] = useState<Element | null>(null);
  const pathname = usePathname();

  // 페이지 전환 시 컨테이너 다시 찾기
  useEffect(() => {
    setScrollTop(0);
    setContainer(null);

    const findContainer = () => {
      const el = document.querySelector('[data-scroll-container]');
      if (el) {
        setContainer(el);
        return true;
      }
      return false;
    };

    // 약간의 딜레이 후 컨테이너 찾기 (DOM 렌더링 대기)
    const timeout = setTimeout(() => {
      if (findContainer()) return;

      // 못 찾으면 재시도
      let attempts = 0;
      const interval = setInterval(() => {
        if (findContainer() || attempts++ > 10) {
          clearInterval(interval);
        }
      }, 50);
    }, 50);

    return () => clearTimeout(timeout);
  }, [pathname]);

  // 스크롤 이벤트 리스너
  useEffect(() => {
    if (!container) return;

    const handleScroll = () => setScrollTop(container.scrollTop);
    container.addEventListener('scroll', handleScroll, { passive: true });
    
    handleScroll();
    
    return () => container.removeEventListener('scroll', handleScroll);
  }, [container]);

  return (
    <ScrollContext.Provider value={{ scrollTop, scrolled: scrollTop > 10 }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => useContext(ScrollContext);
