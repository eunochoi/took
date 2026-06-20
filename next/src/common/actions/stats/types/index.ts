export type YearParams = {
  year: number;
};

export type StreakUnits = {
  days: number;
  weeks: number;
  months: number;
};

export interface DiaryStats {
  totalCount: number;
  emotionCounts: number[];
  currentStreak: StreakUnits;
  longestStreak: StreakUnits;
  monthlyCount: number[];
  totalTextLength: number;
  monthlyEmotionCounts: number[][];
}

export interface HabitCount {
  id: number;
  name: string;
  priority: number;
  count: number;
}

export interface HabitStats {
  topHabits: HabitCount[];
  bottomHabits: HabitCount[];
  totalCompletions: number;
  diariesWithHabits: number;
  totalDiaries: number;
  habitCompletionDays: number;
  avgHabitsPerDiaryWithHabits: number;
  avgHabitsPerCompletionDay: number;
  totalHabits: number;
}
