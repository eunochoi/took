import type { DiaryImage } from "@/common/types/diary";
import { cn } from "@/common/utils/cn";
import Image from "next/image";

interface ZoomViewImageSlideProps {
  image: DiaryImage;
  index: number;
  isFullView: boolean;
  onToggleView: () => void;
}

export const ZoomViewImageSlide = ({ image, index, isFullView, onToggleView }: ZoomViewImageSlideProps) => (
  <button
    type="button"
    className={cn(
      "relative h-full w-full overflow-hidden rounded-theme focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-theme-accent",
      isFullView ? "cursor-zoom-in" : "cursor-zoom-out",
    )}
    aria-label={`사진 ${index + 1} ${isFullView ? '크롭해서 보기' : '전체 보기'}`}
    aria-pressed={isFullView}
    onClick={onToggleView}
  >
    <Image
      className={cn("rounded-theme", isFullView ? "object-contain" : "object-cover")}
      src={image.src}
      alt={`일기에 첨부한 사진 ${index + 1}`}
      fill
      sizes="(min-width: 1024px) 35vw, (orientation: landscape) and (max-height: 600px) and (min-width: 640px) 45vw, 90vw"
      draggable={false}
    />
  </button>
);
