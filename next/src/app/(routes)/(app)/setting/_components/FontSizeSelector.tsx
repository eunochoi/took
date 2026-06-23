'use client';

import { FONT_SIZE_LIST } from "@/common/utils/settingsContext/SettingsContext";
import { useSettingsContext } from "@/common/utils/settingsContext/useSettingsContext";

import { SettingStepSelector } from "./SettingStepSelector";

export const FontSizeSelector = () => {
  const { fontSize, setFontSize } = useSettingsContext();

  return (
    <SettingStepSelector
      value={fontSize}
      values={FONT_SIZE_LIST}
      displayValue={fontSize}
      onChange={setFontSize}
    />
  );
};
