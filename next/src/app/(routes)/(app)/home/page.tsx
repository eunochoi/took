import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { getAvailableYears, getDiaryStats, getHabitStats } from "@/common/actions/stats";
import { getDiaryByDate } from "@/common/actions/diary";
import { getTodayHabitStat } from "@/common/actions/habit";
import { getTodayStringInUserTimezone } from "@/common/utils/date/userTimezone";
import HomeClientPage from "./HomeClientPage";

export const dynamic = 'force-dynamic';

interface Props {
  searchParams?: {
    year?: string;
  };
}

const HomePage = async ({ searchParams }: Props) => {
  const queryClient = new QueryClient();
  const initialDate = await getTodayStringInUserTimezone();
  const currentYear = Number(initialDate.slice(0, 4));
  const parsedYear = Number(searchParams?.year);
  const selectedYear = Number.isInteger(parsedYear) && parsedYear > 0 ? parsedYear : currentYear;

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['stats', 'years'],
      queryFn: async () => {
        const result = await getAvailableYears();
        if (!result.ok) throw new Error(result.message);
        return result.data;
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ['stats', 'diary', selectedYear],
      queryFn: async () => {
        const result = await getDiaryStats({ year: selectedYear });
        if (!result.ok) throw new Error(result.message);
        return result.data;
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ['stats', 'habit', selectedYear],
      queryFn: async () => {
        const result = await getHabitStats({ year: selectedYear });
        if (!result.ok) throw new Error(result.message);
        return result.data;
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ['diary', 'date', initialDate],
      staleTime: 60_000,
      queryFn: async () => {
        const result = await getDiaryByDate({ date: initialDate });
        if (!result.ok) throw new Error(result.message);
        return result.data;
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ['habit', 'today-stat'],
      staleTime: 60_000,
      queryFn: async () => {
        const result = await getTodayHabitStat();
        if (!result.ok) throw new Error(result.message);
        return result.data;
      },
    }),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <HomeClientPage initialDate={initialDate} />
    </HydrationBoundary>
  );
};

export default HomePage;
