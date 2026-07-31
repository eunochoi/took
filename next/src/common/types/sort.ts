export const DIARY_SORT_OPTIONS = ['ASC', 'DESC'] as const;
export const HABIT_SORT_OPTIONS = ['ASC', 'DESC', 'PRIORITY', 'CUSTOM'] as const;

export type DiarySort = typeof DIARY_SORT_OPTIONS[number];
export type HabitSort = typeof HABIT_SORT_OPTIONS[number];

export type SortableSortKey = 'list' | 'habit';

export type SortValueByKey = {
  list: DiarySort;
  habit: HabitSort;
};

export const SORT_OPTIONS_BY_KEY: {
  [K in SortableSortKey]: readonly SortValueByKey[K][];
} = {
  list: DIARY_SORT_OPTIONS,
  habit: HABIT_SORT_OPTIONS,
} as const;

export const DEFAULT_SORT_BY_KEY = {
  list: 'DESC',
  habit: 'DESC',
} as const;

// The storage key and property names are kept for compatibility with existing localStorage data.
export interface SortPreferences {
  list?: DiarySort;
  habit?: HabitSort;
  habitCustom?: number[];
}
