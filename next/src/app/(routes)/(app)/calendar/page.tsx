import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getDiaryByDate } from '@/common/actions/diary';
import { getDiaryHabitMonthData } from '@/common/actions/diary/getDiaryHabitMonthData';
import { getHabitsByDate } from '@/common/actions/habit';
import { getTodayStringInUserTimezone } from '@/common/utils/date/userTimezone';
import CalendarView from './CalendarView.client';

export const dynamic = 'force-dynamic';

const CalendarPage = async () => {
  const initialDate = await getTodayStringInUserTimezone();
  const month = initialDate.slice(0, 7);
  // 요청별 캐시를 사용해 사용자 간 데이터가 공유되지 않도록 한다.
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 60_000 } },
  });

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['diary', 'date', initialDate],
      queryFn: async () => {
        const result = await getDiaryByDate({ date: initialDate });
        if (!result.ok) throw new Error(result.message);
        return result.data;
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ['habit', 'date', initialDate],
      queryFn: async () => {
        const result = await getHabitsByDate({ date: initialDate });
        if (!result.ok) throw new Error(result.message);
        return result.data;
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ['diary-habit', 'month', month],
      queryFn: async () => {
        const result = await getDiaryHabitMonthData({ month });
        if (!result.ok) throw new Error(result.message);
        return result.data;
      },
    }),
  ]);

  // 실패한 프리패치는 제외되고, 해당 데이터는 클라이언트에서 다시 조회한다.
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CalendarView initialDate={initialDate} />
    </HydrationBoundary>
  );
};

export default CalendarPage;
