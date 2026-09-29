import DiaryDetailClientPage from '@/common/components/features/DiaryDetail/DiaryDetailClientPage';
import { diaryQueries } from '@/common/queries/diaryQueries';
import { unwrapQueryAction } from '@/common/queries/queryAction';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

const DiaryDetailEntry = async ({ diaryId }: { diaryId: string }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(diaryQueries.byId(diaryId, unwrapQueryAction));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DiaryDetailClientPage diaryId={diaryId} />
    </HydrationBoundary>
  );
};

export default DiaryDetailEntry;
