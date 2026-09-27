import AppPageTitle from '@/common/components/layout/AppPageTitle';
import Image from 'next/image';
import habitCat from '/public/img/hiding-cat-habit.png';

const HabitPageTopSection = () => {
  return (
    <section>
      <AppPageTitle title="습관 만들기" description="작은 실천으로 만들어가는 나의 일상" />
      <Image priority src={habitCat} alt="습관을 체크한 노트를 든 고양이" sizes="(min-width: 1024px) 40vw, (min-width: 480px) calc(50vw - 36px), 68vw" className="ml-auto mt-auto block w-3/4 tablet:w-1/3 desktop:w-1/3" />
    </section>
  );
};

export default HabitPageTopSection;
