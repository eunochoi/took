import { getDiaryList } from "@/common/actions/diary";
import { MONTH_UNSELECTED } from "@/common/constants/filterDefaults";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import ListView from "./ListView.client";

//page for data prefetch
const ListPage = async () => {
  const queryClient = new QueryClient();
  const selectedYear = new Date().getFullYear();
  const limit = 10;

  //prefetch list data - all emotion and all sort
  for (let i = 0; i <= 5; i++) {
    await queryClient.prefetchInfiniteQuery({
      queryKey: ['diary', 'list', 'emotion', i, 'sort', 'ASC', 'year', selectedYear, 'month', MONTH_UNSELECTED],
      queryFn: async ({ pageParam }) => {
        const result = await getDiaryList({
          sort: 'ASC',
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
      queryKey: ['diary', 'list', 'emotion', i, 'sort', 'DESC', 'year', selectedYear, 'month', MONTH_UNSELECTED],
      queryFn: async ({ pageParam }) => {
        const result = await getDiaryList({
          sort: 'DESC',
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
      <ListView />
    </HydrationBoundary>
  );
}

export default ListPage;
