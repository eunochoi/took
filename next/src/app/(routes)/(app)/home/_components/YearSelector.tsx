'use client';

import { Overlay } from "@/common/components/ui/Overlay";
import { lightenColor } from "@/common/utils/lightenColor";
import styled from "styled-components";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  years: number[];
  selectedYear: number;
  onSelectYear: (year: number) => void;
}

const YearSelector = ({ isOpen, onClose, years, selectedYear, onSelectYear }: Props) => {
  return (
    <Overlay isOpen={isOpen} onClose={onClose}>
      <Wrapper onClick={(e) => e.stopPropagation()} className={isOpen ? 'open' : ''}>
        <Title>연도 선택</Title>
        <YearCard>
          <YearGrid>
            {years.map((year) => (
              <YearItem
                key={year}
                $selected={year === selectedYear}
                onClick={() => onSelectYear(year)}>
                {year}년
              </YearItem>
            ))}
          </YearGrid>
        </YearCard>
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </Wrapper>
    </Overlay>
  );
};

export default YearSelector;

const Wrapper = styled.div`
  overflow: hidden;
  position: fixed;
  top: -3px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background-color: color-mix(in srgb, var(--theme-bg, #f5f5fa) 95%, transparent);
  backdrop-filter: blur(24px);

  @media (max-width: 479px) {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    width: 100%;
    height: auto;
    max-height: 70dvh;
    padding: 36px 24px;
    padding-top: calc(var(--mobileHeader) + 24px);
    gap: 20px;

    will-change: transform;
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
    width: 320px;
    max-height: 60dvh;
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

    width: 400px;
    max-height: 60dvh;
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
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: rgb(var(--greyTitle));
  flex-shrink: 0;
`;

const YearCard = styled.div`
  width: 100%;
  padding: 16px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
`;

const YearGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 100%;
  overflow-y: auto;
  padding: 4px;

  @media (max-width: 479px) {
    max-height: calc(50dvh - 120px);
  }
  @media (max-width: 479px) and (orientation: landscape) and (max-height: 600px) {
    max-height: calc(100dvh - 200px);
  }
  @media (min-width: 480px) {
    max-height: 300px;
  }
  @media (min-width: 480px) and (orientation: landscape) and (max-height: 600px) {
    max-height: calc(100dvh - 180px);
  }
`;

const YearItem = styled.button<{ $selected: boolean }>`
  padding: 14px 8px;
  border-radius: 14px;
  font-size: 16px;
  font-weight: ${({ $selected }) => ($selected ? '600' : '400')};
  color: ${({ $selected }) => ($selected ? 'white' : 'rgb(var(--greyTitle))')};
  background-color: ${({ $selected, theme }) =>
    $selected
      ? (theme.themeColor ?? '#979FC7')
      : (theme.themeColor ? lightenColor(theme.themeColor, 60) : '#B8C4E8')};
  box-shadow: ${({ $selected }) => ($selected ? '0 2px 8px rgba(0,0,0,0.1)' : 'none')};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ $selected, theme }) =>
    $selected
      ? (theme.themeColor ?? '#979FC7')
      : (theme.themeColor ? lightenColor(theme.themeColor, 35) : '#C4CBE0')};
  }
`;

const CloseButton = styled.button`
  flex-shrink: 0;
  font-size: 16px;
  padding: 6px 20px;
  border-radius: 14px;
  background-color: ${(props) => props.theme.themeColor ? props.theme.themeColor : '#979FC7'};
  color: white;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);

  @media (min-width:480px) and (max-width:1024px) {
    font-size: 14px;
    padding: 4px 16px;
  }
`;
