import { habitQueries } from '@/common/queries/habitQueries';
import { unwrapQueryAction } from '@/common/queries/queryAction';
import HabitDetailClientPage from '@/common/components/features/HabitDetail/HabitDetailClientPage';
import { getTodayStringInUserTimezone } from '@/common/utils/date/userTimezone';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

const HabitDetailEntry = async ({ habitId }: { habitId: string }) => {
  const queryClient = new QueryClient();
  const today = await getTodayStringInUserTimezone();

  await queryClient.prefetchQuery(habitQueries.byId(habitId, unwrapQueryAction));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HabitDetailClientPage habitId={habitId} today={today} />
    </HydrationBoundary>
  );
};

export default HabitDetailEntry;
