'use client';

import { useNavItems } from '@/common/hooks/useNavItems';
import { cn } from '@/common/utils/cn';
import Link from 'next/link';
import Wordmark from '../Wordmark';

const SideBar = () => {
  const { items, current } = useNavItems();

  return (
    <aside className="flex h-full w-full flex-col font-sans overflow-y-auto border-r border-theme-border/40 px-3 py-8 desktop:px-5">
      <Link href="/home" aria-label="TOOK 홈" className="mb-10 self-center rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-theme-accent desktop:ml-3 desktop:self-start">
        <Wordmark />
      </Link>
      <nav className="flex flex-col gap-2" aria-label="주요 메뉴">
        {items.map(({ key, segment, icon: Icon, href, label }) => (
          <Link key={key} href={href} aria-label={label} aria-current={current === segment ? 'page' : undefined}
            className={cn("flex min-h-12 items-center justify-center gap-3 rounded-xl px-3 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-theme-accent desktop:justify-start", current === segment ? "bg-theme-accent/15 font-semibold text-theme-accent desktop:text-[color:color-mix(in_srgb,rgb(var(--theme-accent))_80%,black)]" : "text-theme-text-secondary desktop:hover:bg-theme-surface/60")}>
            <Icon className="shrink-0 text-xl" />
            <span className="hidden desktop:block">{label}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-auto hidden px-3 pt-12 text-xs leading-relaxed text-theme-text-secondary desktop:block">
        <p>오늘도<br />조금은 더 좋은 나에게</p>
        <p className="mt-5 text-theme-text-tertiary">small moments<br />make a kinder you</p>
      </div>
    </aside>
  );
};

export default SideBar;
