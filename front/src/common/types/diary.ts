
export interface DiaryImage {
  id: string;
  src: string;
}

export interface DiaryHabit {
  UserId: number;
  id: number;
  email: string;
  name: string;
  priority: number;
}

export interface DiaryData {
  email: string;
  id: number;
  date: string;           // yyyy-MM-dd
  text: string;
  emotion: number;        // 0~9 감정
  Images: DiaryImage[];
  Habits: DiaryHabit[];
  visible: boolean;
}

export type DiaryHeaderData = Pick<DiaryData, 'date' | 'visible' | 'emotion' | 'text' | 'id'>;
export type DiaryMenuData = Pick<DiaryData, 'date' | 'visible' | 'emotion' | 'text' | 'id'>;

export const createEmptyDiary = (date: string): DiaryData => ({
  email: '',
  id: 0,
  date: date,  // yyyy-MM-dd
  text: '',
  emotion: 2,
  Images: [],
  Habits: [],
  visible: false,
});
