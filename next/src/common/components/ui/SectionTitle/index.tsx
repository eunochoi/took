import styled from "styled-components";

export const SectionTitle = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.2;
  color: ${(props) => props.theme?.themeColor ?? '#979FC7'};
`;

export const SectionTitleIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.2em;
  height: 1.2em;
  line-height: 0;
  font-size: 20px;
  color: ${(props) => props.theme?.themeColor ?? '#979FC7'};
  flex-shrink: 0;

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
`;
