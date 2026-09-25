'use client';

import { deleteCurrentUser } from '@/common/actions/user';
import { authAction } from '@/common/auth/authAction';
import DocCard from '@/common/components/ui/Doc/DocCard';
import SocialLoginButton from '@/common/components/ui/SocialLoginButton';
import { LOGIN_PROVIDERS } from '@/common/constants/loginProviders';
import { useCurrentUser } from '@/common/hooks/useCurrentUser';
import { signIn, signOut } from 'next-auth/react';
import { useState } from 'react';

const DELETE_CONFIRM_TEXT = '회원탈퇴';
const sectionClass = 'flex min-h-[320px] flex-col items-center justify-center gap-5 px-5 py-10 text-center tablet:min-h-[340px] tablet:px-8';
const descriptionClass = 'flex w-full max-w-[560px] flex-col text-center text-sm leading-relaxed text-theme-text-secondary tablet:text-base';

const AccountDeletionSection = () => {
  const { data: user, isPending } = useCurrentUser({
    redirectOnAuthError: false,
    refetchOnWindowFocus: 'always',
    staleTime: 0,
    gcTime: 0,
    retry: 1,
  });
  const [confirmText, setConfirmText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const isDeleteDisabled = confirmText !== DELETE_CONFIRM_TEXT || isProcessing;

  const onDeleteAccount = async () => {
    if (!user || isDeleteDisabled) return;

    setErrorMessage('');
    setIsProcessing(true);

    try {
      await authAction(deleteCurrentUser);
      localStorage.removeItem(`took:${user.email}:setting`);
      await signOut({ redirect: false });
      window.location.replace('/login');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : '회원 탈퇴에 실패했습니다. 잠시 후 다시 시도해주세요.');
      setIsProcessing(false);
    }
  };

  const onLogin = async () => {
    if (isProcessing) return;

    setErrorMessage('');
    setIsProcessing(true);

    try {
      const provider = LOGIN_PROVIDERS.google;
      await signIn(provider.id, { callbackUrl: '/account-deletion' }, provider.signInOptions);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : '로그인을 시작하지 못했습니다. 잠시 후 다시 시도해주세요.');
      setIsProcessing(false);
    }
  };

  return (
    <DocCard className={sectionClass}>
      {isPending ? (
        <p className="py-5 text-sm text-theme-text-secondary">로그인 상태를 확인하고 있습니다.</p>
      ) : user ? (
        <>
          <div className="w-full">
            <span className="block text-lg text-theme-text-tertiary">현재 계정</span>
            <span className="mt-1 block break-all text-base font-medium text-theme-text-primary">{user.email}</span>
          </div>
          <p className={descriptionClass}>
            <span>회원 탈퇴 시 계정과 데이터가 삭제되며 복구할 수 없습니다.</span>
            <span>
              계속하려면 아래에 <strong className="text-theme-text-primary">{DELETE_CONFIRM_TEXT}</strong>를 입력해주세요.
            </span>
          </p>
          <input
            aria-label="회원 탈퇴 확인 문구"
            autoComplete="off"
            className="h-11 w-full max-w-[520px] border-b border-theme-border bg-transparent px-4 text-center text-base outline-none focus-visible:border-theme-accent placeholder:text-theme-text-tertiary"
            disabled={isProcessing}
            onChange={(event) => {
              setConfirmText(event.target.value);
              setErrorMessage('');
            }}
            placeholder={DELETE_CONFIRM_TEXT}
            type="text"
            value={confirmText}
          />
          <button
            className="rounded-full bg-theme-danger px-5 py-2 text-base text-theme-text-on-accent shadow-theme-action disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isDeleteDisabled}
            onClick={onDeleteAccount}
            type="button"
          >
            {isProcessing ? '탈퇴 처리 중' : '회원 탈퇴'}
          </button>
        </>
      ) : (
        <>
          <div className="flex w-full max-w-[560px] flex-col items-center gap-2">
            <h2 className="text-lg font-semibold text-theme-text-primary">본인 확인이 필요합니다.</h2>
            <p className={descriptionClass}>
              <span>계정을 만들 때 사용한 계정으로 로그인해주세요.</span>
              <span>로그인 후 회원 탈퇴 확인 절차를 진행합니다.</span>
            </p>
          </div>
          <SocialLoginButton
            disabled={isProcessing}
            label={isProcessing ? '로그인 이동 중' : undefined}
            onClick={onLogin}
            provider="google"
          />
        </>
      )}

      {errorMessage ? <p role="alert" className="text-sm font-medium text-theme-danger">{errorMessage}</p> : null}
    </DocCard>
  );
};

export default AccountDeletionSection;
