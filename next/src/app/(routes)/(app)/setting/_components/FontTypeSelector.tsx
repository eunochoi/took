'use client';

import { FONT_TYPE_LIST } from "@/common/utils/settingsContext/SettingsContext";
import { useSettingsContext } from "@/common/utils/settingsContext/useSettingsContext";

import { SettingStepSelector } from "./SettingStepSelector";

export const FontTypeSelector = () => {
  const { fontType, setFontType } = useSettingsContext();

  const displayName = fontType === 'type1' ? '타입1' : fontType === 'type2' ? '타입2' : '타입3';

  return (
    <SettingStepSelector
      value={fontType}
      values={FONT_TYPE_LIST}
      displayValue={displayName}
      onChange={setFontType}
    />
  );
};
