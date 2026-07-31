'use client'

import { getTodayString } from "@/common/functions/getTodayString";
import { useSelectedLayoutSegment } from "next/navigation";
import { MdCalendarMonth, MdCheckBox, MdHome, MdSettings, MdViewList } from 'react-icons/md';

export const useNavItems = () => {
  const current = useSelectedLayoutSegment();

  const items = [
    { key: 'home', segment: 'home', icon: MdHome, label: 'home', href: '/home' },
    { key: 'calendar', segment: 'calendar', icon: MdCalendarMonth, label: 'calendar', href: `/calendar?date=${getTodayString()}` },
    { key: 'diaryList', segment: 'diary', icon: MdViewList, label: 'diary list', href: '/diary' },
    { key: 'habit', segment: 'habit', icon: MdCheckBox, label: 'habit', href: '/habit' },
    { key: 'setting', segment: 'setting', icon: MdSettings, label: 'setting', href: '/setting' },
  ];

  return { items, current };
};
