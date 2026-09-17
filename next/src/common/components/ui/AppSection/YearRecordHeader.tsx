import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { AppSectionHeader, AppSectionMeta, AppSectionTitle } from './section';

interface Props {
  year: number;
  onPreviousYear: () => void;
  onCurrentYear: () => void;
  onNextYear: () => void;
}

export const YearRecordHeader = ({ year, onPreviousYear, onCurrentYear, onNextYear }: Props) => {
  return (
    <AppSectionHeader className="!gap-1 !py-0">
      <AppSectionTitle className="shrink-0 !text-lg">연도별 기록</AppSectionTitle>
      <div className="flex shrink-0 items-center text-theme-accent">
        <button type="button" onClick={onPreviousYear} aria-label="이전 연도" className="flex h-9 w-8 items-center justify-center">
          <MdKeyboardArrowLeft size={22} />
        </button>
        <button type="button" onClick={onCurrentYear} aria-label={`${year}년, 올해로 이동`} className="px-1 py-2">
          <AppSectionMeta>{year}년</AppSectionMeta>
        </button>
        <button type="button" onClick={onNextYear} aria-label="다음 연도" className="flex h-9 w-8 items-center justify-center">
          <MdKeyboardArrowRight size={22} />
        </button>
      </div>
    </AppSectionHeader>
  );
};
