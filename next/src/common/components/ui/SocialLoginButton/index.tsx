import { LOGIN_PROVIDERS, type LoginProviderId } from '@/common/constants/loginProviders';
import { cn } from '@/common/utils/cn';
import Image from 'next/image';
import type { ReactNode } from 'react';

interface Props {
  disabled?: boolean;
  email?: string;
  label?: ReactNode;
  onClick: () => void;
  provider: LoginProviderId;
}

const buttonClass = 'flex h-12 items-center justify-between gap-4 rounded-full border-[1px] border-theme-border px-4 disabled:cursor-not-allowed disabled:opacity-50';

const SocialLoginButton = ({ disabled = false, email, label, onClick, provider }: Props) => {
  const providerConfig = LOGIN_PROVIDERS[provider];

  return (
    <button
      className={cn(
        buttonClass,
        email ? 'w-auto min-w-60 max-w-[300px]' : 'w-60',
        providerConfig.bgColor,
      )}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <Image
        src={providerConfig.icon}
        width={24}
        height={24}
        alt={providerConfig.id}
      />
      <span className={cn('mr-1 min-w-0 text-base', email && 'flex-1 truncate', providerConfig.textColor)}>
        {email ?? label ?? providerConfig.content}
      </span>
      <span />
    </button>
  );
};

export default SocialLoginButton;
