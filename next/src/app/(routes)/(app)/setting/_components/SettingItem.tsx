import { ReactNode } from "react";

interface SettingItemProps {
  settingItemKey: string;
  settingItemValue: ReactNode;
}

export const SettingItem = ({ settingItemKey, settingItemValue }: SettingItemProps) => {
  return (
    <span className="box-border flex w-full justify-between items-center py-2 text-gray-400">
      <span className="flex justify-between items-center text-base capitalize">{settingItemKey}</span>
      <span className="flex justify-between items-center text-base">{settingItemValue}</span>
    </span>
  );
};
