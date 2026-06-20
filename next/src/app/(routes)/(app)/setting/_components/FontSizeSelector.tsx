'use client';

import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import styled from "styled-components";

import { FONT_SIZE_LIST } from "@/common/utils/settingsContext/SettingsContext";
import { useSettingsContext } from "@/common/utils/settingsContext/useSettingsContext";

export const FontSizeSelector = () => {
  const { fontSize, setFontSize } = useSettingsContext();

  const currentIndex = FONT_SIZE_LIST.indexOf(fontSize);

  const decrease = () => {
    if (currentIndex > 0) {
      setFontSize(FONT_SIZE_LIST[currentIndex - 1]);
    }
  };

  const increase = () => {
    if (currentIndex < FONT_SIZE_LIST.length - 1) {
      setFontSize(FONT_SIZE_LIST[currentIndex + 1]);
    }
  };

  return (
    <Wrapper>
      <ArrowButton onClick={decrease} disabled={currentIndex === 0}>
        <MdChevronLeft />
      </ArrowButton>
      <SizeDisplay>{fontSize}</SizeDisplay>
      <ArrowButton onClick={increase} disabled={currentIndex === FONT_SIZE_LIST.length - 1}>
        <MdChevronRight />
      </ArrowButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const SizeDisplay = styled.span`
  min-width: 48px;
  text-align: center;
  font-size: ${(props) => props.theme.fontSize ?? '15pt'};
  color: rgb(var(--greyTitle));
`;

const ArrowButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 24px;
  color: rgb(var(--greyTitle));
  
  &:disabled {
    opacity: 0.3;
  }
`;
