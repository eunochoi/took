'use client';

import { AUTH_ERROR_CODE } from '@/common/auth/types';
import { useCurrentUser } from '@/common/hooks/useCurrentUser';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useAuthRoute() {
  const router = useRouter();

  const { data: user, isLoading, isError, error, refetch } = useCurrentUser({
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    retry: (failureCount, queryError) => {
      return queryError.code !== AUTH_ERROR_CODE.needLogin && failureCount < 2;
    },
    refetchOnWindowFocus: true,
    redirectOnAuthError: false,
  });

  useEffect(() => {
    if (!isLoading && isError && error?.code === AUTH_ERROR_CODE.needLogin) {
      console.error("🚨 인증되지 않은 사용자, 로그인 페이지로 리다이렉트합니다.", error);
      router.replace('/login');
    }
  }, [isLoading, isError, router, error]);

  return { user, isLoading, isError, error, refetch };
}
