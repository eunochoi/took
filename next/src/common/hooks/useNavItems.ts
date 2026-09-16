'use client';

import { useSelectedLayoutSegment } from "next/navigation";
import { MdCalendarMonth, MdCheckBox, MdHome, MdSettings, MdViewList } from 'react-icons/md';


export const useNavItems = () => {
  const current = useSelectedLayoutSegment();

  const items = [
    { key: 'home', segment: 'home', icon: MdHome, label: '홈', href: '/home' },
    { key: 'calendar', segment: 'calendar', icon: MdCalendarMonth, label: '캘린더', href: '/calendar' },
    { key: 'diaryList', segment: 'diary', icon: MdViewList, label: '다이어리', href: '/diary' },
    { key: 'habit', segment: 'habit', icon: MdCheckBox, label: '습관', href: '/habit' },
    // { key: 'badHabit', segment: 'badHabit', icon: MdCheckBox, label: 'badHabit', href: '/badHabit' },
    { key: 'setting', segment: 'setting', icon: MdSettings, label: '설정', href: '/setting' },
  ];

  return { items, current };
};
