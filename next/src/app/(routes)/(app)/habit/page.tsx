import { habitQueries } from "@/common/queries/habitQueries";
import { unwrapQueryAction } from "@/common/queries/queryAction";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import HabitClientPage from "./HabitClientPage";

const HabitServerPage = async () => {
  const queryClient = new QueryClient();

  await Promise.all((['ASC', 'DESC'] as const).map((sortType) =>
    queryClient.prefetchQuery(habitQueries.list({ sortType }, unwrapQueryAction)),
  ));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HabitClientPage />
    </HydrationBoundary>
  );
};

export default HabitServerPage;
