import AppPageTitle from '@/common/components/layout/AppPageTitle';
import Image from 'next/image';
import bottomCat from '/public/img/bottom-cat.png';

const CalendarViewTopSection = () => {
  return (
    <section>
      <AppPageTitle title="월간 기록" description="하루하루 쌓인 마음과 습관을 살펴봐요" />
      <Image src={bottomCat} alt="bottom-cat" className="ml-auto block w-3/4 tablet:w-1/2 desktop:w-1/2" />
    </section>
  );
};

export default CalendarViewTopSection;
