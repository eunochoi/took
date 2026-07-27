export type ListSortType = 'ASC' | 'DESC';
export type HabitSortType = 'ASC' | 'DESC' | 'PRIORITY' | 'CUSTOM';

//took:[email]:order
export interface Order {
  list?: ListSortType;
  habit?: HabitSortType;
  habitCustom?: number[];
}