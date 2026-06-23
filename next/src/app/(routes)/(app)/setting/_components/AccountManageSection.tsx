'use client';

import { MdDeleteForever, MdLogout } from "react-icons/md";

import { SettingItem } from "./SettingItem";
import { SettingSectionCard } from "./SettingSectionCard";
import { onDeleteAccount } from "../_functions/onDeleteAccount";
import { onLogout } from "../_functions/onLogout";

export const AccountManageSection = () => {
  return (
    <SettingSectionCard title="계정 관리">
      <SettingItem
        settingItemKey="로그아웃"
        settingItemValue={
          <button onClick={onLogout} type="button">
            <MdLogout />
          </button>
        }
      />
      <SettingItem
        settingItemKey="회원 탈퇴"
        settingItemValue={
          <button onClick={onDeleteAccount} type="button">
            <MdDeleteForever />
          </button>
        }
      />
    </SettingSectionCard>
  );
};
