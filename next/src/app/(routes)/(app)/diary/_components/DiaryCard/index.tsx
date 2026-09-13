'use client';

import type { DiaryData } from '@/common/types/diary';
import { cn } from '@/common/utils/cn';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { IoMdImage } from 'react-icons/io';
import Carousel from '@/common/components/ui/Carousel';
import DiaryDateHeader from './DiaryDateHeader';
import DiaryHabits from './DiaryHabits';

interface Props {
  diaryData: DiaryData;
}

const DiaryCard = ({ diaryData }: Props) => {
  const router = useRouter();
  const { Images: images } = diaryData;
  const hasImages = images.length > 0;

  const navigateToZoom = () => {
    router.push(`/inter/zoom?id=${diaryData.id}`, { scroll: false });
  };

  return (
    <article className="box-border w-full shrink-0 rounded-theme bg-theme-surface shadow-theme-section">
      <DiaryDateHeader diaryData={diaryData} />
      <div className="mx-4 border-t border-dashed border-theme-border-muted" aria-hidden="true" />
      <div className="flex flex-col gap-3 py-4">
        <button
          type="button"
          onClick={navigateToZoom}
          aria-label={`${diaryData.date} 일기 자세히 보기`}
          className="min-w-0 w-full px-4 text-left text-base leading-[1.8] text-theme-text-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-theme-accent"
        >
          <span className="line-clamp-3 whitespace-pre-wrap break-words">{diaryData.text}</span>
        </button>
        {hasImages && (
          <div className="relative aspect-[5/3] w-full overflow-hidden bg-theme-surface-muted">
            <div className="absolute inset-0">
              <Carousel
                className={cn(images.length > 1 && '[&>div:last-child]:absolute [&>div:last-child]:bottom-1 [&>div:last-child]:z-10')}
              >
                {images.map((image, index) => (
                  <button
                    key={image.id}
                    type="button"
                    onClick={navigateToZoom}
                    aria-label={`${diaryData.date} 일기 사진 ${index + 1} 상세 보기`}
                    className="h-full w-full focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-theme-accent"
                  >
                    <Image
                      className="h-full w-full object-cover"
                      src={image.src}
                      width={800}
                      height={480}
                      alt={`일기 사진 ${index + 1}`}
                      draggable={false}
                    />
                  </button>
                ))}
              </Carousel>
            </div>
          </div>
        )}
        {hasImages && (
          <span className="flex shrink-0 items-center gap-1 whitespace-nowrap px-4 text-sm text-theme-text-tertiary">
            <IoMdImage aria-hidden="true" className="text-base" />
            사진 {images.length}장
          </span>
        )}
        <div className="mx-4 mt-1 border-t border-dashed border-theme-border-muted pt-3">
          <DiaryHabits habits={diaryData.Habits} />
        </div>
      </div>
    </article>
  );
};

export default DiaryCard;
