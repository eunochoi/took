import DiaryEditEntry from '@/app/(routes)/(app)/diary/_entries/DiaryEditEntry';

interface Props {
  params: { diaryId: string };
}

const DiaryEditServerPage = ({ params }: Props) => <DiaryEditEntry diaryId={params.diaryId} />;

export default DiaryEditServerPage;
