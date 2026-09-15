import { SettingItem } from "./SettingItem";
import { SettingSectionCard } from "./SettingSectionCard";
import { SettingSubsection } from "./SettingSubsection";
import { cn } from "@/common/utils/cn";

interface AccountInfoSectionProps {
  email: string;
  provider: string;
  createAt: string;
  className?: string;
}

export const AccountInfoSection = ({ email, provider, createAt, className }: AccountInfoSectionProps) => {
  return (
    <SettingSectionCard className={cn(className)}>
      <SettingSubsection title="가입 정보">
        <SettingItem settingItemKey="이메일" settingItemValue={<span>{email}</span>} />
        <SettingItem settingItemKey="계정 타입" settingItemValue={<span>{provider}</span>} />
        <SettingItem settingItemKey="가입일" settingItemValue={<span>{createAt}</span>} />
      </SettingSubsection>
    </SettingSectionCard>
  );
};
