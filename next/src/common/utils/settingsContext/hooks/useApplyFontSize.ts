'use client';

import { useEffect } from 'react';

export const useApplyFontSize = (fontSize: string) => {
  useEffect(() => {
    document.documentElement.style.setProperty('--app-font-size', fontSize);
  }, [fontSize]);
};
