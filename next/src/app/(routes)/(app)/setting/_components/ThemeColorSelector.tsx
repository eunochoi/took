'use client';

import { MdCheck } from 'react-icons/md';

import { cn } from "@/common/utils/cn";
import { THEME_COLORS } from "@/common/providers/settings/SettingsContext";
import { useSettingsContext } from "@/common/providers/settings/useSettingsContext";

export const ThemeColorSelector = () => {
  const { themeColor, setThemeColor } = useSettingsContext();

  return (
    <div className="py-3">
      <div className="flex w-full items-center justify-between">
        {THEME_COLORS.map((color) => {
          const selected = themeColor === color;

          return (
            <button
              key={color}
              className={cn(
                "flex h-[42px] w-[42px] items-center justify-center rounded-full transition-transform duration-200 ease-in-out hover:scale-[1.2]",
                selected ? "scale-[1.15]" : "scale-100",
              )}
              onClick={() => setThemeColor(color)}
              style={{ backgroundColor: color }}
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
