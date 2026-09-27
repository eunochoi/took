import AppPageTitle from '@/common/components/layout/AppPageTitle';
import Image from 'next/image';
import hidingCat from '/public/img/hiding-cat.png';

const CalendarPageTopSection = () => {
  return (
    <section>
      <AppPageTitle title="월간 기록" description="하루하루 쌓인 마음과 습관을 살펴봐요" />
      <Image priority src={hidingCat} alt="hiding-cat" sizes="(min-width: 1024px) 40vw, (min-width: 480px) calc(50vw - 36px), 68vw" className="ml-auto block w-3/4 tablet:w-1/2 desktop:w-1/2" />
    </section>
  );
};

export default CalendarPageTopSection;
