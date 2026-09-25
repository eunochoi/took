import { APP_PAGE_CONTENT_PADDING_CLASS_NAME } from '@/common/components/layout/AppPageLayout';
import AppPageTitle from '@/common/components/layout/AppPageTitle';
import { GRADIENT_CLASS } from '@/common/constants/pageStyle';
import Image from 'next/image';
import bottomCat from '/public/img/bottom-cat.png';

const HabitViewTopArea = () => {
  return (
    <div className={`${GRADIENT_CLASS} ${APP_PAGE_CONTENT_PADDING_CLASS_NAME}`}>
      <AppPageTitle title="습관 만들기" description="작은 실천으로 만들어가는 나의 일상" />
      <Image src={bottomCat} alt="bottom-cat" className="ml-auto mt-auto block w-full tablet:w-1/2 desktop:w-1/2" />
    </div>
  );
};

export default HabitViewTopArea;
