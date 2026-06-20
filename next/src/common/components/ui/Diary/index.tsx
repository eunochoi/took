import type { DiaryData } from "@/common/types/diary";
import DiaryInCalendar from "./DiaryInCalendar";
import DiaryInList from "./DiaryInList";

interface Props {
  type: 'small' | 'large';
  diaryData: DiaryData;
}

const Diary = ({ diaryData, type }: Props) => {
  if (type === 'small') {
    return (<DiaryInCalendar diaryData={diaryData} />);
  }

  return (<DiaryInList diaryData={diaryData} />);
};

export default Diary;
