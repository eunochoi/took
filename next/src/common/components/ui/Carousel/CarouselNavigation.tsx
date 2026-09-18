import type { RefObject } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface CarouselNavigationProps {
  slideWrapperRef: RefObject<HTMLDivElement>;
  page: number;
  count: number;
  gap?: boolean;
}

const navigationButtonClass = "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-theme-accent/25 text-xl text-theme-text-secondary transition-colors hover:bg-theme-accent/10 disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent focus-visible:ring-2 focus-visible:ring-theme-accent";

export const CarouselNavigation = ({ slideWrapperRef, page, count, gap = false }: CarouselNavigationProps) => {
  const goToPage = (nextPage: number) => {
    const viewport = slideWrapperRef.current;
    if (!viewport) return;

    viewport.scrollTo({
      left: (viewport.clientWidth + (gap ? 16 : 0)) * nextPage,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  };

  return (
    <nav className="flex shrink-0 items-center justify-center gap-5 pt-4 landscape-short:pt-2" aria-label="사진 탐색">
      {count > 1 && (
        <button
          type="button"
          className={navigationButtonClass}
          aria-label="이전 사진"
          disabled={page === 0}
          onClick={() => goToPage(page - 1)}
        >
          <MdChevronLeft aria-hidden="true" />
        </button>
      )}
      <span className="min-w-12 text-center font-title text-sm tabular-nums text-theme-text-secondary" aria-live="polite" aria-atomic="true">
        <span className="sr-only">사진 </span>{page + 1} / {count}
      </span>
      {count > 1 && (
        <button
          type="button"
          className={navigationButtonClass}
          aria-label="다음 사진"
          disabled={page === count - 1}
          onClick={() => goToPage(page + 1)}
        >
          <MdChevronRight aria-hidden="true" />
        </button>
      )}
    </nav>
  );
};
