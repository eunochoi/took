import type { Metadata } from 'next';

import { EMOTION_UNSELECTED, MONTH_UNSELECTED } from "@/common/constants/filterDefaults";
import { diaryQueries } from "@/common/queries/diaryQueries";
import { unwrapQueryAction } from "@/common/queries/queryAction";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import DiaryClientPage from "./DiaryClientPage";

interface Props {
  searchParams?: {
    year?: string;
    month?: string;
    emotion?: string;
  };
}

export const metadata: Metadata = {
  title: '일기 목록',
  description: '작성한 감정 일기를 모아 보고 기간과 감정으로 찾아보세요.',
};

const DiaryServerPage = async ({ searchParams }: Props) => {
  const queryClient = new QueryClient();
  const selectedYear = searchParams?.year && /^\d{4}$/.test(searchParams.year)
    ? Number(searchParams.year) : null;
  const selectedMonth = selectedYear !== null && searchParams?.month && /^(?:[1-9]|1[0-2])$/.test(searchParams.month)
    ? Number(searchParams.month) : MONTH_UNSELECTED;
  const emotionToggle = searchParams?.emotion && searchParams.emotion !== ''
    ? Number(searchParams.emotion) : EMOTION_UNSELECTED;

  await Promise.all((['ASC', 'DESC'] as const).map((sortType) =>
    queryClient.prefetchInfiniteQuery(diaryQueries.list({ sortType, search: emotionToggle, selectedYear, selectedMonth }, unwrapQueryAction)),
  ));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DiaryClientPage />
    </HydrationBoundary>
  );
};

export default DiaryServerPage;
