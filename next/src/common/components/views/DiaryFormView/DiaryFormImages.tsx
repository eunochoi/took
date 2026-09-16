import { DIARY_IMAGE_ALLOWED_MIME_TYPES } from "@/common/constants/image";
import Image from "next/image";
import type { ChangeEvent } from "react";
import { MdOutlineImage, MdRemove } from 'react-icons/md';

import type { DiaryImageDraft } from './types';

const imageTileClass = "relative flex h-20 w-20 shrink-0 flex-col items-center justify-center overflow-hidden rounded-theme bg-theme-overlay/[0.02]";


interface Props {
  diaryImages: DiaryImageDraft[];
  handleImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  getImageUrl: (image: DiaryImageDraft) => string;
  handleRemoveImage: (index: number) => void;
  isLoading: boolean;
}

const DiaryFormImages = ({
  diaryImages,
  handleImageChange,
  getImageUrl,
  handleRemoveImage,
  isLoading,
}: Props) => {
  return (
    <div className="flex h-auto w-full shrink-0 items-stretch gap-4 overflow-x-auto rounded-theme bg-theme-surface px-4 py-4 shadow-card [&::-webkit-scrollbar-thumb]:rounded-sm [&::-webkit-scrollbar-thumb]:bg-theme-overlay/10 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:h-1">
      <div className={imageTileClass}>
        <label
          className={`flex h-full w-full flex-col items-center justify-center gap-2 rounded-theme bg-theme-accent shadow-card transition-all duration-200 ease-in-out ${isLoading ? 'cursor-not-allowed opacity-40' : 'cursor-pointer desktop:hover:-translate-y-px desktop:hover:shadow-theme-soft'}`}
          htmlFor="diary-image-upload"
        >
          <input
            id="diary-image-upload"
            type="file"
            accept={DIARY_IMAGE_ALLOWED_MIME_TYPES.join(',')}
            name="image"
            multiple
            hidden
            disabled={isLoading}
            onChange={handleImageChange}
          />
          <MdOutlineImage className="text-3xl text-theme-text-on-accent" />
        </label>
      </div>
      {diaryImages.map((image, index) => {
        const imageUrl = getImageUrl(image);
        const key = image instanceof File
          ? `image-${image.name}-${index}`
          : `image-content-${image.imageContentId}`;

        if (!imageUrl) return null;

        return (
          <div key={key} className={imageTileClass}>
            <Image
              className="h-full w-full object-cover"
              src={imageUrl}
              alt="diary image"
              width={100}
              height={100}
              unoptimized
            />
            <button
              className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-theme-accent text-xl text-theme-text-on-accent transition-all duration-200 ease-in-out desktop:hover:scale-110 desktop:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={isLoading}
              onClick={() => handleRemoveImage(index)}
              type="button"
            >
              <MdRemove />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default DiaryFormImages;
