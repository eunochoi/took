import { getHabitById } from '@/common/actions/habit';
import HabitFormClientPage from '@/common/components/views/HabitFormView/HabitFormClientPage';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

const HabitEditEntry = async ({ habitId }: { habitId: string }) => {
  const queryClient = new QueryClient();

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
      <HabitFormClientPage isEdit habitId={habitId} />
    </HydrationBoundary>
  );
};

export default HabitEditEntry;
