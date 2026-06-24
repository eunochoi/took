'use client';

import { DehydratedState, HydrationBoundary } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import OfflineScreen from "../components/ui/OfflineScreen";
import { useAutoCloseSnackbar } from "../hooks/useAutoCloseSnackbar";
import { ServiceWorkerRegister } from "../utils/ServiceWorker/ServiceWorkerRegister";
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
 * - OfflineScreen: 오프라인 상태 화면
 */
export const GlobalProviders = ({ children, dehydratedState }: Props) => {
  useAutoCloseSnackbar();

  return (
    <SessionProvider>
      <RQProvider>
        <CustomSnackbarProvider>
          <HydrationBoundary state={dehydratedState}>
            <ServiceWorkerRegister />
            <OfflineScreen />
            {children}
          </HydrationBoundary>
        </CustomSnackbarProvider>
      </RQProvider>
    </SessionProvider>
  );
};
