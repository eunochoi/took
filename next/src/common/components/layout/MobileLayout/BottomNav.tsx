'use client';

import { useNavItems } from "@/common/hooks/useNavItems";
import { cn } from "@/common/utils/cn";
import Link from "next/link";

const BottomNav = () => {
  const { items, current } = useNavItems();
  const mainItems = items.slice(0, -1);
  const lastItem = items.at(-1)!;

  const navItemsWrapperClass = 'pointer-events-auto flex items-center gap-1.5 rounded-full bg-theme-surface/75 shadow-theme-floating backdrop-blur-2xl';
  const navItemClass = 'flex cursor-pointer items-center justify-center rounded-full text-xl transition-colors duration-500';
  const activNavItemClass = 'bg-theme-accent text-theme-text-on-accent';
  const inActivNavItemClass = "bg-transparent text-theme-text-tertiary";

  return (
    <nav className="flex gap-4 items-center">
      <div className={cn(navItemsWrapperClass, 'px-1.5 py-1.5')}>
        {mainItems.map(({ key, segment, icon: Icon, href }) => (
          <Link
            key={key}
            href={href}
            className={cn(navItemClass, 'h-[42px] w-[42px]', current === segment ? activNavItemClass : inActivNavItemClass,
            )}
          >
            <Icon />
          </Link>
        ))}
      </div>
      <div className={cn('h-[50px] w-[50px]', navItemsWrapperClass)}>
        <Link
          key={lastItem?.key}
          href={lastItem?.href}
          className={cn(navItemClass, 'h-full w-full', current === lastItem.segment ? activNavItemClass : inActivNavItemClass,
          )}
        >
          <lastItem.icon />
        </Link>
      </div>
    </nav>
  );
};

export default BottomNav;
