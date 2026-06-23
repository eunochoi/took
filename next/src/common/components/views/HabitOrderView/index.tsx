'use client';

import { getHabitList } from '@/common/actions/habit';
import { authAction } from '@/common/auth/authAction';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { useCustomHabitOrder } from '@/app/(routes)/(app)/habit/_hooks/useCustomHabitOrder';
import { ModalBody } from '@/common/components/ui/Modal/ModalBody';
import { ModalFooter } from '@/common/components/ui/Modal/ModalFooter';
import { ModalHeader } from '@/common/components/ui/Modal/ModalHeader';
import { ModalRoot } from '@/common/components/ui/Modal/ModalRoot';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { Habit } from './_types';
import { HabitList } from './HabitList';



export const HabitOrderView = () => {
  const router = useRouter();
  const { customOrder, setCustomOrder } = useCustomHabitOrder();

  //custom habits data load
  const { data: customHabits } = useQuery({
    queryKey: ['habits', 'list', 'CUSTOM'],
    queryFn: () => authAction(() => getHabitList({ sort: 'CUSTOM', customOrder })),
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
      setCustomOrder(tempHabitsIdArray);
      router.back();
      setTimeout(() => {
        enqueueSnackbar('변경 완료');
      }, 300);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ModalRoot>
      <ModalHeader title='습관 순서 설정' onConfirm={onSubmit} />
      <ModalBody withScrollFade={true}>
        <HabitList tempHabits={tempHabits} setTempHabits={setTempHabits} />
      </ModalBody>
      <ModalFooter>
        <button className="text-base capitalize text-theme" onClick={onInitialize} type="button">변경사항 취소</button>
      </ModalFooter>
    </ModalRoot>);
}
