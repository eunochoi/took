'use client';

import Carousel from '@/common/components/ui/Carousel';
import { DIARY_TEXT_PREVIEW_LINE_COUNT } from '@/common/constants/diary';
import type { DiaryData } from '@/common/types/diary';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MdCheck } from 'react-icons/md';
import DiaryDateHeader from './DiaryDateHeader';

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
  const handleHabitClick = (habitId: number) => {
    router.push(`/inter/habitInfo?id=${habitId}`, { scroll: false });
  };

  return (
    <article className="box-border flex w-full shrink-0 flex-col gap-4 py-6 first:pt-0">
      <DiaryDateHeader diaryData={diaryData} />
      <div className='flex flex-col w-full h-auto p-2'>
        <div className="flex flex-col gap-3">
          {hasImages && (
            <Carousel className="aspect-[4/3] rounded-lg">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={navigateToZoom}
                  aria-label={`${diaryData.date} 일기 사진 ${index + 1} 상세 보기`}
                  className="h-full w-full focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-theme-accent"
                >
                  <Image
                    priority={index === 0}
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
          )}
          <button
            type="button"
            onClick={navigateToZoom}
            aria-label={`${diaryData.date} 일기 자세히 보기`}
            className="min-w-0 w-full text-left focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-theme-accent"
          >
            <span
              className="overflow-hidden text-base leading-[1.8] text-theme-text-secondary whitespace-pre-wrap break-words [display:-webkit-box] [-webkit-box-orient:vertical]"
              style={{ WebkitLineClamp: DIARY_TEXT_PREVIEW_LINE_COUNT }}
            >
              {diaryData.text}
            </span>
          </button>
        </div>
        {diaryData.Habits.length > 0 && (
          <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2" aria-label="습관">
            {diaryData.Habits.map((habit) => (
              <button
                type="button"
                key={habit.id}
                onClick={() => handleHabitClick(habit.id)}
                className="inline-flex max-w-full items-center gap-1 text-left text-sm text-theme-text-secondary focus-visible:ring-2 focus-visible:ring-theme-accent"
              >
                <MdCheck className="shrink-0 text-theme-accent" aria-hidden="true" />
                <span className="truncate">{habit.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export default DiaryCard;
