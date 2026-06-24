'use client';

import { useEffect } from 'react';
import { ErrorPage } from '@/common/components/ui/ErrorPage';
import { ERROR_PAGE_PRESETS } from '@/common/components/ui/ErrorPage/presets';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

// 로그인 후 앱 영역의 error boundary입니다.
// (routes)/(app) 하위 화면 렌더링 중 예외가 발생하면 표시됩니다.
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <ErrorPage
      {...ERROR_PAGE_PRESETS.appError}
      buttons={[
        {
          label: '다시 시도',
          onClick: reset,
          variant: 'primary',
        },
        {
          label: '홈으로',
          onClick: () => window.location.href = '/home',
          variant: 'secondary',
        },
      ]}
    />
  );
}
