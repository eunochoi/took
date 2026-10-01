import AppPageTitle from '@/common/components/layout/AppPageTitle';
import { TopSectionCatClass, TopSectionCatSize } from '@/common/constants/TopSectionCat';
import Image from 'next/image';
import calendarCat from '/public/img/hiding-cat/hiding-cat-calendar.png';

const CalendarPageTopSection = () => {
  return (
    <>
      <section className="px-[5dvw] pt-[5dvw] tablet:px-9 tablet:pt-6 desktop:px-14">
        <AppPageTitle title="월간 기록" description="하루하루 쌓인 마음과 습관을 살펴봐요" />
      </section>
      <Image priority src={calendarCat} alt="달력을 든 고양이" sizes={TopSectionCatSize} className={TopSectionCatClass} />
    </>
  );
};

export default CalendarPageTopSection;
