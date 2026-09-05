import type { DiaryData } from '@/common/types/diary';
import { DIARY_TEXT_MAX_LENGTH } from '@/common/constants/diary';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { uploadDiaryImagesAndCollectIds } from '../functions/uploadDiaryImagesAndCollectIds';
import type { DiaryImageDraft } from '../types';

type UseDiarySubmissionParams = {
  text: string;
  emotion: number;
  diaryImages: DiaryImageDraft[];
  saveDiary: (imageContentIds: string[]) => Promise<DiaryData>;
  successMessage: string;
  failureMessage: string;
};

export const useDiarySubmission = ({
  text,
  emotion,
  diaryImages,
  saveDiary,
  successMessage,
  failureMessage,
}: UseDiarySubmissionParams) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (isSubmitting) return;

    if (emotion < 0 || emotion > 9) {
      enqueueSnackbar('감정을 선택해주세요');
      return;
    }
    if (text.trim().length === 0) {
      enqueueSnackbar('내용을 입력해주세요');
      return;
    }
    if (text.length > DIARY_TEXT_MAX_LENGTH) {
      enqueueSnackbar(`일기 내용은 ${DIARY_TEXT_MAX_LENGTH.toLocaleString()}자까지 입력할 수 있습니다.`);
      return;
    }

    try {
      setIsSubmitting(true);
      const {
        imageContentIds,
        duplicateImageCount,
      } = await uploadDiaryImagesAndCollectIds(diaryImages);
      const savedDiary = await saveDiary(imageContentIds);

      queryClient.setQueryData(['diary', 'date', savedDiary.date], savedDiary);
      queryClient.setQueryData(['diary', 'id', String(savedDiary.id)], savedDiary);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['diary-habit', 'month'] }),
        queryClient.invalidateQueries({ queryKey: ['diary', 'diaryList'] }),
        queryClient.invalidateQueries({ queryKey: ['stats'] }),
      ]);
      router.back();
      const completedMessage = duplicateImageCount > 0
        ? `${successMessage}. 이미 추가된 사진은 한 장만 저장되었습니다.`
        : successMessage;
      setTimeout(() => enqueueSnackbar(completedMessage), 300);
    } catch (error) {
      console.error(failureMessage, error);
      enqueueSnackbar(failureMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleSubmit,
  };
};
