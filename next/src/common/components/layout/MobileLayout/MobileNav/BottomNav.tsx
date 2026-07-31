'use client';

import { cn } from "@/common/utils/cn";
import Link from "next/link";
import { useNavItems } from "./useNavItems";

const BottomNav = () => {
  const { items, current } = useNavItems();

  return (
    <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-[95] flex h-[var(--mobileNav)] w-full items-center justify-center">
      <nav className="pointer-events-auto flex items-center gap-1.5 rounded-full bg-theme-surface/75 px-1.5 py-1.5 shadow-[0_2px_12px_rgb(var(--theme-shadow-color)/0.1)] backdrop-blur-2xl">
        {items.map(({ key, segment, icon: Icon, href }) => (
          <Link
            key={key}
            href={href}
            className={cn(
              "flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-full text-xl transition-colors duration-200",
              current === segment ? "bg-theme-accent text-theme-text-on-accent" : "bg-transparent text-theme-text-tertiary",
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
