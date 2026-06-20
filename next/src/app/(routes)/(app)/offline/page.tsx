'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import { ErrorPage } from '@/common/components/ui/ErrorPage';

// 오프라인 페이지 (PWA)
// 온라인 복구되면 자동으로 홈 이동
export default function OfflinePage() {
  const router = useRouter();
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const onOnline = () => {
      router.push('/home');
    }

    window.addEventListener('online', onOnline);
    return () => {
      window.removeEventListener('online', onOnline);
    };
  }, [router])

  return (
    <ErrorPage
      title="오프라인"
      description="인터넷 연결 상태를 확인해주세요."
      buttons={[]}
    />
  );
}
