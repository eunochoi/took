import DiaryDetailEntry from '@/app/(routes)/(app)/diary/_entries/DiaryDetailEntry';

interface Props {
  params: { diaryId: string };
}

const DiaryDetailServerPage = ({ params }: Props) => <DiaryDetailEntry diaryId={params.diaryId} />;

export default DiaryDetailServerPage;
