'use client';

import type { DiaryData } from '@/common/types/diary';
import { cn } from '@/common/utils/cn';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Carousel from '../Carousel';
import DiaryDateHeader from './DiaryDateHeader';
import DiaryHabits from './DiaryHabits';

interface Props {
  diaryData: DiaryData;
}

const Diary = ({ diaryData }: Props) => {
  const router = useRouter();
  const { Images: images } = diaryData;
  const hasImages = images.length > 0;

  const navigateToZoom = () => {
    router.push(`/inter/zoom?id=${diaryData.id}`, { scroll: false });
  };

  return (
    <article className="box-border flex h-auto min-h-[250px] w-full shrink-0 flex-col items-start justify-between overflow-hidden rounded-theme bg-theme-surface shadow-theme-section backdrop-blur-xl max-tablet:min-h-[200px]">
      <DiaryDateHeader diaryData={diaryData} />
      <div className="my-4 flex h-full w-full flex-col justify-center gap-4" onClick={navigateToZoom}>
        {hasImages && (
          <div className="h-[300px] w-full">
            <Carousel>
              {images.map((img) => (
                <Image
                  className="h-full w-full object-cover"
                  key={img.id}
                  src={img.src}
                  width={400}
                  height={400}
                  alt="diary image"
                />
              ))}
            </Carousel>
          </div>
        )}
        <div
          className={cn(
            'shrink-0 overflow-hidden whitespace-pre-wrap break-words px-4 text-base leading-[1.8] text-theme-text-secondary [display:-webkit-box] [-webkit-box-orient:vertical]',
            hasImages ? '[-webkit-line-clamp:4]' : '[-webkit-line-clamp:6]',
          )}
        >
          {diaryData.text}
        </div>
      </div>
      <DiaryHabits habits={diaryData.Habits} />
    </article>
  );
};

export default Diary;
