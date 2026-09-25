import { ReactNode } from "react";

interface SettingItemProps {
  settingItemKey: string;
  settingItemValue: ReactNode;
}

export const SettingItem = ({ settingItemKey, settingItemValue }: SettingItemProps) => {
  return (
    <div className="flex min-w-0 w-full flex-wrap items-center justify-between gap-2">
      <span className="min-w-0 text-base text-theme-text-secondary">{settingItemKey}</span>
      <span className="ml-auto min-w-0 text-base text-theme-accent">{settingItemValue}</span>
    </div>
  );
};
