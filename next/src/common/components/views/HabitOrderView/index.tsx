'use client';

import { getHabitList } from '@/common/actions/habit';
import { authAction } from '@/common/auth/authAction';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

import { useCustomHabitOrder } from '@/app/(routes)/(app)/habit/_hooks/useCustomHabitOrder';
import { Modal } from '@/common/components/ui/Modal';
import { ModalBody } from '@/common/components/ui/Modal/ModalBody';
import { ModalFooter } from '@/common/components/ui/Modal/ModalFooter';
import { ModalHeader } from '@/common/components/ui/Modal/ModalHeader';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { Habit } from './_types';
import { HabitList } from './HabitList';



export const HabitOrderView = () => {
  const router = useRouter();
  const [isModalMounted, setIsModalMounted] = useState(true);
  const { customHabitOrder, setCustomHabitOrder } = useCustomHabitOrder();

  //custom habits data load
  const { data: customHabits } = useQuery({
    queryKey: ['habits', 'list', 'CUSTOM'],
    queryFn: () => authAction(() => getHabitList({ sortType: 'CUSTOM', customHabitOrder })),
  });

  const [tempHabits, setTempHabits] = useState<Habit[]>([]);
  useEffect(() => {
    if (customHabits) {
      setTempHabits(customHabits);
    }
  }, [customHabits]);
  const onInitialize = () => {
    if (customHabits) {
      setTempHabits(customHabits);
    }
  };

  const onSubmit = () => {
    try {
      const tempHabitsIdArray = tempHabits.map(e => e.id);
      setCustomHabitOrder(tempHabitsIdArray);
      setIsModalMounted(false);
      setTimeout(() => {
        enqueueSnackbar('변경 완료');
      }, 300);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AnimatePresence onExitComplete={() => router.back()}>
      {isModalMounted && (
        <Modal
          ariaLabel="습관 순서 설정"
          onClose={() => setIsModalMounted(false)}
          overlayClassName="z-[99999]"
          variant={{ base: 'full', tablet: 'right', desktop: 'right' }}
        >
          <ModalHeader title='습관 순서 설정' onBack={() => setIsModalMounted(false)} onConfirm={onSubmit} />
          <ModalBody withScrollFade={true}>
            <HabitList tempHabits={tempHabits} setTempHabits={setTempHabits} />
          </ModalBody>
          <ModalFooter>
            <button className="text-base capitalize text-theme-accent" onClick={onInitialize} type="button">변경사항 취소</button>
          </ModalFooter>
        </Modal>
      )}
    </AnimatePresence>
  );
};
