'use client';

import { useSelectedLayoutSegment } from "next/navigation";
import { MdCalendarMonth, MdCheckBox, MdHome, MdSettings, MdViewList } from 'react-icons/md';

const NAV_ITEMS = [
  { key: 'home', segment: 'home', icon: MdHome, label: '홈', href: '/home' },
  { key: 'calendar', segment: 'calendar', icon: MdCalendarMonth, label: '월간 기록', href: '/calendar' },
  { key: 'diaryList', segment: 'diary', icon: MdViewList, label: '일기 목록', href: '/diary' },
  { key: 'habit', segment: 'habit', icon: MdCheckBox, label: '습관 만들기', href: '/habit' },
  { key: 'setting', segment: 'setting', icon: MdSettings, label: '설정', href: '/setting' },
];

export const useNavItems = () => {
  const current = useSelectedLayoutSegment();

  return { items: NAV_ITEMS, current };
};
