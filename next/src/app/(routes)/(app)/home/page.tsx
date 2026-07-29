import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { getAvailableYears, getDiaryStats, getHabitStats } from "@/common/actions/stats";
import { getCurrentYearInUserTimezone } from "@/common/utils/date/userTimezone";
import HomeView from "./HomeView.client";

export const dynamic = 'force-dynamic';

interface Props {
  searchParams?: {
    year?: string;
  };
}

const HomePage = async ({ searchParams }: Props) => {
  const queryClient = new QueryClient();
  const currentYear = await getCurrentYearInUserTimezone();
  const parsedYear = Number(searchParams?.year);
  const selectedYear = Number.isInteger(parsedYear) && parsedYear > 0 ? parsedYear : currentYear;

  await queryClient.prefetchQuery({
    queryKey: ['stats', 'years'],
    queryFn: async () => {
      const result = await getAvailableYears();
      if (!result.ok) throw new Error(result.message);
      return result.data;
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ['stats', 'diary', selectedYear],
    queryFn: async () => {
      const result = await getDiaryStats({ year: selectedYear });
      if (!result.ok) throw new Error(result.message);
      return result.data;
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ['stats', 'habit', selectedYear],
    queryFn: async () => {
      const result = await getHabitStats({ year: selectedYear });
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
