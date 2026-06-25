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
    className={cn("flex justify-between items-center gap-4 w-auto min-w-60 max-w-[80dvw] h-12 px-4 rounded-full border-2",
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
    <span className={cn('text-base font-semibold mr-1 w-full overflow-scroll', LOGIN_PROVIDERS[provider].textColor)}>
      {email}
    </span>
    <span></span>
  </button>
}

export default StartButton;