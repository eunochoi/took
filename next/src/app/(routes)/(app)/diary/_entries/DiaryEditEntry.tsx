import { diaryQueries } from '@/common/queries/diaryQueries';
import { unwrapQueryAction } from '@/common/queries/queryAction';
import DiaryFormClientPage from '@/common/components/features/DiaryForm/DiaryFormClientPage';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

const DiaryEditEntry = async ({ diaryId }: { diaryId: string }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(diaryQueries.byId(diaryId, unwrapQueryAction));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DiaryFormClientPage isEdit diaryId={diaryId} />
    </HydrationBoundary>
  );
};

export default DiaryEditEntry;
