import { getDiaryList } from "@/common/actions/diary";
import { DIARY_LIST_PAGE_SIZE } from "@/common/constants/diary";
import { EMOTION_UNSELECTED, MONTH_UNSELECTED } from "@/common/constants/filterDefaults";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import DiaryClientPage from "./DiaryClientPage";

interface Props {
  searchParams?: {
    year?: string;
    month?: string;
    emotion?: string;
  };
}

const DiaryListPage = async ({ searchParams }: Props) => {
  const queryClient = new QueryClient();
  const selectedYear = searchParams?.year && /^\d{4}$/.test(searchParams.year)
    ? Number(searchParams.year) : null;
  const selectedMonth = selectedYear !== null && searchParams?.month && /^(?:[1-9]|1[0-2])$/.test(searchParams.month)
    ? Number(searchParams.month) : MONTH_UNSELECTED;
  const emotionToggle = searchParams?.emotion && searchParams.emotion !== ''
    ? Number(searchParams.emotion) : EMOTION_UNSELECTED;

  await Promise.all((['ASC', 'DESC'] as const).map((sortType) =>
    queryClient.prefetchInfiniteQuery({
      queryKey: ['diary', 'diaryList', 'emotion', emotionToggle, 'sort', sortType, 'year', selectedYear, 'month', selectedMonth],
      queryFn: async ({ pageParam }) => {
        const result = await getDiaryList({
          sortType,
          search: emotionToggle,
          pageParam,
          limit: DIARY_LIST_PAGE_SIZE,
          selectedYear,
          selectedMonth,
        });
        if (!result.ok) throw new Error(result.message);
        return result.data;
      },
      initialPageParam: 0,
    }),
  ));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DiaryClientPage />
    </HydrationBoundary>
  );
};

export default DiaryListPage;
