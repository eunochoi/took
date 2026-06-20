'use client';

import { useEffect, useState } from 'react';
import NextTopLoader from 'nextjs-toploader';

import { useSettingsContext } from '@/common/utils/settingsContext/useSettingsContext';

export default function TopLoader() {
  const { themeColor } = useSettingsContext();
  const [isMounted, setIsMounted] = useState(false);

  // nextjs-toploader가 window 쓰는데 SSR엔 없어서 클라이언트에서만 마운트
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <NextTopLoader
      color={themeColor}
      height={3}
      showSpinner={false}
      crawlSpeed={200}
      speed={200}
      easing="ease"
      zIndex={99999}
    />
  );
}
