import Image from "next/image";
import { enqueueSnackbar } from "notistack";

import { RefObject, useEffect, useRef } from "react";
import { MdOutlineImage, MdRemove } from 'react-icons/md';

import {
  DIARY_IMAGE_ALLOWED_MIME_TYPES,
  DIARY_IMAGE_MAX_COUNT,
  DIARY_IMAGE_MAX_SIZE_BYTES,
  DIARY_IMAGE_MAX_SIZE_MB,
} from "@/common/constants/image";



interface Props {
  imageUploadRef: RefObject<HTMLInputElement>;
  images: Array<string | File>;
  setImages: (images: Array<string | File>) => void;
  isLoading: boolean;
}

const DiaryInputImages = ({ imageUploadRef, images, setImages, isLoading }: Props) => {
  const blobUrlCacheRef = useRef<Map<string, string>>(new Map());

  // File 키 (이름+크기+수정시각)
  const getFileKey = (file: File) => `${file.name}-${file.size}-${file.lastModified}`;

  // 언마운트 시 Blob URL 정리
  useEffect(() => {
    const cache = blobUrlCacheRef.current;
    return () => {
      cache.forEach((url) => {
        URL.revokeObjectURL(url);
      });
      cache.clear();
    };
  }, []);

  const onChangeImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const ArrayImages = Array.from(e.target.files);

      if (images.length + ArrayImages.length > DIARY_IMAGE_MAX_COUNT) {
        enqueueSnackbar(`이미지 파일은 최대 ${DIARY_IMAGE_MAX_COUNT}개까지 삽입 가능합니다.`, { variant: 'error' });
        e.target.value = '';
        return;
      }

      const invalidTypeFile = ArrayImages.find((file) => !DIARY_IMAGE_ALLOWED_MIME_TYPES.includes(file.type as typeof DIARY_IMAGE_ALLOWED_MIME_TYPES[number]));
      if (invalidTypeFile) {
        enqueueSnackbar("이미지 파일만 업로드 가능합니다.", { variant: 'error' });
        e.target.value = '';
        return;
      }

      const isOverSize = ArrayImages.find((file) => file.size > DIARY_IMAGE_MAX_SIZE_BYTES);
      if (isOverSize) {
        enqueueSnackbar(`선택된 이미지 중 ${DIARY_IMAGE_MAX_SIZE_MB}MB를 초과하는 이미지가 존재합니다.`, { variant: 'error' });
        e.target.value = '';
        return;
      }

      // 상태에만 넣고 업로드는 제출 시
      setImages([...images, ...ArrayImages]);
      e.target.value = '';  // 같은 파일 재선택 가능
    }
  };

  // string이면 그대로, File이면 Blob URL
  const getImageUrl = (img: string | File): string => {
    if (typeof img === 'string') {
      return img;
    }
    if (img instanceof File) {
      // 캐시 있으면 쓰고 없으면 생성
      const key = getFileKey(img);
      let blobUrl = blobUrlCacheRef.current.get(key);

      if (!blobUrl) {
        blobUrl = URL.createObjectURL(img);
        blobUrlCacheRef.current.set(key, blobUrl);
      }

      return blobUrl;
    }

    return '';
  };

  const handleRemoveImage = (index: number) => {
    const img = images[index];
    if (img instanceof File) {
      // Blob URL 해제
      const key = getFileKey(img);
      const blobUrl = blobUrlCacheRef.current.get(key);
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
        blobUrlCacheRef.current.delete(key);
      }
    }

    const deletedImageArray = [...images];
    deletedImageArray.splice(index, 1);
    setImages(deletedImageArray);
  };

  return (
    <div className="flex h-auto w-full shrink-0 items-stretch gap-4 overflow-x-auto rounded-2xl bg-white/90 py-4 shadow-card [&>*:first-child]:ml-4 [&>*:last-child]:mr-4 [&::-webkit-scrollbar-thumb]:rounded-sm [&::-webkit-scrollbar-thumb]:bg-black/10 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:h-1">
      <div className="relative flex h-20 w-20 shrink-0 flex-col items-center justify-center overflow-hidden rounded-xl bg-black/[0.02]">
        <button
          className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl bg-theme shadow-card transition-all duration-200 ease-in-out hover:-translate-y-px hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)] disabled:cursor-not-allowed disabled:opacity-40 [&>.icon]:text-[32px] [&>.icon]:text-white"
          disabled={isLoading}
          onClick={() => imageUploadRef.current?.click()}
          type="button"
        >
          <input ref={imageUploadRef} type="file" accept={DIARY_IMAGE_ALLOWED_MIME_TYPES.join(',')} name="image" multiple hidden onChange={onChangeImages} />
          <MdOutlineImage className="icon" />
        </button>
      </div>
      {images?.length > 0 &&
        <>
          {images.map((img, i: number) => {
            const imageUrl = getImageUrl(img);
            const key = typeof img === 'string' ? `image-${img}` : `image-${img.name}-${i}`;

            if (!imageUrl) return null;

            return (
              <div key={key} className="relative flex h-20 w-20 shrink-0 flex-col items-center justify-center overflow-hidden rounded-xl bg-black/[0.02]">
                <Image
                  className="h-full w-full object-cover"
                  src={imageUrl}
                  alt='diary image'
                  width={100}
                  height={100}
                  unoptimized
                />
                <button
                  className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-theme text-xl text-white transition-all duration-200 ease-in-out hover:scale-110 hover:opacity-90"
                  onClick={() => handleRemoveImage(i)}
                  type="button"
                >
                  <MdRemove />
                </button>
              </div>
            );
          })}
        </>
      }
    </div>
  );
}

export default DiaryInputImages;
