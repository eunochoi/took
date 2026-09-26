import { getHabitById } from '@/common/actions/habit';
import HabitInfoClientPage from '@/common/components/views/HabitInfoView/HabitInfoClientPage';
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
      <HabitInfoClientPage habitId={habitId} today={today} />
    </HydrationBoundary>
  );
};

export default HabitDetailEntry;
