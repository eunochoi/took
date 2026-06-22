import Image from 'next/image';
import styled from 'styled-components';

import Carousel from '@/common/components/ui/Carousel';
import { IMAGE_ALT_TEXT } from '../_constants/images';
import { INTRO_THEME_COLOR } from '../_constants/theme';

interface IntroImageCarouselProps {
  images: string[];
  height?: number;
  priorityFirst?: boolean;
  sizes: string;
}

const IntroImageCarousel = ({
  images,
  height = 420,
  priorityFirst = false,
  sizes,
}: IntroImageCarouselProps) => {
  return (
    <CarouselCard $height={height}>
      <Carousel objectFit="contain" indicatorColor={INTRO_THEME_COLOR}>
        {images.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`${IMAGE_ALT_TEXT[src] ?? 'TOOK 앱 화면'} 미리보기`}
            width={900}
            height={900}
            priority={priorityFirst && index === 0}
            sizes={sizes}
          />
        ))}
      </Carousel>
    </CarouselCard>
  );
};

export default IntroImageCarousel;

const CarouselCard = styled.div<{ $height: number }>`
  width: 100%;
  height: ${({ $height }) => $height}px;
  padding: 12px 0 0;
  background-color: transparent;
  overflow: hidden;

  @media (min-width: 1025px) {
    padding-top: 16px;
  }
`;
