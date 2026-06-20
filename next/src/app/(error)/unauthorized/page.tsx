'use client';

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { ErrorPage } from '@/common/components/ui/ErrorPage';

const Page = () => {
  const router = useRouter();
  const params = useSearchParams();
  const message = params.get('message');

  return (
    <Suspense>
      <ErrorPage
        title="인증 실패"
        description={message || '인증에 실패했습니다. 다시 로그인해주세요.'}
        buttons={[
          {
            label: '로그인하기',
            onClick: () => router.push('/login'),
            variant: 'primary',
          },
        ]}
      />
    </Suspense>
  );
}

export default Page;