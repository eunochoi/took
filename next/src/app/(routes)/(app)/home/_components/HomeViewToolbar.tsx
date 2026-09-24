'use client';

import { MdCalendarMonth } from "react-icons/md";

import ToolbarButton from "@/common/components/ui/ToolbarButton";

interface Props {
  selectedYear: number;
  openYearFilter: () => void;
}

const HomeViewToolbar = ({ selectedYear, openYearFilter }: Props) => {
  return (
    <ToolbarButton onClick={openYearFilter}>
      <MdCalendarMonth size={18} className="shrink-0" aria-hidden="true" />
      {selectedYear}년
    </ToolbarButton>
  );
};

export default HomeViewToolbar;
