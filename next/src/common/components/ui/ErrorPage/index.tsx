import { EMOTIONS } from '@/common/constants/emotions';
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

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

export const ErrorPage = ({ title, description, buttons = [] }: ErrorPageProps) => {
  return (
    <div className="flex h-[100dvh] w-[100dvw] flex-col items-center justify-center gap-4 bg-theme-bg text-[#585858]">
      <div className="flex items-center justify-center text-8xl leading-none [&_img]:brightness-110 min-[1025px]:text-[128px]">
        <Image
          src={EMOTIONS[6].src}
          alt={EMOTIONS[6].nameKr}
          width={128}
          height={128}
          priority
        />
      </div>
      <h2 className="mb-2 mt-4 text-center text-2xl min-[1025px]:text-[32px]">{title}</h2>
      <div className="max-w-[80%] px-5 text-center text-base text-[#525252] [&_p]:m-0 [&_p]:leading-normal min-[1025px]:text-lg">
        {typeof description === 'string' ? <p>{description}</p> : description}
      </div>
      {buttons.length > 0 && (
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {buttons.map((button, index) => (
            <button
              key={index}
              className={cx(
                "cursor-pointer rounded-3xl px-6 py-2.5 text-base transition-opacity hover:opacity-80 min-[1025px]:text-lg",
                (button.variant || 'primary') === 'primary'
                  ? "bg-[#585858] text-white"
                  : "border border-[#585858] bg-white text-[#585858]",
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
  );
};
