'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FiBookOpen, FiCheckCircle, FiHeart } from "react-icons/fi";

import { logout } from "@/common/auth/logout";
import Wordmark from '@/common/components/ui/Wordmark';
import { EMOTIONS } from "@/common/constants/emotions";
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
    router.prefetch('/diary');
    router.prefetch('/habit');
    router.prefetch('/setting');
  }, [router]);

  return (
    <main className="h-[100dvh] w-full overflow-y-auto bg-theme-bg font-title text-theme-text-primary [&_*]:!font-title">
      <div className="grid min-h-full desktop:grid-cols-[1.35fr_1fr]">
        <section
          aria-labelledby="login-intro-title"
          className="flex flex-col bg-gradient-to-br from-theme-bg to-theme-accent/15 px-6 py-16 tablet:px-10 desktop:px-12 desktop:py-10 xl:px-20">
          <Wordmark className="text-[48px]" />

          <div className="mt-10 desktop:mt-16">
            <h1 id="login-intro-title" className="text-[30px] font-bold leading-[1.35] tracking-[-0.04em] tablet:text-[38px] xl:text-[46px]">
              오늘의 작은 실천이<br />
              내일의 나를 만듭니다.
            </h1>
            <p className="mt-4 max-w-[420px] text-[15px] leading-relaxed tracking-[-0.02em] text-theme-text-secondary desktop:mt-5 desktop:text-base">
              습관과 감정을 기록하며,<br className="desktop:hidden" /> 나만의 속도로 쌓아가는 하루.
            </p>
          </div>
          <div aria-hidden="true" className="flex items-center gap-3 mt-4">
            {[EMOTIONS[0], EMOTIONS[6], EMOTIONS[3]].map((emotion) => (
              <Image key={emotion.id} src={emotion.src} alt="" width={64} height={64} />
            ))}
          </div>
          <p className="mt-6 hidden text-sm tracking-[-0.02em] text-theme-text-secondary desktop:block">
            완벽하지 않아도 괜찮아요. 오늘도, 조금 더 나답게.
          </p>
        </section>

        <section
          aria-labelledby="login-title"
          className="flex flex-col items-center bg-theme-surface px-6 py-16">
          <div className="flex w-full max-w-[340px] flex-1 flex-col items-center justify-center">
            <div className="text-center desktop:mt-10">
              <h2 id="login-title" className="text-[24px] font-bold leading-tight tracking-[-0.035em] desktop:text-[28px]">
                {isSuccess ? '다시 만나서 반가워요' : '나의 하루를 시작해요'}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-theme-text-secondary desktop:mt-4 desktop:text-base">
                작은 기록이 모여,<br />
                더 좋은 나를 만들어 갈 거예요.
              </p>
            </div>

            <div className="mt-7 flex w-full flex-col items-center gap-4 desktop:mt-10">
              {isSuccess ? (
                <StartButton provider={user.provider as 'google' | 'naver' | 'kakao'} email={user.email} />
              ) : (
                <LoginButton provider='google' />
              )}
              <div className="flex h-7 shrink-0 items-center justify-center">
                {isSuccess && (
                  <button className="h-full px-3 text-sm text-theme-text-secondary" onClick={logout} type="button">로그아웃</button>
                )}
              </div>
            </div>

            <div className="my-7 flex w-full items-center gap-4 desktop:my-9">
              <span className="h-px flex-1 bg-theme-border-muted" />
              <span className="text-xs text-theme-text-tertiary">나만의 하루를 한곳에</span>
              <span className="h-px flex-1 bg-theme-border-muted" />
            </div>

            <ul className="grid w-full grid-cols-3 gap-3 text-center">
              {[
                { label: '습관', description: '작은 실천을', detail: '꾸준히 쌓아요.', icon: FiCheckCircle },
                { label: '일기', description: '오늘의 감정을', detail: '기록해요.', icon: FiBookOpen },
                { label: '돌아보기', description: '기록 속 생활 흐름을', detail: '이해해요.', icon: FiHeart },
              ].map(({ label, description, detail, icon: Icon }) => (
                <li key={label} className="flex flex-col items-center rounded-2xl bg-theme-bg/60 px-2 py-4 desktop:py-5">
                  <Icon aria-hidden="true" className="mb-3 h-5 w-5 text-theme-accent" />
                  <span className="text-sm font-semibold">{label}</span>
                  <p className="mt-2 text-[11px] leading-relaxed text-theme-text-secondary tablet:text-xs">
                    {description}<br />{detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-8 text-center text-xs tracking-[-0.01em] text-theme-text-tertiary desktop:mt-12">
            오늘도, 조금 더 나다운 나에게.
          </p>
        </section>
      </div>
    </main>
  );
};

export default Page;
