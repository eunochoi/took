import HabitDetailEntry from '@/app/(routes)/(app)/habit/_entries/HabitDetailEntry';

interface Props {
  params: { habitId: string };
}

const Page = ({ params }: Props) => <HabitDetailEntry habitId={params.habitId} />;

export default Page;
