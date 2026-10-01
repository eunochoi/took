import AppPageTitle from '@/common/components/layout/AppPageTitle';
import { TopSectionCatClass, TopSectionCatSize } from '@/common/constants/TopSectionCat';
import Image from 'next/image';
import diaryCat from '/public/img/hiding-cat/hiding-cat-diary.png';

const DiaryPageTopSection = () => {
  return (
    <>
      <section className="px-[5dvw] pt-[5dvw] tablet:px-9 tablet:pt-6 desktop:px-14">
        <AppPageTitle title="일기 목록" description="차곡차곡 쌓이는 나의 하루" />
      </section>
      <Image priority src={diaryCat} alt="일기장을 든 고양이" sizes={TopSectionCatSize} className={TopSectionCatClass} />
    </>
  );
};

export default DiaryPageTopSection;
