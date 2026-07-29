'use client';

import { useSettingsContext } from "@/common/settings/useSettingsContext";
import { THEME_MODE_LIST } from "@/common/types/setting";
import { SettingStepSelector } from "./SettingStepSelector";

export const ThemeModeSelector = () => {
  const { theme } = useSettingsContext();

  return (
    <SettingStepSelector
      value={theme.mode}
      values={THEME_MODE_LIST}
      displayValue={theme.mode}
      onChange={theme.setMode}
    />
  );
};
