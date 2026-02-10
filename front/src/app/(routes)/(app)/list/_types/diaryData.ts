
interface ImageProps {
  id: string;
  src: string;
}
interface Habit {
  UserId: number;
  id: number;
  email: string;
  name: string;
  priority: number;
}
export interface diaryData {
  email: string;
  id: number;
  date: string;  // yyyy-MM-dd
  text: string;
  emotion: number;
  Images: Array<ImageProps>;
  Habits: Array<Habit>;
  visible: boolean;
};