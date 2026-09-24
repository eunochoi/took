import DiaryMenus from '@/common/components/ui/Diary/DiaryMenus';
import EmotionImage from '@/common/components/ui/EmotionImage';
import { EMOTIONS } from '@/common/constants/emotions';
import type { DiaryData } from '@/common/types/diary';
import { parseLocalDate } from '@/common/utils/date/parseLocalDate';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useEffect, useRef, useState } from 'react';
import { MdMoreVert } from 'react-icons/md';

interface Props {
  diaryData: DiaryData;
}

const DiaryDateHeader = ({ diaryData }: Props) => {
  const dateForDisplay = parseLocalDate(diaryData.date);
  const formattedDate = format(dateForDisplay, 'M월 d일');
  const emotion = EMOTIONS[diaryData.emotion];

  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const handleToggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [diaryData]);

  return (
    <div className="relative flex min-w-0 w-full items-center gap-3">
      {emotion && (
        <EmotionImage emotion={emotion} alt="" className="h-12 w-12 shrink-0 object-contain" />
      )}
      <div className="flex min-w-0 flex-col gap-0.5">
        {emotion && <span className="text-lg font-semibold text-theme-accent">{emotion.nameKr}</span>}
        <time dateTime={diaryData.date} className="flex flex-wrap gap-x-1 text-sm text-theme-text-secondary">
          <span className="whitespace-nowrap">{formattedDate}</span>
          <span className="whitespace-nowrap">{format(dateForDisplay, 'EEEE', { locale: ko })}</span>
        </time>
      </div>
      <button
        ref={menuButtonRef}
        className="-mr-3 ml-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xl text-theme-text-tertiary"
        aria-label="일기 메뉴"
        aria-expanded={isMenuOpen}
        onClick={handleToggleMenu}
        type="button"
      >
        <MdMoreVert />
      </button>
      <DiaryMenus
        isMenuOpen={isMenuOpen}
        setMenuOpen={setMenuOpen}
        anchorRef={menuButtonRef}
        diaryData={diaryData}
      />
    </div>
  );
};

export default DiaryDateHeader;
