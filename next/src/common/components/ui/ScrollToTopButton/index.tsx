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
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
  }, [buttonVisible, contentRef]);

  if (!buttonVisible) return null;

  return (
    <button
      className="fixed right-[4dvw] flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-xl text-theme shadow-[0_1px_6px_rgba(0,0,0,0.06)] backdrop-blur-xl max-[479px]:bottom-[calc(var(--mobileNav)+20px)] min-[480px]:max-[1024px]:bottom-8 min-[1025px]:bottom-12"
      onClick={goToTop}
      type="button"
    >
      <MdArrowUpward />
    </button>
  );
};

export default ScrollToTopButton;
