'use client';

import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import { FONT_TYPE_LIST } from "@/common/utils/settingsContext/SettingsContext";
import { useSettingsContext } from "@/common/utils/settingsContext/useSettingsContext";

export const FontTypeSelector = () => {
  const { fontType, setFontType } = useSettingsContext();

  const currentIndex = FONT_TYPE_LIST.indexOf(fontType);

  const decrease = () => {
    if (currentIndex > 0) {
      setFontType(FONT_TYPE_LIST[currentIndex - 1]);
    }
  };

  const increase = () => {
    if (currentIndex < FONT_TYPE_LIST.length - 1) {
      setFontType(FONT_TYPE_LIST[currentIndex + 1]);
    }
  };

  const displayName = fontType === 'type1' ? '타입1' : fontType === 'type2' ? '타입2' : '타입3';

  return (
    <div className="flex items-center justify-center gap-2">
      <button className="flex items-center justify-center text-2xl text-grey-title disabled:opacity-30" onClick={decrease} disabled={currentIndex === 0} type="button">
        <MdChevronLeft />
      </button>
      <span className="min-w-12 text-center text-app text-grey-title">{displayName}</span>
      <button className="flex items-center justify-center text-2xl text-grey-title disabled:opacity-30" onClick={increase} disabled={currentIndex === FONT_TYPE_LIST.length - 1} type="button">
        <MdChevronRight />
      </button>
    </div>
  );
};
