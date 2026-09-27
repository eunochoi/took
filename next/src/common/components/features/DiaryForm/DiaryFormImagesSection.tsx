import { DIARY_IMAGE_MAX_COUNT } from '@/common/constants/image';
import type { ChangeEvent } from 'react';
import DiaryFormImages from './DiaryFormImages';
import type { DiaryImageDraft } from './types';

interface DiaryFormImagesSectionProps {
  diaryImages: DiaryImageDraft[];
  handleImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  getImageUrl: (image: DiaryImageDraft) => string;
  handleRemoveImage: (index: number) => void;
  isLoading: boolean;
  onReorder: (from: number, to: number) => void;
}

const DiaryFormImagesSection = ({
  diaryImages,
  handleImageChange,
  getImageUrl,
  handleRemoveImage,
  isLoading,
  onReorder,
}: DiaryFormImagesSectionProps) => (
  <section aria-labelledby="diary-images-title" className="flex w-full flex-col gap-3">
    <div className="flex items-center justify-between">
      <h2 id="diary-images-title" className="font-title text-base font-semibold text-theme-text-primary">오늘의 장면</h2>
      <span className="text-xs tabular-nums text-theme-text-secondary">{diaryImages.length} / {DIARY_IMAGE_MAX_COUNT}장</span>
    </div>
    <div className='flex flex-col p-2 gap-1'>
      <p className="text-xs leading-relaxed text-theme-text-secondary">
        {diaryImages.length > 1 ? '사진을 길게 누른 뒤 움직여 순서를 바꿔보세요.' : '오늘 기억하고 싶은 장면을 사진으로 남겨보세요.'}
      </p>
      <DiaryFormImages
        diaryImages={diaryImages}
        handleImageChange={handleImageChange}
        getImageUrl={getImageUrl}
        handleRemoveImage={handleRemoveImage}
        isLoading={isLoading}
        onReorder={onReorder}
      />
    </div>
  </section>
);

export default DiaryFormImagesSection;
