'use client';

import { useCurrentUser } from '@/common/hooks/useCurrentUser';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useAuthRoute() {
  const router = useRouter();

  const { data: user, isLoading, isError, error } = useCurrentUser({
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    retry: (failureCount) => {
      return failureCount < 2;
    },
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (!isLoading && isError) {
      console.error("🚨 인증되지 않은 사용자, 로그인 페이지로 리다이렉트합니다.", error);
      router.replace('/login');
    }
  }, [isLoading, isError, router, error]);

  return { user, isLoading };
}
