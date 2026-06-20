'use client'

import { getTodayString } from "@/common/functions/getTodayString";
import { useSelectedLayoutSegment } from "next/navigation";
import { MdCalendarMonth, MdCheckBox, MdHome, MdSettings, MdViewList } from 'react-icons/md';

export const useNavItems = () => {
  const current = useSelectedLayoutSegment();

  const items = [
    { key: 'home', icon: MdHome, label: 'home', href: '/home' },
    { key: 'calendar', icon: MdCalendarMonth, label: 'calendar', href: `/calendar?date=${getTodayString()}` },
    { key: 'list', icon: MdViewList, label: 'list', href: '/list' },
    { key: 'habit', icon: MdCheckBox, label: 'habit', href: '/habit' },
    { key: 'setting', icon: MdSettings, label: 'setting', href: '/setting' },
  ];

  return { items, current };
};
