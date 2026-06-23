import { ReactNode } from "react";

interface SettingItemProps {
  settingItemKey: string;
  settingItemValue: ReactNode;
}

export const SettingItem = ({ settingItemKey, settingItemValue }: SettingItemProps) => {
  return (
    <span className="box-border flex w-full justify-between py-2 text-gray-400 [&_*]:text-gray-400">
      <span className="text-lg capitalize">{settingItemKey}</span>
      <span>{settingItemValue}</span>
    </span>
  );
};
