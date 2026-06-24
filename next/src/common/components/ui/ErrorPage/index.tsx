import { EMOTIONS } from '@/common/constants/emotions';
import { cn } from '@/common/utils/cn';
import Image from 'next/image';
import { ReactNode } from 'react';

interface Button {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

interface ErrorPageProps {
  title: string;
  description: string | ReactNode;
  buttons?: Button[];
}

export const ErrorPage = ({ title, description, buttons = [] }: ErrorPageProps) => {
  return (
    <div className="flex h-[100dvh] w-[100dvw] items-center justify-center bg-theme-bg p-5 text-grey-title">
      <div className="flex w-full max-w-[420px] flex-col items-center gap-4 rounded-3xl bg-white/90 px-6 py-9 text-center shadow-[0_2px_12px_rgba(0,0,0,0.06)] backdrop-blur-xl">
        <div className="flex items-center justify-center leading-none">
          <Image
            className="h-24 w-24 brightness-110"
            src={EMOTIONS[6].src}
            alt={EMOTIONS[6].nameKr}
            width={128}
            height={128}
            priority
          />
        </div>
        <h2 className="m-0 font-bmjua text-[32px] text-grey-title">{title}</h2>
        <div className="text-base font-medium leading-normal text-gray-500">
          {typeof description === 'string' ? <p className="m-0 leading-normal">{description}</p> : description}
        </div>
        {buttons.length > 0 && (
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {buttons.map((button, index) => (
              <button
                key={index}
                className={cn(
                  "cursor-pointer rounded-[999px] px-5 py-2 text-sm font-medium shadow-card transition-opacity hover:opacity-80",
                  (button.variant || 'primary') === 'primary'
                    ? "bg-theme text-white"
                    : "bg-gray-100 text-gray-500",
                )}
                onClick={button.onClick}
                type="button"
              >
                {button.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
