'use client';

import { ErrorPage } from "@/common/components/ui/ErrorPage";

// 404
export default function NotFound() {
  return (
    <ErrorPage
      title="404 Error"
      description="요청하신 페이지를 찾을 수 없습니다."
      buttons={[
        {
          label: '홈으로',
          onClick: () => window.location.href = '/home',
          variant: 'primary',
        },
      ]}
    />
  );
}
