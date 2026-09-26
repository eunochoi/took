'use client'

import { ReactNode, useEffect, useState } from "react";

import ResponsiveAppLayout from "@/common/components/layout/ResponsiveAppLayout";
import LoadingScreen from "@/common/components/ui/LoadingScreen";
import { useAuthRoute } from "@/common/hooks/useAuthRoute";
import { AppProviders } from "@/common/providers/AppProviders";

interface Props {
  children: ReactNode;
  panel: ReactNode;
}

const AppLayout = ({ children, panel }: Props) => {
  const { user, isLoading } = useAuthRoute();

  const [isMinimumLoading, setIsMinimumLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMinimumLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // 실제 로딩 중이면 로딩 화면, 최소 로딩 시간 1200ms
  if (isLoading || isMinimumLoading) {
    return <LoadingScreen />;
  }
  // 비로그인이면 리다이렉트됨 (useAuthRoute에서 처리)
  if (!user) {
    return <LoadingScreen showLogo={false} />;
  }

  return (
    <AppProviders>
      <ResponsiveAppLayout>
        {panel}
        {children}
      </ResponsiveAppLayout>
    </AppProviders>
  );
}

export default AppLayout;
