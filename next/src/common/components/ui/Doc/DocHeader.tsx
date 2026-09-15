'use client';

import Logo from '@/common/components/ui/Logo';
import { useRouter } from 'next/navigation';
import { MdArrowBackIos } from 'react-icons/md';

interface Props {
  description?: string;
  subtitle: string;
  title: string;
}

const headerClass = 'relative mb-1 flex flex-col items-center gap-5 rounded-theme bg-theme-surface px-5 py-10 text-center shadow-card tablet:mb-2 tablet:px-8 tablet:py-12';
const backButtonClass = 'absolute left-5 top-5 flex items-center justify-center text-xl text-theme-accent';

const DocHeader = ({ description, subtitle, title }: Props) => {
  const router = useRouter();

  return (
    <header className={headerClass}>
      <button
        aria-label="이전 페이지로 돌아가기"
        className={backButtonClass}
        onClick={() => router.back()}
        type="button"
      >
        <MdArrowBackIos />
      </button>
      <Logo logoClassName="w-60 h-auto" />
      <div className="flex flex-col gap-3">
        <h1 className="m-0 break-keep text-3xl leading-tight text-theme-text-primary tablet:text-4xl">{title}</h1>
        <p className="m-0 text-base font-bold text-theme-accent">{subtitle}</p>
      </div>
      {description ? (
        <p className="m-0 max-w-[520px] text-sm leading-relaxed text-theme-text-secondary tablet:text-base">{description}</p>
      ) : null}
    </header>
  );
};

export default DocHeader;
