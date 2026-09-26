import { HabitOrderClientPage } from '@/common/components/views/HabitOrderView/HabitOrderClientPage';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

const HabitOrderEntry = () => {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HabitOrderClientPage />
    </HydrationBoundary>
  );
};

export default HabitOrderEntry;
