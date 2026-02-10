import Api from "@/api/Api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";

interface HabitProps {
  habitId?: string | null;
  habitName: string;
  priority: number;
}

interface Err {
  response: {
    data: string;
  }
}

const useSubmitHabit = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleSuccess = (message: string) => {
    queryClient.invalidateQueries({ queryKey: ['habits'] });
    queryClient.invalidateQueries({ queryKey: ['habit'] });
    router.back();
    setTimeout(() => enqueueSnackbar(message, { variant: 'success' }), 300);
  };

  const handleError = (e: Err, message: string) => {
    enqueueSnackbar(message, { variant: 'error' });
  };

  const addHabit = useMutation({
    mutationFn: ({ habitName, priority }: HabitProps) => Api.post('/habit', { habitName, priority }),
    onSuccess: () => {
      handleSuccess('습관 항목 생성 완료');
    },
    onError: (e: Err) => {
      handleError(e, '습관 항목 생성 실패');
    },
  });
  const editHabit = useMutation({
    mutationFn: ({ habitId, habitName, priority }: HabitProps) => Api.patch('/habit', { habitId, habitName, priority }),
    onSuccess: () => {
      handleSuccess('습관 항목 수정 완료');
    },
    onError: (e: Err) => {
      handleError(e, '습관 항목 수정 실패');
    },
  });

  return { addHabit, editHabit };
}

export default useSubmitHabit;