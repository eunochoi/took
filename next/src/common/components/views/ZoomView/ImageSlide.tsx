'use client';

import Image from "next/image";
import { useState } from "react";
import { ZoomViewImage } from "./types";

interface ImageSlideProps {
  images: ZoomViewImage[];
}

export const ImageSlide = ({ images }: ImageSlideProps) => {
  const [zoomState, setZoomState] = useState<'zoom' | ''>('');
  const zoomToggle = () => {
    if (zoomState === '') setZoomState('zoom');
    else setZoomState('');
  };

  return (
    <>
      {images?.map((e: ZoomViewImage) =>
        <div key={e.id} className="slideChild h-full w-full shrink-0">
          <Image
            className={zoomState === 'zoom' ? "h-full w-full object-cover" : "h-full w-full object-contain"}
            onClick={zoomToggle}
            src={e.src}
            alt="zoomImage"
            width={400}
            height={400}
            placeholder="blur"
            blurDataURL={e.src}
          />
        </div>)}
    </>
  );
};
