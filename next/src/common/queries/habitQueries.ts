import { getHabitById, getHabitList, getHabitMonthData, getHabitRecentStatus, getHabitYearlyStatus, getHabitsByDate, getTodayHabitStat } from '@/common/actions/habit';
import type { HabitListParams } from '@/common/actions/habit/types';
import type { QueryActionRunner } from '@/common/queries/queryAction';
import { queryOptions } from '@tanstack/react-query';

export const habitQueries = {
  list: ({ sortType, priorityFirst = false, customHabitOrder = [] }: HabitListParams, runAction: QueryActionRunner) => {
    const params = { sortType, priorityFirst, customHabitOrder: sortType === 'CUSTOM' ? customHabitOrder : [] };
    return queryOptions({
      queryKey: ['habits', 'list', params.sortType, params.priorityFirst, params.customHabitOrder],
      queryFn: () => runAction(() => getHabitList(params)),
      staleTime: 60_000,
    });
  },
  byId: (id: string | null | undefined, runAction: QueryActionRunner) => queryOptions({
    queryKey: ['habit', 'id', id],
    queryFn: () => runAction(() => getHabitById({ id })),
    staleTime: 60_000,
  }),
  byDate: (date: string, runAction: QueryActionRunner) => queryOptions({
    queryKey: ['habit', 'date', date],
    queryFn: () => runAction(() => getHabitsByDate({ date })),
    staleTime: 60_000,
  }),
  todayStat: (runAction: QueryActionRunner) => queryOptions({
    queryKey: ['habit', 'today-stat'],
    queryFn: () => runAction(getTodayHabitStat),
    staleTime: 60_000,
  }),
  recentStatus: (id: number, date: string, runAction: QueryActionRunner) => queryOptions({
    queryKey: ['habit', id, 'recent', date],
    queryFn: () => runAction(() => getHabitRecentStatus({ id, date })),
    staleTime: 0,
  }),
  month: (id: string, month: string, runAction: QueryActionRunner) => queryOptions({
    queryKey: ['habit', 'id', id, 'month', month],
    queryFn: () => runAction(() => getHabitMonthData({ id, month })),
    staleTime: 60_000,
  }),
  year: (id: string, year: string, runAction: QueryActionRunner) => queryOptions({
    queryKey: ['habit', 'id', id, 'year', year],
    queryFn: () => runAction(() => getHabitYearlyStatus({ id, year })),
    staleTime: 0,
  }),
};
