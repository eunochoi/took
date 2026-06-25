import { MdDeleteForever, MdLogout } from "react-icons/md";
import { onDeleteAccount } from "../_functions/onDeleteAccount";
import { onLogout } from "../_functions/onLogout";
import { SettingItem } from "./SettingItem";
import { SettingSectionCard } from "./SettingSectionCard";
import { SettingSubsection } from "./SettingSubsection";

interface AccountInfoSectionProps {
  email: string;
  provider: string;
  createAt: string;
}

export const AccountInfoSection = ({ email, provider, createAt }: AccountInfoSectionProps) => {
  return (
    <SettingSectionCard title="계정" gap={24}>
      <SettingSubsection title="유저 가입 정보">
        <SettingItem settingItemKey="이메일" settingItemValue={<span>{email}</span>} />
        <SettingItem settingItemKey="계정 타입" settingItemValue={<span>{provider}</span>} />
        <SettingItem settingItemKey="가입일" settingItemValue={<span>{createAt}</span>} />
      </SettingSubsection>
      <SettingSubsection title="계정 관리">
        <SettingItem
          settingItemKey="로그아웃"
          settingItemValue={
            <button onClick={onLogout} type="button">
              <MdLogout className="text-xl" />
            </button>
          }
        />
        <SettingItem
          settingItemKey="회원 탈퇴"
          settingItemValue={
            <button onClick={onDeleteAccount} type="button">
              <MdDeleteForever className="text-xl" />
            </button>
          }
        />
      </SettingSubsection>
    </SettingSectionCard>
  );
};
