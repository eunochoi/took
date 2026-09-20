'use client';

import Carousel from '@/common/components/ui/Carousel';
import type { DiaryData } from '@/common/types/diary';
import { cn } from '@/common/utils/cn';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { IoMdImage } from 'react-icons/io';
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
    <article className="box-border flex w-full shrink-0 flex-col gap-4 rounded-theme bg-theme-surface p-4 shadow-theme-section">
      <DiaryDateHeader diaryData={diaryData} />
      <div className="flex flex-col gap-3">
        {hasImages && (
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg bg-theme-surface-muted">
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
                    {index === 0 ? <Image
                      priority
                      className="h-full w-full object-cover"
                      src={image.src}
                      width={800}
                      height={480}
                      alt={`일기 사진 ${index + 1}`}
                      draggable={false}
                    /> : <Image
                      className="h-full w-full object-cover"
                      src={image.src}
                      width={800}
                      height={480}
                      alt={`일기 사진 ${index + 1}`}
                      draggable={false}
                    />}

                  </button>
                ))}
              </Carousel>
            </div>
          </div>
        )}
        {hasImages && (
          <span className="flex shrink-0 items-center gap-1 whitespace-nowrap text-sm text-theme-text-tertiary">
            <IoMdImage aria-hidden="true" className="text-base" />
            사진 {images.length}장
          </span>
        )}
        <button
          type="button"
          onClick={navigateToZoom}
          aria-label={`${diaryData.date} 일기 자세히 보기`}
          className="min-w-0 w-full text-left text-base leading-[1.8] text-theme-text-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-theme-accent"
        >
          <span className="line-clamp-3 whitespace-pre-wrap break-words">{diaryData.text}</span>
        </button>
        <DiaryHabits habits={diaryData.Habits} />
      </div>
    </article>
  );
};

export default DiaryCard;
