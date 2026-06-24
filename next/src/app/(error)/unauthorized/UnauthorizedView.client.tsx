'use client';

import { ErrorPage } from '@/common/components/ui/ErrorPage';
import { ERROR_PAGE_PRESETS } from '@/common/components/ui/ErrorPage/presets';
import { useRouter, useSearchParams } from "next/navigation";

// NextAuth 인증 실패 후 /unauthorized로 이동했을 때 표시되는 공개 에러 화면입니다.
// query string의 message가 있으면 provider 충돌 등 상세 인증 실패 사유를 보여줍니다.
const UnauthorizedView = () => {
  const router = useRouter();
  const params = useSearchParams();
  const message = params.get('message');

  return (
    <ErrorPage
      title={ERROR_PAGE_PRESETS.unauthorized.title}
      description={message || ERROR_PAGE_PRESETS.unauthorized.description}
      buttons={[
        {
          label: '로그인하기',
          onClick: () => router.push('/login'),
          variant: 'primary',
        },
      ]}
    />
  );
};

export default UnauthorizedView;
