'use client';

import Image from "next/image";
import styled from "styled-components";

import { EMOTIONS } from "@/common/constants/emotions";
import { EMOTION_UNSELECTED } from "@/common/constants/filterDefaults";

export interface EmotionSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export const EmotionSelector = ({ value, onChange }: EmotionSelectorProps) => {
  const firstRow = EMOTIONS.slice(0, 5);
  const secondRow = EMOTIONS.slice(5, EMOTIONS.length);

  const isSelected = (id: number) => value === id || value === EMOTION_UNSELECTED;

  const handleClick = (id: number) => {
    if (value === id) onChange(EMOTION_UNSELECTED);
    else onChange(id);
  };

  return (
    <Wrapper>
      <Row>
        {firstRow.map((e) => (
          <Item
            key={e.name}
            className={isSelected(e.id) ? "selected" : ""}
            onClick={() => handleClick(e.id)}
          >
            <EmotionImage src={e.src} alt={e.nameKr} width={128} height={128} />
            <EmotionName>{e.nameKr}</EmotionName>
          </Item>
        ))}
      </Row>
      <Row>
        {secondRow.map((e) => (
          <Item
            key={e.name}
            className={isSelected(e.id) ? "selected" : ""}
            onClick={() => handleClick(e.id)}
          >
            <EmotionImage src={e.src} alt={e.nameKr} width={128} height={128} />
            <EmotionName>{e.nameKr}</EmotionName>
          </Item>
        ))}
      </Row>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

const EmotionImage = styled(Image)`
  box-sizing: border-box;
  transition: opacity ease-in-out 200ms;
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  object-fit: contain;

  @media (max-width: 479px) {
    width: 50px;
    height: 50px;
  }
  @media (min-width: 1025px) {
    width: 70px;
    height: 70px;
  }
`;

const EmotionName = styled.span`
  font-size: 16px;
  color: rgb(var(--greyTitle));
  text-align: center;
  transition: opacity ease-in-out 200ms;

  @media (max-width: 479px) {
    font-size: 14px;
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  flex: 1;

  &.selected ${EmotionImage} {
    opacity: 1;
  }
  &:not(.selected) ${EmotionImage} {
    opacity: 0.5;
  }

  &.selected ${EmotionName} {
    opacity: 1;
    font-weight: 600;
  }
  &:not(.selected) ${EmotionName} {
    opacity: 0.5;
  }
`;
