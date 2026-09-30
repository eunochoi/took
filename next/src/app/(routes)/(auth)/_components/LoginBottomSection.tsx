'use client';

import { AUTH_ERROR_CODE } from '@/common/auth/types';
import EmotionImage from '@/common/components/ui/EmotionImage';
import SocialLoginButton from '@/common/components/ui/SocialLoginButton';
import { EMOTIONS } from '@/common/constants/emotions';
import { LOGIN_PROVIDERS } from '@/common/constants/loginProviders';
import { useCurrentUser } from '@/common/hooks/useCurrentUser';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FiBookOpen, FiCheckCircle, FiHeart } from 'react-icons/fi';

const LoginBottomSection = () => {
  const router = useRouter();
  const { data: user, isSuccess, isPending, isFetching, error, refetch } = useCurrentUser({
    redirectOnAuthError: false,
    refetchOnWindowFocus: 'always',
    staleTime: 0,
    gcTime: 0,
    retry: (failureCount, queryError) => queryError.code !== AUTH_ERROR_CODE.needLogin && failureCount < 1,
  });

  useEffect(() => {
    if (isSuccess && user && !isFetching) {
      router.replace('/home');
    }
  }, [isSuccess, user, isFetching, router]);

  const isCheckingAuth = isPending || isFetching || isSuccess;
  const needsLogin = error?.code === AUTH_ERROR_CODE.needLogin;

  return (
    <section
      aria-labelledby="login-title"
      className="flex flex-col items-center gap-10 bg-theme-surface px-6 py-16">
      <div className="flex w-full max-w-[340px] flex-1 flex-col items-center justify-center gap-9 desktop:gap-11">
        <div className="flex flex-col gap-3 text-center desktop:gap-4">
          <h2 id="login-title" className="text-[24px] font-bold leading-tight tracking-[-0.035em] desktop:text-[28px]">
            나의 하루를 시작해요
          </h2>
          <p className="text-sm leading-relaxed text-theme-text-secondary desktop:text-base">
            작은 기록이 모여,<br />
            더 좋은 나를 만들어 갈 거예요.
          </p>
        </div>

        <div className="flex w-full flex-col items-center gap-4">
          {isCheckingAuth ? (
            <p role="status" className="min-w-60 text-center text-sm text-theme-accent bg-theme-accent-light px-6 py-3 border-[1px] border-theme-accent/30 rounded-full">
              {isSuccess && !isFetching ? '홈 화면으로 이동...' : '로그인 상태 확인...'}
            </p>
          ) : needsLogin ? (
            <SocialLoginButton
              provider="google"
              onClick={() => signIn('google', { callbackUrl: '/home' }, LOGIN_PROVIDERS.google.signInOptions)}
            />
          ) : (
            <div className="flex flex-col items-center gap-3 text-center">
              <p role="alert" className="text-sm text-theme-text-secondary">
                로그인 상태를 확인하지 못했어요. 잠시 후 다시 시도해주세요.
              </p>
              <button className="px-3 py-2 text-sm text-theme-accent" onClick={() => { void refetch(); }} type="button">
                다시 시도
              </button>
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
  );
};

export default LoginBottomSection;
