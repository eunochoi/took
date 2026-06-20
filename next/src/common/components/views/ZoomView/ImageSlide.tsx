'use client';

import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import { ZoomViewImage } from "./types";

interface ImageSlideProps {
  images: ZoomViewImage[];
}

export const ImageSlide = ({ images }: ImageSlideProps) => {
  const [zoomState, setZoomState] = useState<'zoom' | ''>('');
  const zoomToggle = () => {
    if (zoomState === '') setZoomState('zoom');
    else setZoomState('');
  }

  return (<>
    {images?.map((e: ZoomViewImage) =>
      <ImageWrapper key={e.id} className="slideChild">
        <Img onClick={zoomToggle} className={zoomState} src={e.src} alt="zoomImage" width={400} height={400} placeholder="blur" blurDataURL={e.src} />
      </ImageWrapper>)}
  </>);
}

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
`
const Img = styled(Image)`
  width: 100%;
  height: 100%;

  object-fit: contain;
  &.zoom{
    object-fit: cover;
  }
`