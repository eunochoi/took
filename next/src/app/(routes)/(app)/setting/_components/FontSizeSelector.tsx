'use client';

import { useSettingsContext } from "@/common/providers/settings/useSettingsContext";
import { FONT_SIZE_LIST } from "@/common/types/setting";
import { SettingStepSelector } from "./SettingStepSelector";

export const FontSizeSelector = () => {
  const { font } = useSettingsContext();

  return (
    <SettingStepSelector
      value={font.size}
      values={FONT_SIZE_LIST}
      displayValue={font.size}
      onChange={font.setFontSize}
    />
  );
};
