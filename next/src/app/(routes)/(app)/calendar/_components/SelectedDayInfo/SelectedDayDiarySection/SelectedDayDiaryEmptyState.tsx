import { MdAdd } from 'react-icons/md';

interface Props {
  isFuture: boolean;
  onAddDiary: () => void;
}

const SelectedDayDiaryEmptyState = ({ isFuture, onAddDiary }: Props) => (
  <div className="flex w-full flex-col items-center px-2 py-4 text-center">
    {isFuture ? (
      <p className="text-xm leading-relaxed text-theme-text-tertiary desktop:text-sm">
        아직 기록할 수 없는 날짜예요.<br />오늘이 되면 일기를 작성할 수 있어요.
      </p>
    ) : (
      <>
        <p className="mt-1 text-sm text-theme-text-tertiary desktop:text-sm">아직 작성한 일기가 없어요.</p>
        <p className="mt-1 text-sm text-theme-text-tertiary desktop:text-sm">하루의 이야기를 남겨보세요.</p>
        <button className="mt-4 flex min-h-9 items-center gap-1.5 rounded-full bg-theme-accent px-4 text-xs font-semibold text-theme-text-on-accent desktop:text-sm" onClick={onAddDiary} type="button">
          <MdAdd className="text-lg" /> 일기 쓰기
        </button>
      </>
    )}
  </div>
);

export default SelectedDayDiaryEmptyState;
