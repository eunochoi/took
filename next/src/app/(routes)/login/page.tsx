'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { logout } from "@/common/auth/logout";
import Logo from '@/common/components/ui/Logo';
import { useCurrentUser } from "@/common/hooks/useCurrentUser";
import LoginButton from "./_components/LoginButton";
import StartButton from "./_components/StartButton";

const Page = () => {
  const router = useRouter();

  const { data: user, isSuccess } = useCurrentUser({
    redirectOnAuthError: false,
    refetchOnWindowFocus: "always",
    staleTime: 0,
    gcTime: 0,
    retry: 1,
  });


  useEffect(() => {
    router.prefetch('/home');
    router.prefetch('/calendar');
    router.prefetch('/list');
    router.prefetch('/habit');
    router.prefetch('/setting');
  }, [router]);

  return (
    <div className="flex h-[100dvh] w-[100dvw] flex-col items-center justify-center gap-12 bg-[#f3f7fc] p-5 [@media(max-height:600px)]:flex-row [@media(max-height:600px)]:p-10">
      <div className="flex animate-[login-fade-in_1000ms_ease-in-out] flex-col items-center gap-8 [@media(max-height:600px)]:shrink-0 [@media(max-height:600px)]:justify-center [@media(max-height:600px)]:gap-4">
        <Logo size={48} />
      </div>
      <div className="flex animate-[login-fade-in_1000ms_ease-in-out] flex-col items-center gap-8 [@media(max-height:600px)]:shrink-0 [@media(max-height:600px)]:justify-center [@media(max-height:600px)]:gap-6">
        <div className="flex flex-col items-center gap-4 text-center [@media(max-height:600px)]:w-full [@media(max-height:600px)]:gap-3">
          <h1 className="m-0 text-center font-bmjua text-2xl capitalize leading-[1.3] text-grey-title">툭! 오늘도 하나씩 :)</h1>
          <p className="m-0 flex flex-col gap-0.5 break-words text-center text-base leading-[1.3] text-grey-title opacity-85">
            <span className="block">완벽한 하루가 아니어도 좋습니다.</span>
            <span className="block">습관 발자국 하나만 남겨도 충분해요.</span>
          </p>
        </div>
        {isSuccess ? (
          <>
            <StartButton provider={user.provider as 'google' | 'naver' | 'kakao'} email={user.email} />
            <button className="text-base text-grey-title" onClick={logout} type="button">로그아웃</button>
          </>
        ) : (
          <LoginButton provider='google' />
        )}
      </div>
    </div>
  );
};

export default Page;
