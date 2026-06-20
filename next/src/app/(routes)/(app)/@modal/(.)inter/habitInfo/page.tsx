import HabitInfoView from "@/common/components/views/HabitInfoView";
import { getHabitById } from "@/common/actions/habit";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

interface Props {
  searchParams: {
    id: string
  };
}

const HabitInfoPage = async ({ searchParams }: Props) => {
  const queryClient = new QueryClient();

  const params = searchParams;
  let habitId = params.id;

  await queryClient.prefetchQuery({
    queryKey: ['habits', 'id', habitId],
    queryFn: async () => {
      const result = await getHabitById({ id: habitId });
      if (!result.ok) throw new Error(result.message);
      return result.data;
    },
  });

  const dehydratedState = dehydrate(queryClient)
  return (
    <HydrationBoundary state={dehydratedState}>
      <HabitInfoView habitId={habitId} />
    </HydrationBoundary>
  );
}

export default HabitInfoPage;
