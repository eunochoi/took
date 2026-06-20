'use client';

import { authAction } from '@/common/auth/authAction';
import { getHabitList } from '@/common/actions/habit';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useCustomHabitOrder } from '@/app/(routes)/(app)/habit/_hooks/useCustomHabitOrder';
import { Modal } from '@/common/components/ui/Modal';
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
        enqueueSnackbar('변경 완료', { variant: 'success' });
      }, 300);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal>
      <Modal.Header headerTitleText='습관 순서 설정' onConfirm={onSubmit} />
      <Modal.Content>
        <HabitList tempHabits={tempHabits} setTempHabits={setTempHabits} />
      </Modal.Content>
      <Modal.Footer>
        <InitButton onClick={onInitialize}>변경사항 취소</InitButton>
      </Modal.Footer>
    </Modal>);
}

const InitButton = styled.button`
  text-transform: capitalize;
  color: ${(props) => props.theme.themeColor ? props.theme.themeColor : '#979FC7'};
  font-size: 16px;
`
