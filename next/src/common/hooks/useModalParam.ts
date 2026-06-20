'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const MODAL_PARAM = 'modal';

export type ModalFilterKey = 'year-filter' | 'month-filter' | 'emotion-filter';

export function useModalParam(modalKey: ModalFilterKey) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isOpen = searchParams.get(MODAL_PARAM) === modalKey;

  const open = () => {
    const params = new URLSearchParams(searchParams);
    params.set(MODAL_PARAM, modalKey);
    router.push(`${pathname}?${params.toString()}`);
  };

  // 인자 있으면 그 쿼리로 replace (확인 시). 없으면 현재 URL에서 modal만 빼고 replace
  const close = (queryParams?: URLSearchParams) => {
    if (queryParams !== undefined) {
      const query = queryParams.toString();
      router.replace(query ? `${pathname}?${query}` : pathname);
      return;
    }
    const params = new URLSearchParams(searchParams);
    params.delete(MODAL_PARAM);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  return { isOpen, open, close };
}
