import HabitDetailEntry from '@/app/(routes)/(app)/habit/_entries/HabitDetailEntry';

interface Props {
  params: { habitId: string };
}

const HabitDetailServerPage = ({ params }: Props) => <HabitDetailEntry habitId={params.habitId} />;

export default HabitDetailServerPage;
