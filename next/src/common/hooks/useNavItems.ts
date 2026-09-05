'use client';

import { useSelectedLayoutSegment } from "next/navigation";
import { MdCalendarMonth, MdCheckBox, MdHome, MdSettings, MdViewList } from 'react-icons/md';


export const useNavItems = () => {
  const current = useSelectedLayoutSegment();

  const items = [
    { key: 'home', segment: 'home', icon: MdHome, label: 'home', href: '/home' },
    { key: 'calendar', segment: 'calendar', icon: MdCalendarMonth, label: 'calendar', href: '/calendar' },
    { key: 'diaryList', segment: 'diary', icon: MdViewList, label: 'diaries', href: '/diary' },
    { key: 'habit', segment: 'habit', icon: MdCheckBox, label: 'habit', href: '/habit' },
    // { key: 'badHabit', segment: 'badHabit', icon: MdCheckBox, label: 'badHabit', href: '/badHabit' },
    { key: 'setting', segment: 'setting', icon: MdSettings, label: 'setting', href: '/setting' },
  ];

  return { items, current };
};
