import HabitInfoView from "@/common/components/views/HabitInfoView";
import { getHabitById } from "@/common/actions/habit";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getTodayStringInUserTimezone } from '@/common/utils/date/userTimezone';

interface Props {
  searchParams: {
    id: string
  };
}

const HabitInfoPage = async ({ searchParams }: Props) => {
  const queryClient = new QueryClient();
  const today = await getTodayStringInUserTimezone();

  const params = searchParams;
  let habitId = params.id;

  await queryClient.prefetchQuery({
    queryKey: ['habit', 'id', habitId],
    queryFn: async () => {
      const result = await getHabitById({ id: habitId });
      if (!result.ok) throw new Error(result.message);
      return result.data;
    },
  });

  const dehydratedState = dehydrate(queryClient)
  return (
    <HydrationBoundary state={dehydratedState}>
      <HabitInfoView habitId={habitId} today={today} />
    </HydrationBoundary>
  );
}

export default HabitInfoPage;
