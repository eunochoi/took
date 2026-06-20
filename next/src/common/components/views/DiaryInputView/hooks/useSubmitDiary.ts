import { authAction } from "@/common/auth/authAction";
import { createDiary, updateDiary, type DiaryData } from "@/common/actions/diary";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";

interface DiaryProps {
  date?: string;
  text: string;
  images: string[];
  emotion: number;
  diaryId?: string | null;
}
interface Err {
  response: {
    data: string;
  };
}


const useSubmitDiary = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const addDiary = useMutation({
    mutationFn: ({ date, text, images, emotion }: DiaryProps) => {
      return authAction(() => createDiary({ date, text, images, emotion }));
    },
    onSuccess: async (diaryData) => {
      await handleSuccess('일기 작성 완료', diaryData);
    },
    onError: (e: Err) => {
      handleError(e, '일기 작성 실패');
    },
  });
  const editDiary = useMutation({
    mutationFn: ({ text, images, diaryId, emotion }: DiaryProps) => {
      return authAction(() => updateDiary({ text, images, diaryId, emotion }));
    },
    onSuccess: async (diaryData) => {
      await handleSuccess('일기 수정 완료', diaryData);
    },
    onError: (e: Err) => {
      handleError(e, '일기 수정 실패');
    },
  });

  const handleError = (e: Err, message: string) => {
    enqueueSnackbar(message, { variant: 'error' });
    console.log(e?.response);
    console.log(message);
  };
  const handleSuccess = async (message: string, diaryData: DiaryData) => {
    queryClient.setQueryData(['diary', 'date', diaryData.date], diaryData);
    queryClient.setQueryData(['diary', 'id', String(diaryData.id)], diaryData);

    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['diary', 'month'] }),
      queryClient.invalidateQueries({ queryKey: ['diary', 'list'] }),
      queryClient.invalidateQueries({ queryKey: ['stats'] }),
    ]);

    router.back();
    console.log(message);
    setTimeout(() => {
      enqueueSnackbar(message, { variant: 'success' });
    }, 300);
  };

  return { addDiary, editDiary };
};

export default useSubmitDiary;
