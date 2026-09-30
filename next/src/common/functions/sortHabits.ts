import type { HabitData, HabitListParams } from '@/common/actions/habit/types';

export const sortHabits = <T extends HabitData>(habits: T[], { sortType, priorityFirst = false, customHabitOrder = [] }: HabitListParams): T[] => {
  const orderMap = new Map(customHabitOrder.map((id, index) => [id, index]));
  return [...habits].sort((a, b) => {
    if (sortType === 'CUSTOM') {
      const aOrder = orderMap.get(a.id);
      const bOrder = orderMap.get(b.id);
      if (aOrder !== undefined && bOrder !== undefined) return aOrder - bOrder;
      if (aOrder !== undefined) return -1;
      if (bOrder !== undefined) return 1;
    } else if (priorityFirst && a.priority !== b.priority) {
      return b.priority - a.priority;
    }
    const dateDifference = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    return (sortType === 'ASC' ? dateDifference : -dateDifference) || a.id - b.id;
  });
};
