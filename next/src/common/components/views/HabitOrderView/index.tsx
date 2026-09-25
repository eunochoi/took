'use client';

import { getHabitList } from '@/common/actions/habit';
import { authAction } from '@/common/auth/authAction';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

import { useCustomHabitOrder } from '@/app/(routes)/(app)/habit/_hooks/useCustomHabitOrder';
import { Modal } from '@/common/components/ui/Modal';
import { ModalBody } from '@/common/components/ui/Modal/ModalBody';
import { ModalHeader } from '@/common/components/ui/Modal/ModalHeader';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { Habit } from './_types';
import { HabitList } from './HabitList';



export const HabitOrderView = () => {
  const router = useRouter();
  const [isModalMounted, setIsModalMounted] = useState(true);
  const { customHabitOrder, setCustomHabitOrder, isStorageReady } = useCustomHabitOrder();

  const { data: customHabits, isPending, isError, refetch } = useQuery({
    queryKey: ['habits', 'list', 'CUSTOM', customHabitOrder],
    queryFn: () => authAction(() => getHabitList({ sortType: 'CUSTOM', customHabitOrder })),
    enabled: isStorageReady,
  });

  const [tempHabits, setTempHabits] = useState<Habit[] | null>(null);
  const [resetToDefault, setResetToDefault] = useState(false);

  useEffect(() => {
    if (customHabits) {
      setTempHabits((current) => current ?? customHabits);
    }
  }, [customHabits]);

  const defaultHabits = [...(customHabits ?? [])].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const currentIds = tempHabits?.map((habit) => habit.id) ?? [];
  const savedIds = customHabits?.map((habit) => habit.id) ?? [];
  const isDefaultOrder = currentIds.length === defaultHabits.length
    && currentIds.every((id, index) => id === defaultHabits[index].id);
  const hasChanges = tempHabits !== null && customHabits !== undefined && (
    currentIds.length !== savedIds.length
    || currentIds.some((id, index) => id !== savedIds[index])
    || (resetToDefault && isDefaultOrder && customHabitOrder.length > 0)
  );

  const onCancelChanges = () => {
    if (!customHabits) return;
    setTempHabits(customHabits);
    setResetToDefault(false);
  };

  const onResetToDefault = () => {
    setTempHabits(defaultHabits);
    setResetToDefault(true);
  };

  const onSubmit = () => {
    if (!tempHabits || !hasChanges) return;
    setCustomHabitOrder(isDefaultOrder ? [] : currentIds);
    setIsModalMounted(false);
    setTimeout(() => enqueueSnackbar('습관 순서를 저장했어요.'), 300);
  };

  return (
    <AnimatePresence onExitComplete={() => router.back()}>
      {isModalMounted && (
        <Modal
          ariaLabel="습관 순서 설정"
          onClose={() => setIsModalMounted(false)}
          overlayClassName="z-[99999]"
          contentClassName="bg-theme-accent-light"
          variant={{ base: 'full', tablet: 'right', desktop: 'right' }}
        >
          <ModalHeader className="bg-theme-accent-light" title='습관 순서 설정' onBack={() => setIsModalMounted(false)} />
          <ModalBody withScrollFade={true} className="bg-theme-accent-light">
            <div className="flex w-full flex-col gap-4 px-[4dvw] py-6 tablet:px-6">
              <p className="text-sm text-theme-text-secondary">드래그하거나 방향키로 습관 순서를 변경하세요.</p>
              <div className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-sm">
                <button className="text-theme-text-secondary disabled:opacity-40" disabled={!hasChanges} onClick={onCancelChanges} type="button">변경사항 취소</button>
                <button className="text-theme-text-secondary disabled:opacity-40" disabled={!tempHabits || (isDefaultOrder && customHabitOrder.length === 0)} onClick={onResetToDefault} type="button">기본 순서로 초기화</button>
              </div>
              {tempHabits && <HabitList tempHabits={tempHabits} onOrderChange={setTempHabits} />}
            </div>
          </ModalBody>
          <div className="w-full shrink-0 bg-theme-accent-light px-[5dvw] pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 tablet:px-6">
            <button
              className="flex min-h-14 w-full items-center justify-center rounded-full bg-theme-accent px-5 font-title text-base font-semibold text-white shadow-theme-soft transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!hasChanges || isPending || isError}
              onClick={onSubmit}
              type="button"
            >
              순서 저장하기
            </button>
          </div>
        </Modal>
      )}
    </AnimatePresence>
  );
};
