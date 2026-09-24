import { cn } from "@/common/utils/cn";
import { SettingItem } from "./SettingItem";
import { SettingSectionCard } from "./SettingSectionCard";
import { SettingSubsection } from "./SettingSubsection";

interface AccountInfoSectionProps {
  email: string;
  provider: string;
  createAt: string;
  className?: string;
}

export const AccountInfoSection = ({ email, provider, createAt, className }: AccountInfoSectionProps) => {
  return (
    <SettingSectionCard className={cn("desktop:[&_.text-base]:text-sm", className)}>
      <SettingSubsection title="가입 정보">
        <SettingItem settingItemKey="이메일" settingItemValue={<span className="text-theme-text-tertiary">{email}</span>} />
        <SettingItem settingItemKey="계정 타입" settingItemValue={<span className="text-theme-text-tertiary">{provider}</span>} />
        <SettingItem settingItemKey="가입일" settingItemValue={<span className="text-theme-text-tertiary">{createAt}</span>} />
      </SettingSubsection>
    </SettingSectionCard>
  );
};
