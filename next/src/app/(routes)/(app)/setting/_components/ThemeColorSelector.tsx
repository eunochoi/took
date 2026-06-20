'use client';

import { MdCheck } from 'react-icons/md';
import styled from "styled-components";

import { THEME_COLORS } from "@/common/utils/settingsContext/SettingsContext";
import { useSettingsContext } from "@/common/utils/settingsContext/useSettingsContext";

export const ThemeColorSelector = () => {
  const { themeColor, setThemeColor } = useSettingsContext();

  return (
    <Wrapper>
      <ColorGroup>
        {THEME_COLORS.map((color) => (
          <ColorButton
            key={color}
            $color={color}
            $isSelected={themeColor === color}
            onClick={() => setThemeColor(color)}
          >
            {themeColor === color && <MdCheck />}
          </ColorButton>
        ))}
      </ColorGroup>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 12px 0;
`;

const ColorGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  width: 100%;
`;

const ColorButton = styled.button<{ $color: string; $isSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 42px;
  height: 42px;
  border-radius: 100%;
  
  background-color: ${({ $color }) => $color};
  /* box-shadow: ${({ $isSelected }) =>
    $isSelected ? 'inset 0 0 0 2px rgba(255,255,255,0.9)' : 'none'}; */
  
  transform: ${({ $isSelected }) => $isSelected ? 'scale(1.15)' : 'scale(1)'};
  transition: all 0.2s ease;

  svg {
    font-size: 18px;
    color: white;
    filter: drop-shadow(0 1px 1px rgba(0,0,0,0.2));
  }

  &:hover {
    transform: scale(1.2);
  }
`;
