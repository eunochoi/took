import AppPageTitle from '@/common/components/layout/AppPageTitle';
import { TopSectionCatClass, TopSectionCatSize } from '@/common/constants/TopSectionCat';
import Image from 'next/image';
import diaryCat from '/public/img/hiding-cat-diary.png';

const DiaryPageTopSection = () => {
  return (
    <section>
      <AppPageTitle title="일기 목록" description="차곡차곡 쌓이는 나의 하루" />
      <Image priority src={diaryCat} alt="일기장을 든 고양이" sizes={TopSectionCatSize} className={TopSectionCatClass} />
    </section>
  );
};

export default DiaryPageTopSection;
