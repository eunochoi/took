import { getHabitById } from '@/common/actions/habit';
import HabitDetailClientPage from '@/common/components/features/HabitDetail/HabitDetailClientPage';
import { getTodayStringInUserTimezone } from '@/common/utils/date/userTimezone';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

const HabitDetailEntry = async ({ habitId }: { habitId: string }) => {
  const queryClient = new QueryClient();
  const today = await getTodayStringInUserTimezone();

  await queryClient.prefetchQuery({
    queryKey: ['habit', 'id', habitId],
    queryFn: async () => {
      const result = await getHabitById({ id: habitId });
      if (!result.ok) throw new Error(result.message);
      return result.data;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HabitDetailClientPage habitId={habitId} today={today} />
    </HydrationBoundary>
  );
};

export default HabitDetailEntry;
