import HabitEditEntry from '@/app/(routes)/(app)/habit/_entries/HabitEditEntry';

interface Props {
  params: { habitId: string };
}

const HabitEditServerPage = ({ params }: Props) => <HabitEditEntry habitId={params.habitId} />;

export default HabitEditServerPage;
