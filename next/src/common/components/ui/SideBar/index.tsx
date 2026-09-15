'use client';

import { useNavItems } from '@/common/hooks/useNavItems';
import { cn } from '@/common/utils/cn';
import Link from 'next/link';
import Logo from '../Logo';

const sideBarWrapperClass = "flex h-full w-full flex-col items-center justify-start gap-16 landscape-short:gap-4 py-8 overflow-y-auto";

const commonNavWrapperClass = 'shrink-0 flex flex-col justify-center items-center w-16 rounded-full overflow-hidden bg-theme-surface/75 shadow-theme-floating backdrop-blur-2xl';
const commonNavItemClass = "transition duration-500 ease-out flex justify-center items-center w-full h-auto aspect-square text-xl rounded-full";
const activNavItemClass = 'bg-theme-accent text-theme-text-on-accent';
const inActiveNavItemCalss = 'text-theme-text-tertiary';

const SideBar = () => {
  const { items, current } = useNavItems();
  const mainItems = items.slice(0, -1);
  const lastItem = items.at(-1)!;

  return (
    <aside className={cn(sideBarWrapperClass)}>
      <div
        data-component='logo'
        className='flex flex-col justify-center items-start gap-2 landscape-short:hidden'>
        <Logo
          withText
          logoClassName='w-16 h-auto'
          textClassName='text-xl font-bold' />
      </div>
      <nav className={cn(commonNavWrapperClass, 'p-2 gap-4')} aria-label="주요 메뉴">
        {mainItems.map(({ key, segment, icon: Icon, href }) => (
          <Link key={key} href={href} aria-label={segment}
            className={cn(
              commonNavItemClass,
              current === segment
                ? activNavItemClass : inActiveNavItemCalss,
            )}>
            <Icon />
          </Link>
        ))}
      </nav>
      <div className={cn(commonNavWrapperClass)}>
        <Link href={lastItem.href} aria-label={lastItem.segment}
          className={cn(
            commonNavItemClass,
            current === lastItem.segment
              ? activNavItemClass : inActiveNavItemCalss,
          )}>
          <lastItem.icon />
        </Link>
      </div>
    </aside>
  );
};

export default SideBar;
