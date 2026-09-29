import AppPageLayout from '@/common/components/layout/AppPageLayout';
import CalendarPageSkeleton from './_components/CalendarPageSkeleton';
import CalendarPageTopSection from './_components/CalendarPageTopSection';

const CalendarLoading = () => (
  <AppPageLayout
    topSection={<CalendarPageTopSection />}
    bottomSafeClassName="desktop:hidden"
    mainSection={<CalendarPageSkeleton />}
  />
);

export default CalendarLoading;
