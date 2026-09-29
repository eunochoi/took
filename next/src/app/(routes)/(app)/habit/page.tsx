import { habitQueries } from "@/common/queries/habitQueries";
import { unwrapQueryAction } from "@/common/queries/queryAction";
import { getTodayStringInUserTimezone } from "@/common/utils/date/userTimezone";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import HabitClientPage from "./HabitClientPage";

const HabitServerPage = async () => {
  const queryClient = new QueryClient();
  const todayString = await getTodayStringInUserTimezone();

  await Promise.all((['ASC', 'DESC'] as const).map((sortType) =>
    queryClient.prefetchQuery(habitQueries.page({ sortType }, todayString, unwrapQueryAction)),
  ));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HabitClientPage todayString={todayString} />
    </HydrationBoundary>
  );
};

export default HabitServerPage;
