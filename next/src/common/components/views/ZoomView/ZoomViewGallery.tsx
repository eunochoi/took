'use client';

import Carousel from "@/common/components/ui/Carousel";
import type { DiaryImage } from "@/common/types/diary";
import { useState } from "react";
import { IoMdImage } from "react-icons/io";
import { ZoomViewImageSlide } from "./ZoomViewImageSlide";

interface ZoomViewGalleryProps {
  images: DiaryImage[];
}

export const ZoomViewGallery = ({ images }: ZoomViewGalleryProps) => {
  const [fullViewImageId, setFullViewImageId] = useState<string | null>(null);

  return (
    <section className="min-w-0 desktop:sticky desktop:top-0 landscape-short:sticky landscape-short:top-0" aria-label="첨부 사진">
      <h2 className="mb-4 flex items-center gap-2 font-title text-sm text-theme-text-secondary landscape-short:mb-2">
        <IoMdImage aria-hidden="true" className="shrink-0 text-lg text-theme-accent-text" />
        함께 남긴 장면
      </h2>
      <Carousel
        className="aspect-auto h-[min(90dvw,520px)] desktop:h-[min(65dvh,640px)] landscape-short:h-[max(180px,calc(100dvh-150px))]"
        indicatorPosition="below"
        gap
        onPageChange={() => setFullViewImageId(null)}
      >
        {images.map((image, index) => (
          <ZoomViewImageSlide
            key={image.id}
            image={image}
            index={index}
            isFullView={fullViewImageId === image.id}
            onToggleView={() => setFullViewImageId((currentId) => currentId === image.id ? null : image.id)}
          />
        ))}
      </Carousel>
    </section>
  );
};
