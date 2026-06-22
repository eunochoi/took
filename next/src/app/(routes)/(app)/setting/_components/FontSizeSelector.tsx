'use client';

import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import { FONT_SIZE_LIST } from "@/common/utils/settingsContext/SettingsContext";
import { useSettingsContext } from "@/common/utils/settingsContext/useSettingsContext";

export const FontSizeSelector = () => {
  const { fontSize, setFontSize } = useSettingsContext();

  const currentIndex = FONT_SIZE_LIST.indexOf(fontSize);

  const decrease = () => {
    if (currentIndex > 0) {
      setFontSize(FONT_SIZE_LIST[currentIndex - 1]);
    }
  };

  const increase = () => {
    if (currentIndex < FONT_SIZE_LIST.length - 1) {
      setFontSize(FONT_SIZE_LIST[currentIndex + 1]);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <button className="flex items-center justify-center text-2xl text-grey-title disabled:opacity-30" onClick={decrease} disabled={currentIndex === 0} type="button">
        <MdChevronLeft />
      </button>
      <span className="min-w-12 text-center text-app text-grey-title">{fontSize}</span>
      <button className="flex items-center justify-center text-2xl text-grey-title disabled:opacity-30" onClick={increase} disabled={currentIndex === FONT_SIZE_LIST.length - 1} type="button">
        <MdChevronRight />
      </button>
    </div>
  );
};
