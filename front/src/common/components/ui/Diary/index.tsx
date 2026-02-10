import LargeDiary from "./LargeDiary";
import SmallDiary from "./SmallDiary";


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

interface Props {
  type: 'small' | 'large';
  diaryData: {
    email: string;
    id: number;
    date: string;  // yyyy-MM-dd
    text: string;
    emotion: number;
    Images: Array<ImageProps>;
    Habits: Array<Habit>;
    visible: boolean;
  };
}

const Diary = ({ diaryData, type }: Props) => {
  if (type === 'small') {
    return (<SmallDiary diaryData={diaryData} />);
  }
  else if (type == 'large') {
    return (<LargeDiary diaryData={diaryData} />);
  }
}

export default Diary;