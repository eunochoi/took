import { TOP_SECTION_WRAPPER_CLASS } from '@/common/components/layout/AppPageLayout';
import Wordmark from '@/common/components/ui/Wordmark';
import Image from 'next/image';
import bottomCat from '/public/img/bottom-cat.png';

const LoginTopSection = () => (
  <section
    aria-labelledby="login-intro-title"
    className={`${TOP_SECTION_WRAPPER_CLASS} flex flex-col gap-10 px-6 pt-12 pb-0 tablet:px-10 desktop:gap-24 desktop:px-12 desktop:pt-10 desktop:pb-0 xl:px-20`}>
    <Wordmark className="text-6xl desktop:text-7xl" />

    <div className="flex flex-col gap-6">
      <h1 id="login-intro-title" className="flex flex-col gap-3 text-3xl desktop:text-4xl font-bold tracking-[-0.04em]">
        <span>오늘의 작은 실천이</span>
        <span>내일의 나를 만듭니다.</span>
      </h1>
      <div className="flex flex-col gap-1 text-lg desktop:text-2xl text-theme-text-secondary">
        <p>습관과 감정을 기록하며</p>
        <p>나만의 속도로 하루를 쌓아가요.</p>
      </div>
    </div>
    <Image src={bottomCat} alt="bottom-cat" className="ml-auto mt-auto block w-3/4 tablet:w-2/3 desktop:w-full" />
  </section>
);

export default LoginTopSection;
