"use client";

import { getDiaryById } from '@/common/actions/diary';
import { authAction } from '@/common/auth/authAction';
import { DIARY_TEXT_MAX_LENGTH } from '@/common/constants/diary';
import type { DiaryData } from '@/common/types/diary';
import { isValidLocalDateString } from '@/common/utils/date/isValidLocalDateString';
import { parseLocalDate } from '@/common/utils/date/parseLocalDate';
import { arrayMove } from '@dnd-kit/sortable';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { Modal } from '../../ui/Modal';
import { ModalBody } from '../../ui/Modal/ModalBody';
import { ModalHeader } from '../../ui/Modal/ModalHeader';
import DiaryFormEmotionSection from './DiaryFormEmotionSection';
import DiaryFormImagesSection from './DiaryFormImagesSection';
import DiaryFormTextSection from './DiaryFormTextSection';
import { createDiaryRequest } from './functions/createDiaryRequest';
import { updateDiaryRequest } from './functions/updateDiaryRequest';
import { useDiaryForm } from './hooks/useDiaryForm';
import { useDiaryImages } from './hooks/useDiaryImages';
import { useDiarySubmission } from './hooks/useDiarySubmission';
import { useHandleDiaryFormLoadFailure } from './hooks/useHandleDiaryFormLoadFailure';
import { useSyncDiaryDataToForm } from './hooks/useSyncDiaryDataToForm';

interface DiaryFormViewProps {
  isEdit: boolean;
  diaryId?: string | null;
}

const DiaryFormView = ({ isEdit, diaryId }: DiaryFormViewProps) => {
  const router = useRouter();
  const [isModalMounted, setIsModalMounted] = useState(true);
  const searchParams = useSearchParams();
  const {
    data: diaryData,
    isError,
    isPending,
  } = useQuery<DiaryData | null>({
    queryKey: ['diary', 'id', diaryId],
    queryFn: () => authAction(() => getDiaryById({ id: diaryId })),
    enabled: isEdit && Boolean(diaryId),
  });
  const {
    text,
    setText,
    emotion,
    setEmotion,
    diaryImages,
    setDiaryImages,
  } = useDiaryForm();
  const isFormInitialized = useSyncDiaryDataToForm({
    enabled: isEdit,
    diaryData,
    setText,
    setEmotion,
    setDiaryImages,
  });
  const isDiaryLoadFailure = useHandleDiaryFormLoadFailure({
    isEdit,
    diaryId,
    diaryData,
    isError,
    isPending,
  });
  const imageHandlers = useDiaryImages({ diaryImages, setDiaryImages });
  const dateParam = searchParams.get('date');
  const date = diaryData?.date
    ?? (isValidLocalDateString(dateParam)
      ? dateParam
      : format(new Date(), 'yyyy-MM-dd'));
  const headerTitle = format(parseLocalDate(date), 'yyyy. M. d. EEEE', { locale: ko });
  const saveDiary = isEdit
    ? (imageContentIds: string[]) => {
      if (!diaryId) {
        throw new Error('DIARY_ID_REQUIRED');
      }

      return updateDiaryRequest({
        diaryId,
        text,
        emotion,
        imageContentIds,
      });
    }
    : (imageContentIds: string[]) =>
      createDiaryRequest({
        date,
        text,
        emotion,
        imageContentIds,
      });
  const { isSubmitting, handleSubmit } = useDiarySubmission({
    text,
    emotion,
    diaryImages,
    saveDiary,
    successMessage: isEdit ? '일기 수정 완료' : '일기 작성 완료',
    failureMessage: isEdit ? '일기 수정 실패' : '일기 작성 실패',
    onSuccess: () => setIsModalMounted(false),
  });

  const handleBack = () => {
    if (isSubmitting) {
      enqueueSnackbar('저장이 진행 중입니다. 완료될 때까지 기다려주세요.');
      return;
    }

    setIsModalMounted(false);
  };

  const shouldHideEditForm = isEdit && (
    isDiaryLoadFailure || isPending || !isFormInitialized
  );

  if (shouldHideEditForm) {
    return null;
  }

  return (
    <AnimatePresence onExitComplete={() => router.back()}>
      {isModalMounted && (
        <Modal
          ariaLabel={headerTitle}
          dismissible={!isSubmitting}
          onClose={handleBack}
          overlayClassName="z-[99999]"
          contentClassName="bg-theme-accent-light"
          variant={{ base: 'full', tablet: 'right', desktop: 'right' }}
        >
          <ModalHeader
            className="bg-theme-accent-light"
            title={headerTitle}
            onBack={handleBack}
          />
          <ModalBody withScrollFade className="flex w-full flex-col items-stretch bg-theme-accent-light">
            <fieldset disabled={isSubmitting} className="m-0 flex min-w-0 w-full flex-col gap-7 border-0 px-[4dvw] pb-6 pt-2 tablet:px-6">
              <h1 className="text-center font-title text-2xl font-semibold tracking-tight text-theme-text-primary">
                오늘의 기록
              </h1>
              <div className="w-full">
                <DiaryFormEmotionSection
                  emotion={emotion}
                  setEmotion={setEmotion}
                />
                <DiaryFormTextSection
                  text={text}
                  setText={setText}
                />
              </div>
              <DiaryFormImagesSection
                diaryImages={diaryImages}
                handleImageChange={imageHandlers.handleImageChange}
                getImageUrl={imageHandlers.getImageUrl}
                handleRemoveImage={imageHandlers.handleRemoveImage}
                onReorder={(from, to) => setDiaryImages((images) => arrayMove(images, from, to))}
                isLoading={isSubmitting}
              />
            </fieldset>
          </ModalBody>
          <div className="w-full shrink-0 bg-theme-accent-light px-[5dvw] pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 tablet:px-6">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || text.length > DIARY_TEXT_MAX_LENGTH}
              aria-busy={isSubmitting}
              className="flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-theme-accent px-5 font-title text-base font-semibold text-white shadow-theme-soft transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting && <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none" />}
              {isSubmitting ? '저장 중...' : isEdit ? '수정한 기록 저장하기' : '기록 저장하기'}
            </button>
          </div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default DiaryFormView;
