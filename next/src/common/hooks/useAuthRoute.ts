'use client';

import { AuthRequiredError } from '@/common/auth/authAction';
import { useCurrentUser } from '@/common/hooks/useCurrentUser';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useAuthRoute() {
  const router = useRouter();

  const { data: user, isLoading, isError, error, refetch } = useCurrentUser({
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    retry: (failureCount, queryError) => {
      return !(queryError instanceof AuthRequiredError) && failureCount < 2;
    },
    refetchOnWindowFocus: true,
    redirectOnAuthError: false,
  });

  useEffect(() => {
    if (!isLoading && isError && error instanceof AuthRequiredError) {
      console.error("🚨 인증되지 않은 사용자, 로그인 페이지로 리다이렉트합니다.", error);
      router.replace('/login');
    }
  }, [isLoading, isError, router, error]);

  return { user, isLoading, isError, error, refetch };
}
