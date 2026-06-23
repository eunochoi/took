'use client';

import Logo from '@/common/components/ui/Logo';
import { cn } from '@/common/utils/cn';
import Link from "next/link";
import { useNavItems } from "./useNavItems";

const SideNav = () => {
  const { items, current } = useNavItems();

  return (
    <nav className="fixed left-0 flex h-[100dvh] w-[25dvw] flex-col items-center justify-center gap-2 bg-white/80 shadow-[2px_0_20px_rgba(0,0,0,0.04)] backdrop-blur-2xl">
      <div className="mb-4">
        <Logo size={24} />
      </div>
      {items.map(({ key, icon: Icon, label, href }) => (
        <Link
          key={key}
          href={href}
          className={cn(
            "flex w-4/5 cursor-pointer items-center gap-3 px-3 py-2 text-sm capitalize",
            current === key ? "text-theme" : "text-[#c3c3c3]",
          )}
        >
          <Icon /> {label}
        </Link>
      ))}
    </nav>
  );
};

export default SideNav;
