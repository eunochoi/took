'use client';

import { ErrorPage } from "@/common/components/ui/ErrorPage";
import { ERROR_PAGE_PRESETS } from "@/common/components/ui/ErrorPage/presets";

// 전역 404 페이지입니다.
// 존재하지 않는 URL에 접근하거나 notFound()가 호출되면 표시됩니다.
export default function NotFound() {
  return (
    <ErrorPage
      {...ERROR_PAGE_PRESETS.notFound}
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
