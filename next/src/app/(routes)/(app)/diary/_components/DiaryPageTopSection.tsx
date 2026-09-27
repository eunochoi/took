import AppPageTitle from '@/common/components/layout/AppPageTitle';
import Image from 'next/image';
import diaryCat from '/public/img/hiding-cat-diary.png';

const DiaryPageTopSection = () => {
  return (
    <section>
      <AppPageTitle title="일기 목록" description="차곡차곡 쌓이는 나의 하루" />
      <Image priority src={diaryCat} alt="일기장을 든 고양이" sizes="(min-width: 1024px) 40vw, (min-width: 480px) calc(50vw - 36px), 68vw" className="ml-auto block w-3/4 tablet:w-1/2 desktop:w-1/2" />
    </section>
  );
};

export default DiaryPageTopSection;
