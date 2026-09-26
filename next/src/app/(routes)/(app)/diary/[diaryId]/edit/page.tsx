import DiaryEditEntry from '@/app/(routes)/(app)/diary/_entries/DiaryEditEntry';

interface Props {
  params: { diaryId: string };
}

const Page = ({ params }: Props) => <DiaryEditEntry diaryId={params.diaryId} />;

export default Page;
