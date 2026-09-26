'use client';

import { getHabitById } from '@/common/actions/habit';
import { authAction } from '@/common/auth/authAction';
import {
  HABIT_NAME_MAX_LENGTH,
  MAX_HABIT_COUNT,
} from '@/common/constants/habit';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { PanelDialog } from '../../ui/PanelDialog';
import { PanelBody } from '../../ui/PanelDialog/PanelBody';
import { PanelFooter } from '../../ui/PanelDialog/PanelFooter';
import { PanelHeader } from '../../ui/PanelDialog/PanelHeader';
import { PanelSubmitButton } from '../../ui/PanelDialog/PanelSubmitButton';
import { createHabitRequest } from './functions/createHabitRequest';
import { updateHabitRequest } from './functions/updateHabitRequest';
import HabitFormIconSection from './HabitFormIconSection';
import HabitFormNameSection from './HabitFormNameSection';
import HabitFormPrioritySection from './HabitFormPrioritySection';
import { useHabitForm } from './hooks/useHabitForm';
import { useHabitSubmission } from './hooks/useHabitSubmission';
import { useHandleHabitFormLoadFailure } from './hooks/useHandleHabitFormLoadFailure';
import { useSyncHabitDataToForm } from './hooks/useSyncHabitDataToForm';

interface HabitFormViewProps {
  isEdit: boolean;
  habitId?: string | null;
}

const HabitFormView = ({ isEdit, habitId }: HabitFormViewProps) => {
  const router = useRouter();
  const [isDialogMounted, setIsDialogMounted] = useState(true);
  const {
    data: habitData,
    isError,
    isPending,
  } = useQuery({
    queryKey: ['habit', 'id', habitId],
    queryFn: () => authAction(() => getHabitById({ id: habitId })),
    enabled: isEdit && Boolean(habitId),
  });
  const {
    name,
    setName,
    priority,
    setPriority,
    iconKey,
    setIconKey,
  } = useHabitForm();
  const isFormInitialized = useSyncHabitDataToForm({
    enabled: isEdit,
    habitData,
    setName,
    setPriority,
    setIconKey,
  });
  const isHabitLoadFailure = useHandleHabitFormLoadFailure({
    isEdit,
    habitId,
    habitData,
    isError,
    isPending,
  });
  const saveHabit = isEdit
    ? (habitName: string) => {
      if (!habitId) {
        throw new Error('HABIT_ID_REQUIRED');
      }

      return updateHabitRequest({
        habitId,
        name: habitName,
        priority,
        iconKey,
      });
    }
    : (habitName: string) =>
      createHabitRequest({
        name: habitName,
        priority,
        iconKey,
      });
  const confirmText = isEdit ? '수정' : '추가';
  const { isSubmitting, handleSubmit } = useHabitSubmission({
    name,
    priority,
    saveHabit,
    successMessage: isEdit ? '습관 항목 수정 완료' : '습관 항목 생성 완료',
    failureMessage: isEdit ? '습관 항목 수정 실패' : '습관 항목 생성 실패',
    onSuccess: () => setIsDialogMounted(false),
  });

  const handleBack = () => {
    if (isSubmitting) {
      enqueueSnackbar('저장이 진행 중입니다. 완료될 때까지 기다려주세요.');
      return;
    }

    setIsDialogMounted(false);
  };

  const shouldHideEditForm = isEdit && (
    isHabitLoadFailure || isPending || !isFormInitialized
  );

  if (shouldHideEditForm) {
    return null;
  }

  return (
    <AnimatePresence onExitComplete={() => router.back()}>
      {isDialogMounted && (
        <PanelDialog
          ariaLabel={`목표 습관 ${confirmText}`}
          dismissible={!isSubmitting}
          onClose={handleBack}
        >
          <PanelHeader
            title={`목표 습관 ${confirmText}`}
            onBack={handleBack}
          />
          <PanelBody showScrollFade>
            <fieldset disabled={isSubmitting} className="m-0 flex min-w-0 w-full flex-col gap-7 border-0 pb-6 pt-2">
              <h1 className="text-center font-title text-2xl font-semibold tracking-tight text-theme-text-primary">매일의 약속</h1>
              <div className="flex w-full flex-col gap-6">
                <HabitFormNameSection name={name} setName={setName} />
                <HabitFormPrioritySection priority={priority} setPriority={setPriority} />
                <HabitFormIconSection iconKey={iconKey} setIconKey={setIconKey} />
              </div>
              <p className="text-center text-xs leading-relaxed text-theme-text-secondary">습관은 최대 {MAX_HABIT_COUNT}개까지 만들 수 있어요.</p>
            </fieldset>
          </PanelBody>
          <PanelFooter>
            <PanelSubmitButton
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || name.length > HABIT_NAME_MAX_LENGTH}
              aria-busy={isSubmitting}
            >
              {isSubmitting && <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none" />}
              {isSubmitting ? '저장 중...' : isEdit ? '수정한 습관 저장하기' : '습관 저장하기'}
            </PanelSubmitButton>
          </PanelFooter>
        </PanelDialog>
      )}
    </AnimatePresence>
  );
};

export default HabitFormView;
