import Carousel from '@/common/components/ui/Carousel';
import DiaryMenus from '@/common/components/ui/Diary/DiaryMenus';
import { DIARY_TEXT_PREVIEW_LINE_COUNT } from '@/common/constants/diary';
import type { DiaryData } from '@/common/types/diary';
import { cn } from '@/common/utils/cn';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { MdChevronRight, MdMenuBook, MdMoreVert } from 'react-icons/md';
import SelectedDaySectionHeader from '../SelectedDaySectionHeader';
import SelectedDayDiaryEmptyState from './SelectedDayDiaryEmptyState';

interface Props {
  diaryData?: DiaryData | null;
  isFuture: boolean;
  onAddDiary: () => void;
  onOpenDiary: () => void;
}

const SelectedDayDiarySection = ({ diaryData, isFuture, onAddDiary, onOpenDiary }: Props) => {
  const hasDiary = diaryData?.visible === true;
  const images = diaryData?.Images ?? [];
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMenuOpen(false);
  }, [diaryData]);

  return (
    <div className="relative min-w-0 p-1">
      <SelectedDaySectionHeader title="감정 일기" icon={<MdMenuBook />}>
        {hasDiary && (
          <button
            ref={menuButtonRef}
            className="flex cursor-pointer items-center gap-2 text-xl text-theme-text-tertiary"
            onClick={() => setMenuOpen((prev) => !prev)}
            type="button"
            aria-label="일기 메뉴"
            aria-expanded={isMenuOpen}
          >
            <MdMoreVert />
          </button>
        )}
      </SelectedDaySectionHeader>
      {hasDiary && (
        <DiaryMenus
          isMenuOpen={isMenuOpen}
          setMenuOpen={setMenuOpen}
          anchorRef={menuButtonRef}
          diaryData={diaryData}
        />
      )}
      <div className="flex w-full py-3 px-2">
        {hasDiary ? (
          <div className="flex w-full items-stretch gap-3"
            onClick={onOpenDiary}
          >
            {images.length > 0 && (
              <Carousel
                containerClassName="w-2/5 shrink-0"
                className="aspect-square"
                showImageBorder
              >
                {images.map((image, index) => (
                  <Image
                    className="h-full w-full object-cover"
                    key={image.id}
                    src={image.src}
                    width={600}
                    height={600}
                    sizes="(min-width: 1024px) 140px, (min-width: 480px) min(200px, calc(40vw - 35px)), calc(36vw - 6px)"
                    alt={`일기 이미지 ${index + 1}`}
                  />
                ))}
              </Carousel>
            )}
            <div
              className={cn(
                'flex min-w-0 flex-1 flex-col gap-4',
                images.length > 0 && 'justify-evenly',
              )}
            >
              <p
                className="overflow-hidden whitespace-pre-wrap break-words text-base leading-relaxed text-theme-text-secondary [display:-webkit-box] [-webkit-box-orient:vertical]"
                style={{ WebkitLineClamp: DIARY_TEXT_PREVIEW_LINE_COUNT }}
              >
                {diaryData.text}
              </p>
              <button className="flex items-center self-end text-xs font-semibold text-theme-accent desktop:text-sm" type="button">
                일기 전체 보기 <MdChevronRight className="text-lg" />
              </button>
            </div>
          </div>
        ) : (
          <SelectedDayDiaryEmptyState isFuture={isFuture} onAddDiary={onAddDiary} />
        )}
      </div>
    </div>
  );
};

export default SelectedDayDiarySection;
