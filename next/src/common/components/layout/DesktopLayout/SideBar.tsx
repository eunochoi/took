import { getTodayString } from "@/common/functions/getTodayString";
import { cn } from "@/common/utils/cn";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import Logo from '@/common/components/ui/Logo';
import { MdCalendarMonth, MdCheckBox, MdHome, MdSettings, MdViewList } from 'react-icons/md';

const SideBar = () => {
  const current = useSelectedLayoutSegment();

  return (
    <div className="fixed left-0 top-0 z-[100] flex h-[100dvh] w-[var(--sidebarWidth)] flex-col items-center justify-evenly gap-16 overflow-y-scroll bg-theme-surface/80 px-4 shadow-theme-sidebar backdrop-blur-xl">
      <div className="flex flex-col items-start">
        <Logo size={36} />
      </div>
      <div className="flex h-auto w-[70%] flex-col items-start justify-center gap-6">
        <Link
          href="/home"
          className={cn("flex w-full cursor-pointer items-center justify-between text-xl font-medium capitalize text-theme-text-secondary transition-colors duration-200", current === 'home' && "text-theme-accent")}
        >
          <MdHome className="icon" />
          <span>home</span>
        </Link>
        <Link
          href={`/calendar?date=${getTodayString()}`}
          className={cn("flex w-full cursor-pointer items-center justify-between text-xl font-medium capitalize text-theme-text-secondary transition-colors duration-200", current === 'calendar' && "text-theme-accent")}
        >
          <MdCalendarMonth className="icon" />
          <span>calendar</span>
        </Link>
        <Link
          href="/diary"
          className={cn("flex w-full cursor-pointer items-center justify-between text-xl font-medium capitalize text-theme-text-secondary transition-colors duration-200", current === 'diary' && "text-theme-accent")}
        >
          <MdViewList className="icon" />
          <span>diary list</span>
        </Link>
        <Link
          href="/habit"
          className={cn("flex w-full cursor-pointer items-center justify-between text-xl font-medium capitalize text-theme-text-secondary transition-colors duration-200", current === 'habit' && "text-theme-accent")}
        >
          <MdCheckBox className="icon" />
          <span>habit</span>
        </Link>
        <Link
          href="/setting"
          className={cn("flex w-full cursor-pointer items-center justify-between text-xl font-medium capitalize text-theme-text-secondary transition-colors duration-200", current === 'setting' && "text-theme-accent")}
        >
          <MdSettings className="icon" />
          <span>setting</span>
        </Link>
      </div>
      <span className="w-full text-center text-base text-theme-accent">eooooostudio@gmail.com</span>
    </div>
  );
};

export default SideBar;
