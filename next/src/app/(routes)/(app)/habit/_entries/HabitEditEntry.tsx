import { habitQueries } from '@/common/queries/habitQueries';
import { unwrapQueryAction } from '@/common/queries/queryAction';
import HabitFormClientPage from '@/common/components/features/HabitForm/HabitFormClientPage';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

const HabitEditEntry = async ({ habitId }: { habitId: string }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(habitQueries.byId(habitId, unwrapQueryAction));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HabitFormClientPage isEdit habitId={habitId} />
    </HydrationBoundary>
  );
};

export default HabitEditEntry;
