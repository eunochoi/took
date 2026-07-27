'use client';

import NextTopLoader from 'nextjs-toploader';
import { useEffect, useState } from 'react';

import { useSettingsContext } from '@/common/providers/settings/useSettingsContext';
import { THEME_VALUE } from '@/common/types/setting';

export default function TopLoader() {
  const { theme } = useSettingsContext();
  const [isMounted, setIsMounted] = useState(false);
  const accentColor = THEME_VALUE[theme.themeName].accent;

  // nextjs-toploader가 window 쓰는데 SSR엔 없어서 클라이언트에서만 마운트
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <NextTopLoader
      color={accentColor}
      height={3}
      showSpinner={false}
      crawlSpeed={200}
      speed={200}
      easing="ease"
      zIndex={99999}
    />
  );
}
