import { SettingItem } from "./SettingItem";
import { SettingSectionCard } from "./SettingSectionCard";

interface AccountInfoSectionProps {
  email: string;
  provider: string;
  createAt: string;
}

export const AccountInfoSection = ({ email, provider, createAt }: AccountInfoSectionProps) => {
  return (
    <SettingSectionCard title="계정 정보" gap={0}>
      <SettingItem settingItemKey="이메일" settingItemValue={<span>{email}</span>} />
      <SettingItem settingItemKey="계정 타입" settingItemValue={<span>{provider}</span>} />
      <SettingItem settingItemKey="가입일" settingItemValue={<span>{createAt}</span>} />
    </SettingSectionCard>
  );
};
