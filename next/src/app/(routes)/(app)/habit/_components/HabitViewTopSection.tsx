import AppPageTitle from '@/common/components/layout/AppPageTitle';
import Image from 'next/image';
import bottomCat from '/public/img/bottom-cat.png';

const HabitViewTopSection = () => {
  return (
    <section>
      <AppPageTitle title="습관 만들기" description="작은 실천으로 만들어가는 나의 일상" />
      <Image src={bottomCat} alt="bottom-cat" sizes="(min-width: 1024px) 40vw, (min-width: 480px) calc(50vw - 36px), 68vw" className="ml-auto mt-auto block w-3/4 tablet:w-1/2 desktop:w-1/2" />
    </section>
  );
};

export default HabitViewTopSection;
