import AppPageLayout from '@/common/components/layout/AppPageLayout';
import { getTodayStringInUserTimezone } from '@/common/utils/date/userTimezone';
import HomePageSkeleton from './_components/HomePageSkeleton';
import HomePageTopSection from './_components/HomePageTopSection';

const HomeLoading = async () => {
  const initialDate = await getTodayStringInUserTimezone();

  return (
    <AppPageLayout
      topSection={<HomePageTopSection initialDate={initialDate} loading />}
      mainSection={<HomePageSkeleton />}
    />
  );
};

export default HomeLoading;
