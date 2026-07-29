'use client';

import { useRouter } from "next/navigation";
import { MdLowPriority } from "react-icons/md";

import { FontSizeSelector } from "./FontSizeSelector";
import { FontTypeSelector } from "./FontTypeSelector";
import { SettingItem } from "./SettingItem";
import { SettingSectionCard } from "./SettingSectionCard";
import { SettingSubsection } from "./SettingSubsection";
import { ThemeColorSelector } from "./ThemeColorSelector";
import { ThemeModeSelector } from "./ThemeModeSelector";

export const ThemeSettingsSection = () => {
  const router = useRouter();

  return (
    <SettingSectionCard gap={24}>
      <SettingSubsection title="테마">
        <SettingItem
          settingItemKey="강조 색상"
          settingItemValue={<ThemeColorSelector />}
        />
        <SettingItem
          settingItemKey="배경 색상"
          settingItemValue={<ThemeModeSelector />}
        />
      </SettingSubsection>

      <SettingSubsection title="폰트">
        <SettingItem
          settingItemKey="폰트 크기 선택"
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
