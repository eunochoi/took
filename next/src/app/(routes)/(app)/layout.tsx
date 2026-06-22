'use client'

import { ReactNode, useEffect, useState } from "react";

import DesktopLayout from '@/common/components/layout/DesktopLayout';
import MobileLayout from '@/common/components/layout/MobileLayout';
import LoadingScreen from '@/common/components/ui/LoadingScreen';
import useIsMobile from "@/common/functions/useIsMobile";
import { useAuthRoute } from "@/common/hooks/useAuthRoute";
import { ScrollProvider } from "@/common/hooks/useScrollContext";

interface Props {
  children: ReactNode;
  modal: ReactNode;
}

const AppLayout = ({ children, modal }: Props) => {
  const isMobile = useIsMobile();
  const { user, isLoading } = useAuthRoute();

  const [isMinimumLoading, setIsMinimumLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMinimumLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // 실제 로딩 중이거나 모바일 체크 전이면 로딩 화면, 최소 로딩 시간 1200ms
  if (isLoading || isMobile === null || isMinimumLoading) {
    return <LoadingScreen />;
  }
  // 비로그인이면 리다이렉트됨 (useAuthRoute에서 처리)
  if (!user) {
    return <LoadingScreen showLogo={false} />;
  }

  const Layout = isMobile ? MobileLayout : DesktopLayout;

  return (
    <ScrollProvider>
      <Layout>
        {modal}
        {children}
      </Layout>
    </ScrollProvider>
  );
}

export default AppLayout;
