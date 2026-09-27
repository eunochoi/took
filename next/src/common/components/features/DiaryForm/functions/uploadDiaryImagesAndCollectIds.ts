import type { DiaryImageDraft } from '../types';
import { uploadImages } from '@/common/actions/image';
import { authAction } from '@/common/auth/authAction';
import { collectFinalImageContentIds, type CollectedDiaryImageContentIds } from './collectFinalImageContentIds';

export const uploadDiaryImagesAndCollectIds = async (
  diaryImageDrafts: DiaryImageDraft[],
): Promise<CollectedDiaryImageContentIds> => {
  const newImageFiles = diaryImageDrafts.filter(
    (image): image is File => image instanceof File,
  );

  if (newImageFiles.length === 0) {
    return collectFinalImageContentIds(diaryImageDrafts, []);
  }

  const imageFormData = new FormData();

  newImageFiles.forEach((file) => {
    imageFormData.append('image', file);
  });

  const uploadedDiaryImages = await authAction(() => uploadImages(imageFormData));

  if (uploadedDiaryImages.length !== newImageFiles.length) {
    throw new Error('IMAGE_UPLOAD_RESULT_MISMATCH');
  }

  return collectFinalImageContentIds(
    diaryImageDrafts,
    uploadedDiaryImages,
  );
};
