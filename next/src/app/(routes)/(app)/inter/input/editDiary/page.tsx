import DiaryInputView from "@/common/components/views/DiaryInputView";
import { getDiaryById } from "@/common/actions/diary";

import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

interface Props {
  searchParams: {
    id: string
  };
}

const EditDiaryPage = async ({ searchParams }: Props) => {

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
      <DiaryInputView isEdit={true} diaryId={diaryId} />
    </HydrationBoundary>
  );
}

export default EditDiaryPage;
