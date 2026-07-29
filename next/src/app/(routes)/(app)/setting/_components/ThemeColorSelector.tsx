'use client';

import { MdCheck } from 'react-icons/md';

import { useSettingsContext } from "@/common/settings/useSettingsContext";
import { THEME_NAME_LIST, THEME_VALUE } from '@/common/types/setting';
import { cn } from "@/common/utils/cn";

export const ThemeColorSelector = () => {
  const { theme } = useSettingsContext();
  const currentThemeName = theme.accent;
  const setThemeName = theme.setAccent;
  return (
    <div className="py-3">
      <div className="flex items-center justify-between gap-2">
        {THEME_NAME_LIST.map((themeName) => {
          const selected = themeName === currentThemeName;

          return (
            <button
              key={themeName}
              className={cn(
                "bg-theme-accent flex h-[32px] w-[32px] items-center justify-center rounded-full transition-transform duration-200 ease-in-out hover:scale-[1.2]",
                selected ? "scale-[1.15]" : "scale-100",
              )}
              onClick={() => setThemeName(themeName)}
              style={{ backgroundColor: THEME_VALUE[themeName].accent }}
              type="button"
            >
              {selected && <MdCheck className="text-lg text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};
