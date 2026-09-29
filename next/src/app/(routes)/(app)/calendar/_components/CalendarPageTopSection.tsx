import AppPageTitle from '@/common/components/layout/AppPageTitle';
import { TopSectionCatClass, TopSectionCatSize } from '@/common/constants/TopSectionCat';
import Image from 'next/image';
import calendarCat from '/public/img/hiding-cat/hiding-cat-calendar.png';

const CalendarPageTopSection = () => {
  return (
    <section>
      <AppPageTitle title="월간 기록" description="하루하루 쌓인 마음과 습관을 살펴봐요" />
      <Image priority src={calendarCat} alt="달력을 든 고양이" sizes={TopSectionCatSize} className={TopSectionCatClass} />
    </section>
  );
};

export default CalendarPageTopSection;
