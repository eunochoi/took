import { getDiaryById } from '@/common/actions/diary';
import DiaryDetailClientPage from '@/common/components/views/ZoomView/DiaryDetailClientPage';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

const DiaryDetailEntry = async ({ diaryId }: { diaryId: string }) => {
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
      <DiaryDetailClientPage diaryId={diaryId} />
    </HydrationBoundary>
  );
};

export default DiaryDetailEntry;
