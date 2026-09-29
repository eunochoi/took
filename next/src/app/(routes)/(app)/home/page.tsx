import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { statsQueries } from "@/common/queries/statsQueries";
import { diaryQueries } from "@/common/queries/diaryQueries";
import { habitQueries } from "@/common/queries/habitQueries";
import { unwrapQueryAction } from "@/common/queries/queryAction";
import { getTodayStringInUserTimezone } from "@/common/utils/date/userTimezone";
import HomeClientPage from "./HomeClientPage";

interface Props {
  searchParams?: {
    year?: string;
  };
}

const HomeServerPage = async ({ searchParams }: Props) => {
  const queryClient = new QueryClient();
  const initialDate = await getTodayStringInUserTimezone();
  const currentYear = Number(initialDate.slice(0, 4));
  const parsedYear = Number(searchParams?.year);
  const selectedYear = Number.isInteger(parsedYear) && parsedYear >= 1900 && parsedYear <= 2100 ? parsedYear : currentYear;

  await Promise.all([
    queryClient.prefetchQuery(statsQueries.years(unwrapQueryAction)),
    queryClient.prefetchQuery(statsQueries.diary(selectedYear, unwrapQueryAction)),
    queryClient.prefetchQuery(statsQueries.habit(selectedYear, unwrapQueryAction)),
    queryClient.prefetchQuery(diaryQueries.byDate(initialDate, unwrapQueryAction)),
    queryClient.prefetchQuery(habitQueries.todayStat(unwrapQueryAction)),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <HomeClientPage initialDate={initialDate} />
    </HydrationBoundary>
  );
};

export default HomeServerPage;
