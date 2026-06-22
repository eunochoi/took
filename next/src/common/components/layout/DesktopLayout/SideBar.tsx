import { getTodayString } from "@/common/functions/getTodayString";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import Logo from '@/common/components/ui/Logo';
import { MdCalendarMonth, MdCheckBox, MdHome, MdSettings, MdViewList } from 'react-icons/md';

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

const SideBar = () => {
  const current = useSelectedLayoutSegment();

  return (
    <div className="fixed left-0 top-0 z-[100] flex h-[100dvh] w-[var(--sidebarWidth)] flex-col items-center justify-evenly gap-16 overflow-y-scroll bg-white/80 px-4 shadow-[2px_0_20px_rgba(0,0,0,0.04)] backdrop-blur-xl">
      <div className="flex flex-col items-start">
        <Logo size={36} />
      </div>
      <div className="flex h-auto w-[70%] flex-col items-start justify-center gap-6">
        <Link
          href="/home"
          className={cx("flex w-full cursor-pointer items-center justify-between text-[22px] font-medium capitalize text-gray-500 transition-colors duration-[180ms]", current === 'home' && "text-theme")}
        >
          <MdHome className="icon" />
          <span>home</span>
        </Link>
        <Link
          href={`/calendar?date=${getTodayString()}`}
          className={cx("flex w-full cursor-pointer items-center justify-between text-[22px] font-medium capitalize text-gray-500 transition-colors duration-[180ms]", current === 'calendar' && "text-theme")}
        >
          <MdCalendarMonth className="icon" />
          <span>calendar</span>
        </Link>
        <Link
          href="/list"
          className={cx("flex w-full cursor-pointer items-center justify-between text-[22px] font-medium capitalize text-gray-500 transition-colors duration-[180ms]", current === 'list' && "text-theme")}
        >
          <MdViewList className="icon" />
          <span>list</span>
        </Link>
        <Link
          href="/habit"
          className={cx("flex w-full cursor-pointer items-center justify-between text-[22px] font-medium capitalize text-gray-500 transition-colors duration-[180ms]", current === 'habit' && "text-theme")}
        >
          <MdCheckBox className="icon" />
          <span>habit</span>
        </Link>
        <Link
          href="/setting"
          className={cx("flex w-full cursor-pointer items-center justify-between text-[22px] font-medium capitalize text-gray-500 transition-colors duration-[180ms]", current === 'setting' && "text-theme")}
        >
          <MdSettings className="icon" />
          <span>setting</span>
        </Link>
      </div>
      <span className="w-full text-center text-base text-theme">eooooostudio@gmail.com</span>
    </div>
  );
};

export default SideBar;
