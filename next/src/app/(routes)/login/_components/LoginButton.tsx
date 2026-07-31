import { cn } from '@/common/utils/cn';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

import { LOGIN_PROVIDERS } from '../_constants';


interface LoginButtonProps {
  provider: 'google' | 'naver' | 'kakao',
}

const LoginButton = ({ provider }: LoginButtonProps) => {
  const options = { callbackUrl: '/login' };

  return <button
    key={LOGIN_PROVIDERS[provider].id + 'login'}
    className={cn("flex h-12 w-60 items-center justify-between gap-4 rounded-full border-2 border-theme-border px-4",
      LOGIN_PROVIDERS[provider].bgColor
    )}
    onClick={() => signIn(LOGIN_PROVIDERS[provider].id,
      options,
      LOGIN_PROVIDERS[provider].signInOptions)}
  >
    <Image
      src={LOGIN_PROVIDERS[provider].icon}
      width={24}
      height={24}
      alt={LOGIN_PROVIDERS[provider].id}
    />
    <span className={cn('text-base font-semibold mr-1', LOGIN_PROVIDERS[provider].textColor)}>
      {LOGIN_PROVIDERS[provider].content}
    </span>
    <span></span>
  </button>
}

export default LoginButton;
