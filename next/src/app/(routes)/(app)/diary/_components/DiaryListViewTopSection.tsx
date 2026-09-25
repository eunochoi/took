import AppPageTitle from '@/common/components/layout/AppPageTitle';
import Image from 'next/image';
import bottomCat from '/public/img/bottom-cat.png';

const DiaryListViewTopSection = () => {
  return (
    <section>
      <AppPageTitle title="일기 목록" description="차곡차곡 쌓이는 나의 하루" />
      <Image src={bottomCat} alt="bottom-cat" className="ml-auto block w-3/4 tablet:w-1/2 desktop:w-1/2" />
    </section>
  );
};

export default DiaryListViewTopSection;
