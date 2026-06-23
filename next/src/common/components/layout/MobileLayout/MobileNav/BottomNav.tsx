'use client';

import { cn } from "@/common/utils/cn";
import Link from "next/link";
import { useNavItems } from "./useNavItems";

const BottomNav = () => {
  const { items, current } = useNavItems();

  const mainItems = items.filter(item => item.key !== 'setting');
  const settingItem = items.find(item => item.key === 'setting');

  return (
    <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-[95] flex h-[var(--mobileNav)] w-full items-center justify-center gap-6">
      <nav className="pointer-events-auto flex items-center gap-[7px] rounded-[60px] bg-white/75 h-[60px] px-[7px] py-[7px] shadow-[0_2px_12px_rgba(0,0,0,0.06)] backdrop-blur-2xl">
        {mainItems.map(({ key, icon: Icon, href }) => (
          <Link
            key={key}
            href={href}
            className={cn(
              "flex h-[46px] w-[46px] cursor-pointer items-center justify-center rounded-[46px] text-[22px] transition-colors duration-[180ms]",
              current === key ? "bg-theme text-white" : "bg-transparent text-[#999]",
            )}
          >
            <Icon />
          </Link>
        ))}
      </nav>

      {settingItem && (
        <Link
          href={settingItem.href}
          className={cn(
            "pointer-events-auto flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-[60px] text-2xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] backdrop-blur-2xl transition-colors duration-[180ms]",
            current === 'setting' ? "bg-theme text-white" : "bg-white/75 text-[#999]",
          )}
        >
          <settingItem.icon />
        </Link>
      )}
    </div>
  );
};

export default BottomNav;
