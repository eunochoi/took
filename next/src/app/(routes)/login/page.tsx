'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FiBookOpen, FiCheckCircle, FiHeart } from "react-icons/fi";

import { logout } from "@/common/auth/logout";
import EmotionImage from "@/common/components/ui/EmotionImage";
import SocialLoginButton from '@/common/components/ui/SocialLoginButton';
import Wordmark from '@/common/components/ui/Wordmark';
import { EMOTIONS } from "@/common/constants/emotions";
import { LOGIN_PROVIDERS, type LoginProviderId } from '@/common/constants/loginProviders';
import { useCurrentUser } from "@/common/hooks/useCurrentUser";
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import bottomCat from '/public/img/bottom-cat.png';


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
    router.prefetch('/diary');
    router.prefetch('/habit');
    router.prefetch('/setting');
  }, [router]);

  return (
    <main className="static-theme-blue h-[100dvh] w-full overflow-y-auto bg-theme-accent-light font-title text-theme-text-primary">
      <div className="grid min-h-full desktop:grid-cols-[1.35fr_1fr]">
        <section
          aria-labelledby="login-intro-title"
          className="flex flex-col gap-12 bg-gradient-to-br from-theme-bg to-theme-accent/15 px-6 pt-16 pb-0 tablet:px-10 desktop:gap-24 desktop:px-12 desktop:pt-10 desktop:pb-0 xl:px-20">
          <Wordmark className="text-7xl" />

          <div className="flex flex-col gap-8">
            <h1 id="login-intro-title" className="flex flex-col gap-3 text-4xl desktop:text-5xl font-bold tracking-[-0.04em]">
              <span>오늘의 작은 실천이</span>
              <span>내일의 나를 만듭니다.</span>
            </h1>
            <div className="flex flex-col gap-1 text-lg desktop:text-2xl text-theme-text-secondary">
              <p>습관과 감정을 기록하며</p>
              <p>나만의 속도로 하루를 쌓아가요.</p>
            </div>
          </div>
          <Image src={bottomCat} alt="bottom-cat" className="ml-auto mt-auto block w-full tablet:w-2/3 desktop:w-full" />
        </section>

        <section
          aria-labelledby="login-title"
          className="flex flex-col items-center gap-10 bg-theme-surface px-6 py-16">
          <div className="flex w-full max-w-[340px] flex-1 flex-col items-center justify-center gap-9 desktop:gap-11">
            <div className="flex flex-col gap-3 text-center desktop:gap-4">
              <h2 id="login-title" className="text-[24px] font-bold leading-tight tracking-[-0.035em] desktop:text-[28px]">
                {isSuccess ? '다시 만나서 반가워요' : '나의 하루를 시작해요'}
              </h2>
              <p className="text-sm leading-relaxed text-theme-text-secondary desktop:text-base">
                작은 기록이 모여,<br />
                더 좋은 나를 만들어 갈 거예요.
              </p>
            </div>

            <div className="flex w-full flex-col items-center gap-4">
              {isSuccess ? (
                <SocialLoginButton
                  provider={user.provider as LoginProviderId}
                  email={user.email}
                  onClick={() => router.push('/home')}
                />
              ) : (
                <SocialLoginButton
                  provider="google"
                  onClick={() => signIn('google', { callbackUrl: '/login' }, LOGIN_PROVIDERS.google.signInOptions)}
                />
              )}
              {isSuccess && (
                <div className="flex h-7 shrink-0 items-center justify-center">
                  <button className="h-full px-3 text-sm text-theme-text-secondary" onClick={logout} type="button">로그아웃</button>
                </div>
              )}
            </div>

            <div className="flex w-full items-center gap-4">
              <span className="h-px flex-1 bg-theme-border-muted" />
              <span className="text-xs text-theme-text-tertiary">나만의 하루를 한곳에</span>
              <span className="h-px flex-1 bg-theme-border-muted" />
            </div>

            <ul className="grid w-full grid-cols-3 gap-3 text-center">
              {[
                { label: '습관', description: '작은 실천을 꾸준히 쌓아요.', icon: FiCheckCircle },
                { label: '일기', description: '오늘의 감정을 기록해요.', icon: FiBookOpen },
                { label: '돌아보기', description: '기록 속 생활 흐름을 이해해요.', icon: FiHeart },
              ].map(({ label, description, icon: Icon }) => (
                <li key={label} className="flex flex-col items-center gap-3 rounded-2xl bg-theme-bg/60 border-[1px] border-theme-accent/30 px-2 py-4 desktop:py-5">
                  <Icon aria-hidden="true" className="h-5 w-5 text-theme-accent" />
                  <span className="text-sm font-semibold">{label}</span>
                  <p className="text-balance break-keep text-[11px] leading-relaxed text-theme-text-secondary tablet:text-xs">
                    {description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div aria-hidden="true" className="flex items-center gap-3">
              {[EMOTIONS[0], EMOTIONS[6], EMOTIONS[3]].map((emotion) => (
                <EmotionImage key={emotion.id} emotion={emotion} alt="" width={64} height={64} />
              ))}
            </div>
            <p className="text-center text-xs tracking-[-0.01em] text-theme-text-tertiary">
              오늘도, 조금 더 나다운 나에게.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Page;
