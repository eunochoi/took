import Carousel from '@/common/components/ui/Carousel';
import type { DiaryData } from '@/common/types/diary';
import { cn } from '@/common/utils/cn';
import Image from 'next/image';
import { MdChevronRight } from 'react-icons/md';
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

  return (
    <div className={selectedDayInfoStyles.section.frame}>
      <SelectedDaySectionHeader title="감정 일기" />
      {hasDiary ? (
        <div className="flex w-full flex-col">
          {images.length > 0 && (
            <div className={selectedDayInfoStyles.diary.imageFrame}>
              <Carousel
                className={cn(
                  images.length > 1 && selectedDayInfoStyles.diary.carouselWithIndicator,
                )}
              >
                {images.map((image, index) => (
                  <Image
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
            </div>
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
