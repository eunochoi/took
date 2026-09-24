'use client';

import { useNavItems } from "@/common/hooks/useNavItems";
import { cn } from "@/common/utils/cn";
import { useRouter } from "next/navigation";

const BottomNav = () => {
  const router = useRouter();
  const { items, current } = useNavItems();
  const mainItems = items.slice(0, -1);
  const lastItem = items.at(-1)!;

  const navItemsWrapperClass = 'border-[1px] border-theme-bg pointer-events-auto flex items-center gap-1.5 rounded-full bg-theme-surface/75 shadow-theme-floating backdrop-blur-2xl';
  const navItemClass = 'flex cursor-pointer items-center justify-center rounded-full text-xl';
  const activeNavItemClass = 'bg-theme-accent text-theme-text-on-accent';
  const inactiveNavItemClass = "bg-transparent text-theme-text-tertiary";

  return (
    <nav className="flex gap-4 items-center" aria-label="주요 메뉴">
      <div className={cn(navItemsWrapperClass, 'px-1.5 py-1.5')}>
        {mainItems.map(({ key, segment, icon: Icon, href, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => router.push(href)}
            aria-label={label}
            aria-current={current === segment ? 'page' : undefined}
            className={cn(navItemClass, 'h-[42px] w-[42px]', current === segment ? activeNavItemClass : inactiveNavItemClass)}
          >
            <Icon />
          </button>
        ))}
      </div>
      <div className={cn('h-[50px] w-[50px] !border-0', navItemsWrapperClass)}>
        <button
          type="button"
          onClick={() => router.push(lastItem.href)}
          aria-label={lastItem.label}
          aria-current={current === lastItem.segment ? 'page' : undefined}
          className={cn(navItemClass, 'h-full w-full', current === lastItem.segment ? activeNavItemClass : inactiveNavItemClass)}
        >
          <lastItem.icon />
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
