'use client';

import { FontSize } from '@/common/types/setting';
import { useEffect } from 'react';

export const useApplyFontSize = (fontSize: FontSize) => {
  useEffect(() => {
    document.documentElement.style.setProperty('--app-font-size', fontSize);
  }, [fontSize]);
};
