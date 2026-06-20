'use client';

import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import styled from "styled-components";

import { FONT_TYPE_LIST } from "@/common/utils/settingsContext/SettingsContext";
import { useSettingsContext } from "@/common/utils/settingsContext/useSettingsContext";

export const FontTypeSelector = () => {
  const { fontType, setFontType } = useSettingsContext();

  const currentIndex = FONT_TYPE_LIST.indexOf(fontType);

  const decrease = () => {
    if (currentIndex > 0) {
      setFontType(FONT_TYPE_LIST[currentIndex - 1]);
    }
  };

  const increase = () => {
    if (currentIndex < FONT_TYPE_LIST.length - 1) {
      setFontType(FONT_TYPE_LIST[currentIndex + 1]);
    }
  };

  const displayName = fontType === 'type1' ? '타입1' : fontType === 'type2' ? '타입2' : '타입3';

  return (
    <Wrapper>
      <ArrowButton onClick={decrease} disabled={currentIndex === 0}>
        <MdChevronLeft />
      </ArrowButton>
      <TypeDisplay>{displayName}</TypeDisplay>
      <ArrowButton onClick={increase} disabled={currentIndex === FONT_TYPE_LIST.length - 1}>
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

const TypeDisplay = styled.span`
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
