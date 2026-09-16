'use client';

import TodayRecordSection from "./TodayRecordSection";

const GreetingSection = ({ initialDate }: { initialDate: string }) => (
  <section className="flex min-w-0 flex-col gap-5">
    <TodayRecordSection initialDate={initialDate} />
  </section>
);

export default GreetingSection;
