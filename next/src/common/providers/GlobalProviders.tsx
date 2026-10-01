'use client';

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { NoticeHost } from "../components/ui/Notice/NoticeHost";
import { SystemBars } from '../components/layout/SystemBars';
import RQProvider from "./reactQuery/ReactQueryProvider";

interface Props {
  children: ReactNode;
}

/**
 * 전역 Provider 모음
 * - SessionProvider: 인증 (next-auth)
 * - RQProvider: React Query 상태 관리
 * - NoticeHost: 한 번에 하나의 알림 표시
 */
export const GlobalProviders = ({ children }: Props) => {
  return (
    <SessionProvider>
      <RQProvider>
        <NoticeHost />
        <SystemBars />
        {children}
      </RQProvider>
    </SessionProvider>
  );
};
