'use client';

import Logo from '@/common/components/ui/Logo';
import { useNavItems } from '@/common/hooks/useNavItems';
import { cn } from '@/common/utils/cn';
import Link from 'next/link';

const sideBarBaseClass = "flex h-full w-full flex-col items-center justify-evenly overflow-y-auto bg-theme-surface/80 shadow-theme-sidebar backdrop-blur-xl";
const sideBarTabletClass = "gap-2 px-2";
const sideBarDesktopClass = "desktop:gap-16 desktop:px-4";

const navBaseClass = "flex h-auto flex-col items-start justify-center";
const navTabletClass = "w-[80%] gap-4";
const navDesktopClass = "desktop:w-[70%] desktop:gap-6";

const linkBaseClass = "flex w-full cursor-pointer justify-between whitespace-nowrap font-medium capitalize transition-colors duration-200";
const linkTabletClass = "gap-2 text-base";
const linkDesktopClass = "desktop:justify-between desktop:gap-4 desktop:text-xl";

const contactBaseClass = "w-full text-center text-xs text-theme-accent";

const SideBar = () => {
  const { items, current } = useNavItems();

  return (
    <aside className={cn(sideBarBaseClass, sideBarTabletClass, sideBarDesktopClass)}>
      <div
        data-component='logo'
        className='flex flex-col justify-center items-center gap-2'>
        <Logo withText logoClassName='w-16 h-auto' textClassName='text-lg font-bold' />
      </div>
      <nav className={cn(navBaseClass, navTabletClass, navDesktopClass)}>
        {items.map(({ key, segment, icon: Icon, label, href }) => (
          <Link
            key={key}
            href={href}
            className={cn(
              linkBaseClass,
              linkTabletClass,
              linkDesktopClass,
              current === segment ? "text-theme-accent" : "text-theme-text-secondary",
            )}
          >
            <Icon className="shrink-0" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
      <span className={cn(contactBaseClass)}>eooooostudio@gmail.com</span>
    </aside>
  );
};

export default SideBar;
