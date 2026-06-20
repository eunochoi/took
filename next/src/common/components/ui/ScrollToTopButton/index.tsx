import styled from "styled-components";

import { useEffect, useRef, useState } from "react";
import { MdArrowUpward } from 'react-icons/md';

interface Props {
  contentRef: React.MutableRefObject<HTMLDivElement | null>;
}

const ScrollToTopButton = ({ contentRef }: Props) => {
  const scrollTimeoutRef = useRef<number | null>(null);
  const [buttonVisible, setButtonVisible] = useState<boolean>(false);
  const buttonVisibleHeight = 2000;

  const goToTop = () => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeoutRef.current !== null) {
        cancelAnimationFrame(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = requestAnimationFrame(() => {
        if (!buttonVisible && contentRef.current && contentRef.current.scrollTop > buttonVisibleHeight) {
          setButtonVisible(true);
        }
        else if (buttonVisible && contentRef.current && contentRef.current.scrollTop <= buttonVisibleHeight) {
          setButtonVisible(false);
        }
      });
    };
    const container = contentRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      if (scrollTimeoutRef.current !== null) {
        cancelAnimationFrame(scrollTimeoutRef.current);
      }
    };
  }, [buttonVisible, buttonVisibleHeight]);

  if (!buttonVisible) return null;

  return (
    <Wrapper onClick={goToTop}>
      <MdArrowUpward />
    </Wrapper>
  );
}

export default ScrollToTopButton;

const Wrapper = styled.button`
  position: fixed;
  right: 4dvw;

  @media (max-width: 479px) {
    bottom: calc(var(--mobileNav) + 20px);
  }
  @media (min-width:480px) and (max-width:1024px) {
    bottom: 32px;
  }
  @media (min-width:1025px) {
    bottom: 48px;
  }

  display: flex;
  justify-content: center;
  align-items: center;

  width: 40px;
  height: 40px;
  border-radius: 20px;
  font-size: 20px;

  background-color: rgba(255,255,255,0.8);
  backdrop-filter: blur(20px);
  color: ${(props) => props.theme.themeColor ? props.theme.themeColor : '#979FC7'};
  box-shadow: 0 1px 6px rgba(0,0,0,0.06);
`