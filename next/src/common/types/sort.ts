export const DIARY_SORT_OPTIONS = ['ASC', 'DESC'] as const;
export const HABIT_SORT_OPTIONS = ['ASC', 'DESC', 'PRIORITY', 'CUSTOM'] as const;

export type DiarySort = typeof DIARY_SORT_OPTIONS[number];
export type HabitSort = typeof HABIT_SORT_OPTIONS[number];

export type SortableSortKey = 'diary' | 'habit';

export type SortValueByKey = {
  diary: DiarySort;
  habit: HabitSort;
};

export const SORT_OPTIONS_BY_KEY: {
  [K in SortableSortKey]: readonly SortValueByKey[K][];
} = {
  diary: DIARY_SORT_OPTIONS,
  habit: HABIT_SORT_OPTIONS,
} as const;

export const DEFAULT_SORT_BY_KEY = {
  diary: 'DESC',
  habit: 'DESC',
} as const;

export interface SortPreferences {
  diary?: DiarySort;
  habit?: HabitSort;
  habitCustom?: number[];
}
