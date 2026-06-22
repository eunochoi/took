'use client';

import { DehydratedState, HydrationBoundary } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import TopLoader from "../components/ui/TopLoader";
import { useAutoCloseSnackbar } from "../hooks/useAutoCloseSnackbar";
import RQProvider from "./reactQueryProvider";
import ServiceWorkerRegister from "./ServiceWorkerRegister";
import { SettingsProvider } from "./settingsContext/SettingsProvider";
import CustomSnackbarProvider from "./snackBar/CustomSnackbarProvider";
import { TimezoneSync } from "./TimezoneSync";

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
 * - SettingsProvider: 테마/폰트 설정
 * - TopLoader: 페이지 전환 시 상단 로딩바 (테마색 적용)
 * - TimezoneSync: 브라우저 시간대로 동기화
 */
export const RootProviders = ({ children, dehydratedState }: Props) => {
  useAutoCloseSnackbar();

  return (
    <SessionProvider>
      <RQProvider>
        <CustomSnackbarProvider>
          <HydrationBoundary state={dehydratedState}>
            <SettingsProvider>
              <TimezoneSync />
              <TopLoader />
              <ServiceWorkerRegister />
              {children}
            </SettingsProvider>
          </HydrationBoundary>
        </CustomSnackbarProvider>
      </RQProvider>
    </SessionProvider>
  );
};
