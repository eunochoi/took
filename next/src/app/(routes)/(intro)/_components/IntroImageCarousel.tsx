import Image from 'next/image';

import Carousel from '@/common/components/ui/Carousel';
import { cn } from '@/common/utils/cn';
import { IMAGE_ALT_TEXT } from '../_constants/images';

interface IntroImageCarouselProps {
  className?: string;
  images: string[];
  priorityFirst?: boolean;
  sizes: string;
}

const IntroImageCarousel = ({
  className,
  images,
  priorityFirst = false,
  sizes,
}: IntroImageCarouselProps) => {
  return (
    <Carousel
      containerClassName="pt-3"
      className={cn("aspect-auto h-[600px]", className)}
    >
      {images.map((src, index) => (
        <Image
          className="h-full w-full object-contain"
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
  );
};

export default IntroImageCarousel;
