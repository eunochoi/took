'use client';

import { DehydratedState, HydrationBoundary } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { useAutoCloseSnackbar } from "../hooks/useAutoCloseSnackbar";
import ServiceWorkerRegister from "../utils/ServiceWorkerRegister";
import RQProvider from "./reactQuery/ReactQueryProvider";
import CustomSnackbarProvider from "./snackbar/CustomSnackbarProvider";

interface Props {
  children: ReactNode;
  dehydratedState?: DehydratedState | null;
}

/**
 * 전역 Provider 모음
 * - SessionProvider: 인증 (next-auth)
 * - RQProvider: React Query 상태 관리
 * - CustomSnackbarProvider: 토스트 알림
 * - HydrationBoundary: 서버 데이터 hydration
 * - ServiceWorkerRegister: PWA service worker 등록
 */
export const GlobalProviders = ({ children, dehydratedState }: Props) => {
  useAutoCloseSnackbar();

  return (
    <SessionProvider>
      <RQProvider>
        <CustomSnackbarProvider>
          <HydrationBoundary state={dehydratedState}>
            <ServiceWorkerRegister />
            {children}
          </HydrationBoundary>
        </CustomSnackbarProvider>
      </RQProvider>
    </SessionProvider>
  );
};
