import { getDiaryById } from '@/common/actions/diary';
import DiaryFormClientPage from '@/common/components/views/DiaryFormView/DiaryFormClientPage';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

const DiaryEditEntry = async ({ diaryId }: { diaryId: string }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['diary', 'id', diaryId],
    queryFn: async () => {
      const result = await getDiaryById({ id: diaryId });
      if (!result.ok) throw new Error(result.message);
      return result.data;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DiaryFormClientPage isEdit diaryId={diaryId} />
    </HydrationBoundary>
  );
};

export default DiaryEditEntry;
