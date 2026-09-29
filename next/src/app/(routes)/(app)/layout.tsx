'use client'

import { ReactNode, useEffect, useState } from "react";

import { AuthRequiredError } from "@/common/auth/authAction";
import ResponsiveAppLayout from "@/common/components/layout/ResponsiveAppLayout";
import LoadingScreen from "@/common/components/ui/LoadingScreen";
import { useAuthRoute } from "@/common/hooks/useAuthRoute";
import { AppProviders } from "@/common/providers/AppProviders";

interface Props {
  children: ReactNode;
  panel: ReactNode;
}

const AppLayout = ({ children, panel }: Props) => {
  const { user, isLoading, isError, error, refetch } = useAuthRoute();

  const [isMinimumLoading, setIsMinimumLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMinimumLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading || isMinimumLoading) {
    return <LoadingScreen />;
  }
  if (isError && !user && !(error instanceof AuthRequiredError)) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-theme-bg p-5 text-theme-text-primary">
        <div className="rounded-theme bg-theme-surface px-6 py-8 text-center shadow-theme-floating">
          <p>네트워크 연결을 확인해주세요</p>
          <button type="button" className="mt-4 text-theme-accent" onClick={() => { void refetch(); }}>
            다시 시도
          </button>
        </div>
      </div>
    );
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
