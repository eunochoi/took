import Carousel from '@/common/components/ui/Carousel';
import DiaryMenus from '@/common/components/ui/Diary/DiaryMenus';
import type { DiaryData } from '@/common/types/diary';
import { cn } from '@/common/utils/cn';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { MdChevronRight, MdMenuBook, MdMoreVert } from 'react-icons/md';
import SelectedDaySectionHeader from '../SelectedDaySectionHeader';
import { selectedDayInfoStyles } from '../selectedDayInfoStyles';
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
    <div className={cn('relative', selectedDayInfoStyles.section.frame)}>
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
      {hasDiary ? (
        <div className="flex w-full flex-col">
          {images.length > 0 && (
            <Carousel className={selectedDayInfoStyles.diary.imageFrame}>
              {images.map((image, index) => (
                <Image
                  priority={index === 0}
                  className="h-full w-full object-cover"
                  key={image.id}
                  src={image.src}
                  width={600}
                  height={600}
                  sizes="(max-width: 479px) calc(100vw - 76px), 440px"
                  alt={`일기 이미지 ${index + 1}`}
                />
              ))}
            </Carousel>
          )}
          <div
            className={cn(
              selectedDayInfoStyles.section.contentInset,
              selectedDayInfoStyles.diary.body,
              images.length > 0 && selectedDayInfoStyles.diary.bodyAfterMedia,
            )}
          >
            <p className={selectedDayInfoStyles.diary.text}>{diaryData.text}</p>
            <button className={selectedDayInfoStyles.diary.openButton} onClick={onOpenDiary} type="button">
              일기 전체 보기 <MdChevronRight className="text-lg" />
            </button>
          </div>
        </div>
      ) : (
        <SelectedDayDiaryEmptyState isFuture={isFuture} onAddDiary={onAddDiary} />
      )}
    </div>
  );
};

export default SelectedDayDiarySection;
