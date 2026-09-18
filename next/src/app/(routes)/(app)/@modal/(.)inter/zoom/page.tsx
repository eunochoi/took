import ZoomView from "@/common/components/views/ZoomView";
import { getDiaryById } from "@/common/actions/diary";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

interface Props {
  searchParams: {
    id: string;
  };
}

const ZoomModalPage = async ({ searchParams }: Props) => {
  const queryClient = new QueryClient();
  const diaryId = searchParams.id;

  await queryClient.prefetchQuery({
    queryKey: ['diary', 'id', diaryId],
    queryFn: async () => {
      const result = await getDiaryById({ id: diaryId });
      if (!result.ok) throw new Error(result.message);
      return result.data;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ZoomView diaryId={diaryId} />
    </HydrationBoundary>
  );
};

export default ZoomModalPage;
