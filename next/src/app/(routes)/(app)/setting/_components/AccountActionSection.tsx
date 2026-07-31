import { MdDeleteForever, MdLogout } from "react-icons/md";
import { onDeleteAccount } from "../_functions/onDeleteAccount";
import { onLogout } from "../_functions/onLogout";
import { SettingItem } from "./SettingItem";
import { SettingSectionCard } from "./SettingSectionCard";
import { SettingSubsection } from "./SettingSubsection";

export const AccountActionSection = () => {
  return (
    <SettingSectionCard>
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
