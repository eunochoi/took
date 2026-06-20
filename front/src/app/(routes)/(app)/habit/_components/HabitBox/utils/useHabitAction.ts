import { authAction } from "@/common/actions/authAction";
import { checkHabit as checkHabitAction, deleteHabit as deleteHabitAction, uncheckHabit as uncheckHabitAction } from "@/common/actions/habit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

interface Err {
  message: string;
}
interface CheckHabitProps {
  habitId: number;
  date: string; // 'yyyy-MM-dd'
}


const useHabitAction = () => {
  const queryClient = useQueryClient();
  const checkHabit = useMutation({
    mutationFn: ({ habitId, date }: CheckHabitProps) => authAction(() => checkHabitAction({ habitId, date })),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
      queryClient.invalidateQueries({ queryKey: ['habit'] });
      console.log('chack habit success');
    },
    onError: (e: Err) => {
      enqueueSnackbar(e?.message, { variant: 'error' })
      console.log('uncheck habit error');
    },
  });
  const uncheckHabit = useMutation({
    mutationFn: ({ habitId, date }: CheckHabitProps) => authAction(() => uncheckHabitAction({ habitId, date })),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
      queryClient.invalidateQueries({ queryKey: ['habit'] });
      console.log('unchack habit success');
    },
    onError: (e: Err) => {
      enqueueSnackbar(e?.message, { variant: 'error' });
      console.log('uncheck habit error');
    },
  });
  const deleteHabit = useMutation({
    mutationFn: async ({ habitId }: { habitId: number }) => authAction(() => deleteHabitAction({ habitId })),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
      queryClient.invalidateQueries({ queryKey: ['habit'] });
      console.log('delete habit success');
      enqueueSnackbar('습관 항목 삭제 완료', { variant: 'success' });
    },
    onError: (e: Err) => {
      enqueueSnackbar(e?.message, { variant: 'error' });
      console.log('delete habit error');
    },
  });

  return {
    checkHabit,
    uncheckHabit,
    deleteHabit
  };
}

export default useHabitAction;
