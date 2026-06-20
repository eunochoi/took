'use client'


import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useRef } from "react";
import Devtools from "./Devtools";

type Props = {
  children: React.ReactNode;
};

/**
 * [Client] reactQuery provider component
 * QueryClient는 useRef로 한 번만 생성. App Router/parallel routes 리렌더 시 새로 만들면 캐시가 날아가서 invalidate/refetch가 소용없어짐
 */
function RQProvider({ children }: Props) {
  const queryClientRef = useRef<QueryClient | null>(null);
  if (queryClientRef.current == null) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: true,
          retryOnMount: true,
          refetchOnReconnect: true,
          retry: false,
        },
      },
    });
  }
  const queryClient = queryClientRef.current;

  return (
    <QueryClientProvider client={queryClient}>
      <Devtools />
      {children}
    </QueryClientProvider>
  );
}

export default RQProvider;