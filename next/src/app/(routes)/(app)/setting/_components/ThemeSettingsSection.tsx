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
    <SettingSectionCard title="테마" gap={24}>
      <SettingSubsection title="테마 색상">
        <ThemeColorSelector />
      </SettingSubsection>

      <SettingSubsection title="폰트">
        <SettingItem
          settingItemKey="다이어리 글씨 크기 선택"
          settingItemValue={<FontSizeSelector />}
        />
        <SettingItem
          settingItemKey="폰트 타입 선택"
          settingItemValue={<FontTypeSelector />}
        />
      </SettingSubsection>

      <SettingSubsection title="습관 정렬">
        <SettingItem
          settingItemKey="습관 목록 순서 개인화"
          settingItemValue={
            <button
              onClick={() => {
                router.push("/inter/habitOrder", { scroll: false });
              }}
              type="button"
            >
              <MdLowPriority className="text-xl" />
            </button>
          }
        />
      </SettingSubsection>
    </SettingSectionCard>
  );
};
