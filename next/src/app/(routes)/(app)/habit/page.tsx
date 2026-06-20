import { getHabitList } from "@/common/actions/habit";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import HabitView from "./HabitView.client";

export const dynamic = 'force-dynamic';

//page for data prefetch
const HabitPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['habits', 'list', 'ASC'],
    queryFn: async () => {
      const result = await getHabitList({ sort: 'ASC' });
      if (!result.ok) throw new Error(result.message);
      return result.data;
    },
  })
  await queryClient.prefetchQuery({
    queryKey: ['habits', 'list', 'DESC'],
    queryFn: async () => {
      const result = await getHabitList({ sort: 'DESC' });
      if (!result.ok) throw new Error(result.message);
      return result.data;
    },
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <HabitView />
    </HydrationBoundary>
  );
}

export default HabitPage;
