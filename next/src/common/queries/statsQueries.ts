import { getAvailableYears, getDiaryStats, getHabitStats } from '@/common/actions/stats';
import type { QueryActionRunner } from '@/common/queries/queryAction';
import { queryOptions } from '@tanstack/react-query';

export const statsQueries = {
  years: (runAction: QueryActionRunner) => queryOptions({
    queryKey: ['stats', 'years'],
    queryFn: () => runAction(getAvailableYears),
    staleTime: 5 * 60_000,
  }),
  diary: (year: number, runAction: QueryActionRunner) => queryOptions({
    queryKey: ['stats', 'diary', year],
    queryFn: () => runAction(() => getDiaryStats({ year })),
    staleTime: 60_000,
  }),
  habit: (year: number, runAction: QueryActionRunner) => queryOptions({
    queryKey: ['stats', 'habit', year],
    queryFn: () => runAction(() => getHabitStats({ year })),
    staleTime: 60_000,
  }),
};
