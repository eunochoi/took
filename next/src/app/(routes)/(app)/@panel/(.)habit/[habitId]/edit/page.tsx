import HabitEditEntry from '@/app/(routes)/(app)/habit/_entries/HabitEditEntry';

interface Props {
  params: { habitId: string };
}

const Page = ({ params }: Props) => <HabitEditEntry habitId={params.habitId} />;

export default Page;
