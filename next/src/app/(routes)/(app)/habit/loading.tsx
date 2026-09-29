'use client';

import AppPageLayout from '@/common/components/layout/AppPageLayout';
import HabitPageSkeleton from './_components/HabitPageSkeleton';
import HabitPageTopSection from './_components/HabitPageTopSection';
import HabitPageToolbar from './_components/HabitPageToolbar';
import { useHabitSortPreferences } from './_hooks/useHabitSortPreferences';

const HabitLoading = () => {
  const { sortValue, priorityFirst, onToggleSort, onTogglePriorityFirst } = useHabitSortPreferences();

  return (
    <AppPageLayout
      topSection={<HabitPageTopSection />}
      toolbar={
        <HabitPageToolbar
          onToggle={onToggleSort}
          onTogglePriorityFirst={onTogglePriorityFirst}
          onAddHabit={() => {}}
          sortValue={sortValue}
          priorityFirst={priorityFirst}
          disabledAdd
        />
      }
      mainSection={<HabitPageSkeleton />}
    />
  );
};

export default HabitLoading;
