import { getHabitList } from "@/common/actions/habit";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import HabitClientPage from "./HabitClientPage";

export const dynamic = 'force-dynamic';

const HabitPage = async () => {
  const queryClient = new QueryClient();

  await Promise.all((['ASC', 'DESC'] as const).map((sortType) =>
    queryClient.prefetchQuery({
      queryKey: ['habits', 'list', sortType, false, []],
      queryFn: async () => {
        const result = await getHabitList({ sortType });
        if (!result.ok) throw new Error(result.message);
        return result.data;
      },
    }),
  ));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HabitClientPage />
    </HydrationBoundary>
  );
};

export default HabitPage;
