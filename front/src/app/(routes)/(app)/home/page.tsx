import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { getAvailableYears, getDiaryStats, getHabitStats } from "@/common/actions/stats";
import { getCurrentYearInUserTimezone } from "@/common/utils/date/userTimezone";
import HomeView from "./HomeView.client";

export const dynamic = 'force-dynamic';

const HomePage = async () => {
  const queryClient = new QueryClient();
  const currentYear = await getCurrentYearInUserTimezone();

  await queryClient.prefetchQuery({
    queryKey: ['stats', 'years'],
    queryFn: async () => {
      const result = await getAvailableYears();
      if (!result.ok) throw new Error(result.message);
      return result.data;
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ['stats', 'diary', currentYear],
    queryFn: async () => {
      const result = await getDiaryStats({ year: currentYear });
      if (!result.ok) throw new Error(result.message);
      return result.data;
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ['stats', 'habit', currentYear],
    queryFn: async () => {
      const result = await getHabitStats({ year: currentYear });
      if (!result.ok) throw new Error(result.message);
      return result.data;
    },
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <HomeView />
    </HydrationBoundary>
  );
};

export default HomePage;
