import { APP_PAGE_CONTENT_PADDING_CLASS_NAME } from '@/common/components/layout/AppPageLayout';
import AppPageTitle from '@/common/components/layout/AppPageTitle';
import Image from 'next/image';
import bottomCat from '/public/img/bottom-cat.png';

const DiaryListViewTopArea = () => {
  return (
    <div className={`bg-theme-accent-light ${APP_PAGE_CONTENT_PADDING_CLASS_NAME}`}>
      <AppPageTitle title="일기 목록" description="차곡차곡 쌓이는 나의 하루" />
      <Image src={bottomCat} alt="bottom-cat" className="ml-auto mt-auto block w-full tablet:w-2/3 desktop:w-2/3" />
    </div>
  );
};

export default DiaryListViewTopArea;
