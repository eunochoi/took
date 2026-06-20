import ZoomView from "@/common/components/views/ZoomView";
import { getDiaryById } from "@/common/actions/diary";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

interface Props {
  searchParams: {
    id: string
  };
}

const ZoomPage = async ({ searchParams }: Props) => {

  const queryClient = new QueryClient();

  const params = searchParams;
  let diaryId = params.id;

  await queryClient.prefetchQuery({
    queryKey: ['diary', 'id', diaryId],
    queryFn: async () => {
      const result = await getDiaryById({ id: diaryId });
      if (!result.ok) throw new Error(result.message);
      return result.data;
    },
  });

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <ZoomView diaryId={diaryId} />
    </HydrationBoundary>
  );
}

export default ZoomPage;
