import { Overlay } from "@/common/components/ui/Overlay";
import { getDefaultYear, MONTH_UNSELECTED } from "@/common/constants/filterDefaults";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdRefresh } from 'react-icons/md';
import styled from "styled-components";
import MonthSelector from "./MonthSelector";

interface Props {
  contentRef: React.MutableRefObject<HTMLDivElement | null>;
  isOpen: boolean;
  onClose: (params?: URLSearchParams) => void;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMonth: (d: number) => void;
}

const MonthFilter = ({
  contentRef,
  isOpen,
  onClose,
  setSelectedYear,
  setSelectedMonth,
}: Props) => {
  const searchParams = useSearchParams();

  const [tempYear, setTempYear] = useState<number>(getDefaultYear());
  const [tempMonth, setTempMonth] = useState<number>(MONTH_UNSELECTED);

  const year = searchParams.get('year');
  const month = searchParams.get('month');

  useEffect(() => {
    if (isOpen) {
      if (year) setTempYear(Number(year));
      else setTempYear(getDefaultYear());
      if (month) setTempMonth(Number(month));
      else setTempMonth(MONTH_UNSELECTED);
    }
  }, [isOpen, year, month]);

  const onSubmit = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('modal');

    if (tempYear !== getDefaultYear()) params.set('year', tempYear.toString());
    else params.delete('year');
    if (tempMonth !== MONTH_UNSELECTED) params.set('month', tempMonth.toString());
    else params.delete('month');

    setSelectedYear(tempYear);
    setSelectedMonth(tempMonth);
    onClose(params);

    setTimeout(() => {
      contentRef?.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, 200);
  };

  const onInitialize = () => {
    setTempYear(getDefaultYear());
    setTempMonth(MONTH_UNSELECTED);
  };

  return (
    <Overlay isOpen={isOpen} onClose={() => onClose()}>
      <Wrapper
        onClick={(e) => e.stopPropagation()}
        className={isOpen ? 'open' : ''}
      >
        <SectionTitle>기간 선택</SectionTitle>
        <MonthCard>
          <MonthWrapper>
            <MonthSelector
              selectedYear={tempYear}
              setSelectedYear={setTempYear}
              selectedMonth={tempMonth}
              setSelectedMonth={setTempMonth}
            />
          </MonthWrapper>
        </MonthCard>
        <InitButton onClick={onInitialize}>
          <MdRefresh />초기화
        </InitButton>
        <ButtonWrapper>
          <Button className="cancel" onClick={() => onClose()}>취소</Button>
          <Button onClick={onSubmit}>확인</Button>
        </ButtonWrapper>
      </Wrapper>
    </Overlay>
  );
};

export default MonthFilter;

const Wrapper = styled.div`
  overflow: hidden;
  position: fixed;
  top: var(--mobileHeader);
  top: -3px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-shrink: 0;
  background-color: color-mix(in srgb, var(--theme-bg, #f5f5fa) 95%, transparent);
  backdrop-filter: blur(24px);

  @media (max-width: 479px) {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    width: 100%;
    max-height: calc(100dvh - var(--mobileHeader));
    min-height: 400px;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 24px;
    padding-top: calc(var(--mobileHeader) + 24px);
    padding-bottom: 24px;
    gap: 20px;

    will-change: height;
    transform: scaleY(0);
    transform-origin: top;

    border-end-start-radius: 28px;
    border-end-end-radius: 28px;

    transition: transform 0.3s ease-in-out;
    &.open {
      transform: scaleY(1);
    }
  }
  @media (orientation: landscape) and (max-height: 600px) {
    max-height: calc(100dvh - 20px);
    overflow-y: auto;
    justify-content: flex-start;
    padding: 20px 24px;
    padding-top: calc(var(--mobileHeader) + 20px);
    gap: 16px;
  }
  @media (min-width: 480px) and (max-width: 1024px) {
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
    z-index: 999;
    top: 50dvh;
    left: 50dvw;
    transform: translate(-50%, -50%);

    gap: 16px;
    padding: 24px 28px;
    width: 400px;
    max-height: 80dvh;
    border-radius: 28px;

    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s linear, visibility 0.3s linear;

    &.open {
      opacity: 1;
      visibility: visible;
    }
  }
  @media (min-width: 480px) and (max-width: 1024px) and (orientation: landscape) and (max-height: 600px) {
    max-height: calc(100dvh - 20px);
    overflow-y: auto;
    justify-content: flex-start;
    top: 10px;
    transform: translate(-50%, 0);
    padding: 16px 20px;
    gap: 12px;
  }
  @media (min-width: 1025px) {
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
    top: 50dvh;
    left: 50dvw;
    transform: translate(-50%, -50%);

    width: 450px;
    max-height: 80dvh;
    gap: 24px;
    padding: 32px 40px;
    border-radius: 28px;

    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s linear, visibility 0.3s linear;

    &.open {
      opacity: 1;
      visibility: visible;
    }
  }
  @media (min-width: 1025px) and (orientation: landscape) and (max-height: 600px) {
    max-height: calc(100dvh - 20px);
    overflow-y: auto;
    justify-content: flex-start;
    top: 10px;
    transform: translate(-50%, 0);
    padding: 32px 28px;
    gap: 20px;
  }
`;

const SectionTitle = styled.span`
  line-height: 100%;
  font-size: 18px;
  font-weight: 600;
  color: rgb(var(--greyTitle));
  margin-bottom: 12px;
  display: block;
  text-align: center;
`;

const MonthCard = styled.div`
  width: 100%;
  padding: 16px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
`;

const MonthWrapper = styled.div`
  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Button = styled.button`
  flex-shrink: 0;
  font-size: 16px;
  padding: 6px 20px;
  border-radius: 14px;
  background-color: ${(props) =>
    props.theme.themeColor ? props.theme.themeColor : '#979FC7'};
  color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);

  &.cancel {
    background-color: rgba(255, 255, 255, 0.9);
    color: rgb(var(--greyTitle));
  }

  @media (min-width: 480px) and (max-width: 1024px) {
    font-size: 14px;
    padding: 4px 16px;
  }
`;

const InitButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  color: ${(props) =>
    props.theme.themeColor ? props.theme.themeColor : '#979FC7'};
`;
