import { EMOTIONS } from '@/common/constants/emotions';
import type { DiaryData } from '@/common/types/diary';
import { parseLocalDate } from '@/common/utils/date/parseLocalDate';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useEffect, useRef, useState } from 'react';
import { IoMdImage } from "react-icons/io";
import { MdMoreVert } from 'react-icons/md';


import DiaryMenus from './DiaryMenus';

interface Props {
  diaryData: DiaryData;
}

const DiaryDateHeader = ({ diaryData }: Props) => {
  const dateForDisplay = parseLocalDate(diaryData.date);
  const formattedDate = format(dateForDisplay, 'yyyy년 M월 d일');
  const day = format(dateForDisplay, 'eeee', { locale: ko });

  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const handleToggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [diaryData]);

  return (
    <div className="relative flex w-full items-center justify-between px-3.5 pt-3.5">
      <div className="flex items-center gap-3">
        <span className="text-base font-semibold text-grey-title">{formattedDate}</span>
        {/* <span className="text-base font-semibold text-gray-400">{day}</span> */}
        <span className="text-base font-semibold text-theme">
          {EMOTIONS[diaryData.emotion]?.nameKr}
        </span>
        {diaryData.Images.length > 0 &&
          <div className='flex items-center justify-center gap-1'>
            <IoMdImage className='flex items-center justify-center text-lg text-gray-400' />
            <span className='text-base text-gray-400 font-semibold'>{diaryData.Images.length}</span>
          </div>}
      </div>
      <button
        ref={menuButtonRef}
        className="flex cursor-pointer items-center gap-2 text-xl text-[#a5a5a5]"
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
