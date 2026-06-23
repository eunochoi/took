'use client';

import { useRouter } from "next/navigation";
import { MdLowPriority } from "react-icons/md";

import { FontSizeSelector } from "./FontSizeSelector";
import { FontTypeSelector } from "./FontTypeSelector";
import { SettingItem } from "./SettingItem";
import { SettingSectionCard } from "./SettingSectionCard";
import { SettingSubsection } from "./SettingSubsection";
import { ThemeColorSelector } from "./ThemeColorSelector";

export const ThemeSettingsSection = () => {
  const router = useRouter();

  return (
    <SettingSectionCard title="테마 설정">
      <SettingSubsection title="메인 색상">
        <ThemeColorSelector />
      </SettingSubsection>

      <SettingSubsection title="폰트">
        <SettingItem
          settingItemKey="다이어리 글씨 크기"
          settingItemValue={<FontSizeSelector />}
        />
        <SettingItem
          settingItemKey="폰트 타입"
          settingItemValue={<FontTypeSelector />}
        />
      </SettingSubsection>

      <SettingSubsection title="습관">
        <SettingItem
          settingItemKey="습관 순서 커스텀"
          settingItemValue={
            <button
              onClick={() => {
                router.push("/inter/habitOrder", { scroll: false });
              }}
              type="button"
            >
              <MdLowPriority />
            </button>
          }
        />
      </SettingSubsection>
    </SettingSectionCard>
  );
};
