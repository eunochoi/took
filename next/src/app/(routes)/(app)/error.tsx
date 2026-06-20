'use client';

import { useEffect } from 'react';
import { ErrorPage } from '@/common/components/ui/ErrorPage';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

// React Error Boundary
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <ErrorPage
      title="문제가 발생했습니다"
      description={
        <>
          일시적인 오류가 발생했습니다.
          <br />
          잠시 후 다시 시도해주세요.
        </>
      }
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
