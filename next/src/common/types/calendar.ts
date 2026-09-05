// API와 날짜별 조회에는 로컬 날짜 문자열을 사용한다.
export type DateKey = string; // yyyy-MM-dd
export type MonthKey = string; // yyyy-MM

export interface DiaryHabitDayData {
  hasDiary: boolean;
  emotion: number | null;
  completedHabitCount: number;
}

export interface DiaryHabitMonthData {
  month: MonthKey;
  daysByDate: Partial<Record<DateKey, DiaryHabitDayData>>;
  summary: {
    diaryCount: number;
    completedHabitCount: number;
  };
}

export interface HabitMonthData {
  month: MonthKey;
  today: DateKey;
  createdDate: DateKey;
  editableFrom: DateKey;
  daysByDate: Partial<Record<DateKey, true>>;
  summary: {
    periodStart: DateKey | null;
    periodEnd: DateKey | null;
    targetDays: number;
    completedCount: number;
    completionRate: number | null;
    missedCount: number;
  };
}
