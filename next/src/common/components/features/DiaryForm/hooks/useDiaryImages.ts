import {
  DIARY_IMAGE_ALLOWED_MIME_TYPES,
  DIARY_IMAGE_MAX_COUNT,
  DIARY_IMAGE_MAX_SIZE_BYTES,
  DIARY_IMAGE_MAX_SIZE_MB,
} from '@/common/constants/image';
import { enqueueSnackbar } from 'notistack';
import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useEffect, useRef } from 'react';
import type { DiaryImageDraft } from '../types';

type UseDiaryImagesParams = {
  diaryImages: DiaryImageDraft[];
  setDiaryImages: Dispatch<SetStateAction<DiaryImageDraft[]>>;
};

type UseDiaryImagesResult = {
  handleImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  getImageUrl: (image: DiaryImageDraft) => string;
  handleRemoveImage: (index: number) => void;
};

export const useDiaryImages = ({
  diaryImages,
  setDiaryImages,
}: UseDiaryImagesParams): UseDiaryImagesResult => {
  const blobUrlCacheRef = useRef<Map<File, string>>(new Map());

  useEffect(() => {
    const cache = blobUrlCacheRef.current;

    return () => {
      cache.forEach((url) => URL.revokeObjectURL(url));
      cache.clear();
    };
  }, []);

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.files) return;

    const newImageFiles = Array.from(event.target.files);

    if (
      diaryImages.length + newImageFiles.length >
      DIARY_IMAGE_MAX_COUNT
    ) {
      enqueueSnackbar(
        `이미지 파일은 최대 ${DIARY_IMAGE_MAX_COUNT}개까지 삽입 가능합니다.`,
      );
      event.target.value = '';
      return;
    }

    const hasInvalidType = newImageFiles.some(
      (file) =>
        !DIARY_IMAGE_ALLOWED_MIME_TYPES.includes(
          file.type as typeof DIARY_IMAGE_ALLOWED_MIME_TYPES[number],
        ),
    );

    if (hasInvalidType) {
      enqueueSnackbar('이미지 파일만 업로드 가능합니다.');
      event.target.value = '';
      return;
    }

    const hasOversizedFile = newImageFiles.some(
      (file) => file.size > DIARY_IMAGE_MAX_SIZE_BYTES,
    );

    if (hasOversizedFile) {
      enqueueSnackbar(
        `선택된 이미지 중 ${DIARY_IMAGE_MAX_SIZE_MB}MB를 초과하는 이미지가 존재합니다.`,
      );
      event.target.value = '';
      return;
    }

    setDiaryImages((currentImages) => [
      ...currentImages,
      ...newImageFiles,
    ]);
    event.target.value = '';
  };

  const getImageUrl = (image: DiaryImageDraft) => {
    if (!(image instanceof File)) return image.src;

    let blobUrl = blobUrlCacheRef.current.get(image);

    if (!blobUrl) {
      blobUrl = URL.createObjectURL(image);
      blobUrlCacheRef.current.set(image, blobUrl);
    }

    return blobUrl;
  };

  const handleRemoveImage = (index: number) => {
    const image = diaryImages[index];

    if (image instanceof File) {
      const blobUrl = blobUrlCacheRef.current.get(image);

      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
        blobUrlCacheRef.current.delete(image);
      }
    }

    setDiaryImages((currentImages) =>
      currentImages.filter((_, imageIndex) => imageIndex !== index),
    );
  };

  return {
    handleImageChange,
    getImageUrl,
    handleRemoveImage,
  };
};
