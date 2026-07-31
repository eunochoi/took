import { getDiaryList } from "@/common/actions/diary";
import { MONTH_UNSELECTED } from "@/common/constants/filterDefaults";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getCurrentYearInUserTimezone } from "@/common/utils/date/userTimezone";
import DiaryListView from "./DiaryListView.client";

export const dynamic = 'force-dynamic';

//page for data prefetch
const DiaryListPage = async () => {
  const queryClient = new QueryClient();
  const selectedYear = await getCurrentYearInUserTimezone();
  const limit = 10;

  // Prefetch diary list data for all emotions and sort directions.
  for (let i = 0; i <= 5; i++) {
    await queryClient.prefetchInfiniteQuery({
      queryKey: ['diary', 'diaryList', 'emotion', i, 'sort', 'ASC', 'year', selectedYear, 'month', MONTH_UNSELECTED],
      queryFn: async ({ pageParam }) => {
        const result = await getDiaryList({
          sortType: 'ASC',
          search: i,
          pageParam,
          limit,
          selectedYear: selectedYear,
          selectedMonth: MONTH_UNSELECTED
        });
        if (!result.ok) throw new Error(result.message);
        return result.data;
      },
      initialPageParam: 0,
    })
    await queryClient.prefetchInfiniteQuery({
      queryKey: ['diary', 'diaryList', 'emotion', i, 'sort', 'DESC', 'year', selectedYear, 'month', MONTH_UNSELECTED],
      queryFn: async ({ pageParam }) => {
        const result = await getDiaryList({
          sortType: 'DESC',
          search: i,
          pageParam,
          limit,
          selectedYear: selectedYear,
          selectedMonth: MONTH_UNSELECTED
        });
        if (!result.ok) throw new Error(result.message);
        return result.data;
      },
      initialPageParam: 0,
    })
  };


  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <DiaryListView />
    </HydrationBoundary>
  );
}

export default DiaryListPage;
