'use client';

import { FontType } from '@/common/types/setting';
import { useEffect } from 'react';

export const useApplyFontType = (fontType: FontType) => {
  useEffect(() => {
    document.body.classList.remove('font-type2', 'font-type3');

    if (fontType === 'type2') {
      document.body.classList.add('font-type2');
    } else if (fontType === 'type3') {
      document.body.classList.add('font-type3');
    }
  }, [fontType]);
};
