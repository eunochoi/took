'use client';

import { cn } from "@/common/utils/cn";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { logout as logoutService } from "@/common/auth/logout";
import Logo from '@/common/components/ui/Logo';
import { useCurrentUser } from "@/common/hooks/useCurrentUser";
import google from '/public/img/loginIcon/google.png';
import kakao from '/public/img/loginIcon/kakao.png';
import naver from '/public/img/loginIcon/naver.png';

const Page = () => {
  const router = useRouter();

  const { data: user, isSuccess } = useCurrentUser({
    refetchOnWindowFocus: "always",
    staleTime: 0,
    gcTime: 0,
    retry: 1,
  });

  const logout = () => {
    logoutService();
  };

  useEffect(() => {
    router.prefetch('/home');
    router.prefetch('/calendar');
    router.prefetch('/list');
    router.prefetch('/habit');
    router.prefetch('/setting');
  }, [router]);

  const options = { callbackUrl: '/login' };

  const loginProviders = [
    { id: 'google', name: '구글로 로그인', icon: google, signInOptions: { prompt: 'consent' } },
    { id: 'kakao', name: '카카오로 로그인', icon: kakao, signInOptions: { prompt: 'select_account' } },
    { id: 'naver', name: '네이버로 로그인', icon: naver, signInOptions: {} },
  ];

  const providerIcons: Record<string, typeof google> = {
    google,
    kakao,
    naver,
  };

  const providerButtonClass = (provider?: string) => cn(
    "flex h-[42px] max-w-[90dvw] items-center justify-start overflow-x-scroll rounded-[42px] px-7 text-base lowercase shadow-[0_2px_8px_rgba(0,0,0,0.06)] min-[1025px]:h-12 [&>span]:ml-2 [&>span]:whitespace-nowrap",
    provider === 'kakao' && "bg-[#fae100] text-[#39181D]",
    provider === 'naver' && "bg-[#02c73c] text-white",
    (!provider || provider === 'google') && "bg-white text-grey-title",
  );

  const loginButtonClass = (provider: string) => cn(
    "flex h-12 w-12 items-center justify-center rounded-full p-0 shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-[transform,box-shadow] duration-200 hover:scale-105 hover:shadow-[0_2px_12px_rgba(0,0,0,0.1)] active:scale-95 min-[1025px]:h-14 min-[1025px]:w-14",
    provider === 'google' && "bg-white",
    provider === 'kakao' && "bg-[#fee500]",
    provider === 'naver' && "bg-[#03c75a]",
  );

  return (
    <div className="flex h-[100dvh] w-[100dvw] flex-col items-center justify-center gap-12 bg-[#f3f7fc] p-5 [@media(max-height:600px)]:flex-row [@media(max-height:600px)]:p-10 [@media(orientation:landscape)_and_(max-height:600px)]:flex-row [@media(orientation:landscape)_and_(max-height:600px)]:p-10 [@media(min-width:1025px)_and_(max-height:600px)]:p-[60px]">
      <div className="flex animate-[login-fade-in_1000ms_ease-in-out] flex-col items-center gap-8 [@media(max-height:600px)]:shrink-0 [@media(max-height:600px)]:justify-center [@media(max-height:600px)]:gap-4 min-[1025px]:gap-10">
        <Logo size={48} />
      </div>
      <div className="flex animate-[login-fade-in_1000ms_ease-in-out] flex-col items-center gap-8 [@media(max-height:600px)]:shrink-0 [@media(max-height:600px)]:justify-center [@media(max-height:600px)]:gap-6 min-[1025px]:gap-10">
        <div className="flex flex-col items-center gap-4 text-center [@media(max-height:600px)]:w-full [@media(max-height:600px)]:gap-3 min-[1025px]:gap-5">
          <h1 className="m-0 text-center font-bmjua text-2xl capitalize leading-[1.3] text-grey-title min-[480px]:text-[26px] min-[1025px]:text-[32px]">툭! 오늘도 하나씩 :)</h1>
          <p className="m-0 flex flex-col gap-0.5 break-words text-center text-base leading-[1.3] text-grey-title opacity-85 min-[480px]:gap-[3px] min-[1025px]:gap-1 min-[1025px]:text-lg">
            <span className="block">완벽한 하루가 아니어도 좋습니다.</span>
            <span className="block">발자국 하나만 남겨도 충분해요.</span>
          </p>
        </div>
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center [@media(max-height:600px)]:w-full">
            <Link href="/home" className={providerButtonClass(user?.provider)}>
              {user?.provider && (
                <Image
                  src={providerIcons[user.provider]}
                  alt={user.provider}
                  width={24}
                  height={24}
                />
              )}
              <span>{user?.email}</span>
            </Link>
            <button className="text-base text-grey-title" onClick={logout} type="button">다른 SNS 계정 선택</button>
          </div>
        ) : (
          <div className="flex flex-row items-center justify-center gap-4 [@media(max-height:600px)]:w-full min-[1025px]:gap-5">
            {loginProviders.map((provider) => (
              <button
                key={provider.id}
                className={loginButtonClass(provider.id)}
                onClick={() => signIn(provider.id as 'google' | 'kakao' | 'naver', options, provider.signInOptions)}
                type="button"
              >
                <Image className="h-7 w-7 shrink-0 object-contain min-[1025px]:h-8 min-[1025px]:w-8" src={provider.icon} alt={provider.id} width={24} height={24} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
