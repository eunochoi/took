import styled from "styled-components";

interface ContentWrapperProps {
  $gap?: number; // 기본 gap 값 (px)
  $mobileGap?: number; // 모바일 gap 값 (px)
  $tabletGap?: number; // 태블릿 gap 값 (px)
  $paddingTop?: number; // 상단 패딩 (px)
  $paddingBottom?: number; // 하단 패딩 (px)
  $flex?: string; // flex 속성 (예: "1 1 0")
  className?: string;
  children?: React.ReactNode;
}

export const ContentWrapper = styled.div<ContentWrapperProps>`
  width: 100%;
  max-width: 650px;
  height: auto;
  
  display: flex;
  flex-direction: column;
  
  ${props => props.$flex && `flex: ${props.$flex};`}
  ${props => props.$gap && `gap: ${props.$gap}px;`}

  @media (max-width: 479px) {
    padding: 0px 4dvw var(--mobileNav) 4dvw;
    ${props => props.$mobileGap && `gap: ${props.$mobileGap}px;`}
    ${props => props.$paddingTop !== undefined && `padding-top: ${props.$paddingTop}px;`}
    ${props => props.$paddingBottom !== undefined && `padding-bottom: calc(var(--mobileNav) + ${props.$paddingBottom}px);`}
  }
  
  @media (min-width:480px) and (max-width:1024px) {
    padding: 36px;
    ${props => props.$tabletGap && `gap: ${props.$tabletGap}px;`}
    ${props => props.$paddingTop !== undefined && `padding-top: ${props.$paddingTop}px;`}
    ${props => props.$paddingBottom !== undefined && `padding-bottom: ${props.$paddingBottom}px;`}
  }
  
  @media (min-width:1025px) {
    padding: 36px;
    ${props => props.$paddingTop !== undefined && `padding-top: ${props.$paddingTop}px;`}
    ${props => props.$paddingBottom !== undefined && `padding-bottom: ${props.$paddingBottom}px;`}
  }
`;
