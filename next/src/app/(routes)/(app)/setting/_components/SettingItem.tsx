import { ReactNode } from "react";

interface SettingItemProps {
  settingItemKey: string;
  settingItemValue: ReactNode;
}

export const SettingItem = ({ settingItemKey, settingItemValue }: SettingItemProps) => {
  return (
    <span className="box-border flex w-full justify-between py-2 text-gray-400">
      <span className="text-sm capitalize">{settingItemKey}</span>
      <span className="text-sm">{settingItemValue}</span>
    </span>
  );
};
