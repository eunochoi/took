'use client';

import { FONT_TYPE_LIST } from "@/common/providers/settings/SettingsContext";
import { useSettingsContext } from "@/common/providers/settings/useSettingsContext";

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
