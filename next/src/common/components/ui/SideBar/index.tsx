'use client';

import { useNavItems } from '@/common/hooks/useNavItems';
import { cn } from '@/common/utils/cn';
import { useRouter } from 'next/navigation';
import Wordmark from '../Wordmark';

const SideBar = () => {
  const router = useRouter();
  const { items, current } = useNavItems();

  return (
    <aside className="bg-theme-bg flex h-full w-full flex-col font-sans overflow-y-auto border-r border-theme-border/40 px-3 py-8 desktop:px-5">
      <button type="button" onClick={() => router.push('/home')} aria-label="TOOK 홈" className="mb-10 self-center rounded-lg desktop:ml-3 desktop:self-start">
        <Wordmark />
      </button>
      <nav className="flex flex-col gap-2" aria-label="주요 메뉴">
        {items.map(({ key, segment, icon: Icon, href, label }) => (
          <button key={key} type="button" onClick={() => router.push(href)} aria-label={label} aria-current={current === segment ? 'page' : undefined}
            className={cn("font-semibold flex min-h-12 items-center justify-center gap-3 rounded-xl px-3 text-sm desktop:justify-start border-[1px]",
              current === segment ? "bg-theme-accent-light border-theme-accent/30 text-theme-accent-deep" : "border-transparent text-theme-text-secondary desktop:hover:bg-theme-surface/50")}>
            <Icon className="shrink-0 text-xl" />
            <span className="hidden desktop:block">{label}</span>
          </button>
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
