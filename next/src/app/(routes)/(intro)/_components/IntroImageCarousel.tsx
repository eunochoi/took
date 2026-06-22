import Image from 'next/image';

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
    <div className="w-full overflow-hidden bg-transparent pt-3 min-[1025px]:pt-4" style={{ height }}>
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
    </div>
  );
};

export default IntroImageCarousel;
