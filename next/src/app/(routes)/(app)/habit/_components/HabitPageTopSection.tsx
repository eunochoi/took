import AppPageTitle from '@/common/components/layout/AppPageTitle';
import { TopSectionCatClass, TopSectionCatSize } from '@/common/constants/TopSectionCat';
import Image from 'next/image';
import habitCat from '/public/img/hiding-cat/hiding-cat-habit.png';

const HabitPageTopSection = () => {
  return (
    <>
      <section className="px-[5dvw] pt-[5dvw] tablet:px-9 tablet:pt-6 desktop:px-14">
        <AppPageTitle title="습관 만들기" description="작은 실천으로 만들어가는 나의 일상" />
      </section>
      <Image priority src={habitCat} alt="습관을 체크한 노트를 든 고양이" sizes={TopSectionCatSize} className={TopSectionCatClass} />
    </>
  );
};

export default HabitPageTopSection;
