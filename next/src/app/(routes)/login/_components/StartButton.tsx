import { cn } from '@/common/utils/cn';
import Image from 'next/image';

import { useRouter } from 'next/navigation';
import { LOGIN_PROVIDERS } from '../_constants';


interface StartButtonProps {
  provider: 'google' | 'naver' | 'kakao',
  email: string
}

const StartButton = ({ provider, email }: StartButtonProps) => {
  const router = useRouter();

  return <button
    key={LOGIN_PROVIDERS[provider].id + '-start'}
    className={cn("flex h-12 w-auto min-w-60 max-w-[300px] items-center justify-between gap-4 rounded-full border-2 border-theme-border px-4",
      LOGIN_PROVIDERS[provider].bgColor
    )}
    onClick={() => router.push('/home')}
  >
    <Image
      src={LOGIN_PROVIDERS[provider].icon}
      width={24}
      height={24}
      alt={LOGIN_PROVIDERS[provider].id}
    />
    <span className={cn('text-base mr-1 w-full truncate', LOGIN_PROVIDERS[provider].textColor)}>
      {email}
    </span>
    <span></span>
  </button>
}

export default StartButton;
