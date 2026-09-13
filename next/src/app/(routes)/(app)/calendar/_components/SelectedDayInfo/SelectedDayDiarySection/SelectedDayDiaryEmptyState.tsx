import { cn } from '@/common/utils/cn';
import { MdAdd } from 'react-icons/md';
import { selectedDayInfoStyles } from '../selectedDayInfoStyles';

interface Props {
  isFuture: boolean;
  onAddDiary: () => void;
}

const SelectedDayDiaryEmptyState = ({ isFuture, onAddDiary }: Props) => (
  <div className={cn(selectedDayInfoStyles.section.contentInset, 'flex flex-col items-center text-center')}>
    {isFuture ? (
      <p className={selectedDayInfoStyles.diary.futureState}>
        아직 기록할 수 없는 날짜예요.<br />오늘이 되면 일기를 작성할 수 있어요.
      </p>
    ) : (
      <>
        <p className={selectedDayInfoStyles.diary.emptyTitle}>아직 작성한 일기가 없어요.</p>
        <p className={selectedDayInfoStyles.diary.emptyDescription}>하루의 이야기를 남겨보세요.</p>
        <button className={selectedDayInfoStyles.diary.writeButton} onClick={onAddDiary} type="button">
          <MdAdd className="text-lg" /> 일기 쓰기
        </button>
      </>
    )}
  </div>
);

export default SelectedDayDiaryEmptyState;
