'use client';

import { useSettingsContext } from "@/common/providers/settings/useSettingsContext";
import { FONT_TYPE_LIST } from "@/common/types/setting";
import { SettingStepSelector } from "./SettingStepSelector";

export const FontTypeSelector = () => {
  const { font } = useSettingsContext();

  return (
    <SettingStepSelector
      value={font.type}
      values={FONT_TYPE_LIST}
      displayValue={font.type}
      onChange={font.setFontType}
    />
  );
};
