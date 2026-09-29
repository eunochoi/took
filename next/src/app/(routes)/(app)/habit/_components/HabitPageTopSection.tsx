import AppPageTitle from '@/common/components/layout/AppPageTitle';
import { TopSectionCatClass, TopSectionCatSize } from '@/common/constants/TopSectionCat';
import Image from 'next/image';
import habitCat from '/public/img/hiding-cat/hiding-cat-habit.png';

const HabitPageTopSection = () => {
  return (
    <section>
      <AppPageTitle title="습관 만들기" description="작은 실천으로 만들어가는 나의 일상" />
      <Image priority src={habitCat} alt="습관을 체크한 노트를 든 고양이" sizes={TopSectionCatSize} className={TopSectionCatClass} />
    </section>
  );
};

export default HabitPageTopSection;
