import type { UploadedImage } from '@/common/actions/image/types';
import type { DiaryImageDraft } from '../types';

export type CollectedDiaryImageContentIds = {
  imageContentIds: string[];
  duplicateImageCount: number;
};

export const collectFinalImageContentIds = (
  diaryImageDrafts: DiaryImageDraft[],
  uploadedDiaryImages: UploadedImage[],
): CollectedDiaryImageContentIds => {
  let uploadedImageIndex = 0;

  const finalDiaryImages = diaryImageDrafts.map((image) => {
    if (image instanceof File) {
      const uploadedImage = uploadedDiaryImages[uploadedImageIndex++];

      if (!uploadedImage) {
        throw new Error('IMAGE_UPLOAD_RESULT_MISMATCH');
      }

      return uploadedImage;
    }

    return image;
  });

  const allImageContentIds = finalDiaryImages.map(
    (image) => image.imageContentId,
  );
  const imageContentIds = Array.from(new Set(allImageContentIds));

  return {
    imageContentIds,
    duplicateImageCount: allImageContentIds.length - imageContentIds.length,
  };
};
