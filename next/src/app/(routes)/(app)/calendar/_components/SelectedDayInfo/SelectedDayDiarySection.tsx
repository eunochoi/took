import type { Emotion } from '@/common/constants/emotions';
import type { DiaryData } from '@/common/types/diary';
import Image from 'next/image';
import { MdAdd, MdChevronRight } from 'react-icons/md';

interface Props {
  diaryData?: DiaryData | null;
  emotion?: Emotion;
  isFuture: boolean;
  onAddDiary: () => void;
  onOpenDiary: () => void;
}

const SelectedDayDiarySection = ({ diaryData, emotion, isFuture, onAddDiary, onOpenDiary }: Props) => {
  const hasDiary = diaryData?.visible === true;

  return (
    <div className="rounded-theme border border-theme-text-disabled/20 p-3.5">
      <h3 className="text-base font-semibold text-theme-text-primary">감정 일기</h3>
      {hasDiary ? (
        <button className="mt-3 w-full text-left" onClick={onOpenDiary} type="button">
          {emotion && (
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-theme-accent">
              <Image className="h-7 w-7 object-contain" src={emotion.src} alt="" />
              <span>{emotion.nameKr}</span>
            </div>
          )}
          <p className="[display:-webkit-box] overflow-hidden whitespace-pre-wrap break-words text-base leading-relaxed text-theme-text-secondary [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
            {diaryData.text}
          </p>
          <span className="mt-3 flex items-center justify-end text-sm font-semibold text-theme-accent">
            일기 전체 보기 <MdChevronRight className="text-lg" />
          </span>
        </button>
      ) : isFuture ? (
        <div className="mt-3 flex min-h-24 items-center justify-center rounded-theme bg-theme-bg/60 px-4 text-center text-sm leading-relaxed text-theme-text-tertiary">
          아직 기록할 수 없는 날짜예요.<br />오늘이 되면 일기를 작성할 수 있어요.
        </div>
      ) : (
        <div className="mt-3 flex min-h-32 flex-col items-center justify-center rounded-theme bg-theme-bg/60 px-4 text-center">
          <p className="text-base font-medium text-theme-text-primary">아직 작성한 일기가 없어요.</p>
          <p className="mt-1 text-sm text-theme-text-tertiary">오늘 하루의 이야기를 남겨보세요.</p>
          <button
            className="mt-4 flex min-h-10 items-center gap-1.5 rounded-full bg-theme-accent px-5 text-sm font-semibold text-theme-text-on-accent"
            onClick={onAddDiary}
            type="button"
          >
            <MdAdd className="text-lg" /> 일기 쓰기
          </button>
        </div>
      )}
    </div>
  );
};

export default SelectedDayDiarySection;
