'use client';

import { cn } from "@/common/utils/cn";
import Link from "next/link";
import { useNavItems } from "./useNavItems";

const BottomNav = () => {
  const { items, current } = useNavItems();

  const mainItems = items.filter(item => item.key !== 'setting');
  // const settingItem = items.find(item => item.key === 'setting');

  return (
    <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-[95] flex h-[var(--mobileNav)] w-full items-center justify-center">
      <nav className="pointer-events-auto flex items-center gap-1.5 px-1.5 py-1.5 rounded-[60px] bg-theme-surface shadow-[0_2px_12px_rgb(var(--theme-shadow-color)/0.06)] backdrop-blur-2xl">
        {items.map(({ key, icon: Icon, href }) => (
          <Link
            key={key}
            href={href}
            className={cn(
              "flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-[999px] text-xl transition-colors duration-[180ms]",
              current === key ? "bg-theme-accent text-theme-text-on-accent" : "bg-transparent text-theme-text-tertiary",
            )}
          >
            <Icon />
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default BottomNav;
