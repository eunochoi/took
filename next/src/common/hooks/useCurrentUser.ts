'use client';

import { useQuery } from '@tanstack/react-query';

import { authAction } from '@/common/auth/authAction';
import { getCurrentUser, type CurrentUser } from '@/common/actions/user';

type CurrentUserQueryOptions = {
  staleTime?: number;
  gcTime?: number;
  retry?: number | false | ((failureCount: number, error: Error) => boolean);
  refetchOnWindowFocus?: boolean | 'always';
};

// 현재 로그인한 유저 정보를 가져옴
export const useCurrentUser = (options: CurrentUserQueryOptions = {}) => {
  const queryOptions = {
    queryKey: ['user'],
    queryFn: () => authAction(getCurrentUser),
    ...options,
  };

  const currentUserQuery = useQuery<CurrentUser, Error>(queryOptions);

  return currentUserQuery;
};
