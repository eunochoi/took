import AppPageTitle from '@/common/components/layout/AppPageTitle';
import Image from 'next/image';
import sunCat from '/public/img/hiding-cat-calendar-sun.png';
import moonCat from '/public/img/hiding-cat-calendar.png';

const CalendarPageTopSection = () => {
  return (
    <section>
      <AppPageTitle title="월간 기록" description="하루하루 쌓인 마음과 습관을 살펴봐요" />
      <Image priority src={sunCat} alt="해가 뜬 고양이" sizes="(min-width: 1024px) 40vw, (min-width: 480px) calc(50vw - 36px), 68vw" className="calendar-top-cat-light ml-auto w-3/4 tablet:w-1/3 desktop:w-1/3" />
      <Image priority src={moonCat} alt="달과 별이 뜬 고양이" sizes="(min-width: 1024px) 40vw, (min-width: 480px) calc(50vw - 36px), 68vw" className="calendar-top-cat-dark ml-auto w-3/4 tablet:w-1/3 desktop:w-1/3" />
    </section>
  );
};

export default CalendarPageTopSection;
