import { RefObject } from "react";
import styled from "styled-components";
import { lightenColor } from "@/common/utils/lightenColor";

interface IndicatorProps {
  slideWrapperRef: RefObject<HTMLDivElement>;
  page: number;
  indicatorLength: number;
  color?: string;
  type?: string;
}

const Indicator = ({ slideWrapperRef, page, indicatorLength, color, type }: IndicatorProps) => {
  return <IndicatorWrapper>
    {[...Array(indicatorLength)].map((_: any, i: number) =>
      <Dot
        key={`indicator${i}`}
        $color={color}
        className={page === i ? `current ${type}` : `${type}`}
        onClick={() => {
          slideWrapperRef.current?.scrollTo({
            left: slideWrapperRef.current.clientWidth * i,
            behavior: "smooth"
          })
        }}
      />)}
  </IndicatorWrapper>;
}

export default Indicator;

const IndicatorWrapper = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  margin: 4px 0;
  height: auto;
  @media (max-width: 479px) { //mobile port
  }
  @media (min-width:480px) and (max-width:1024px) { //mobild land + tablet
  }
`
const Dot = styled.div<{ $color?: string }>`
  background-color: ${(props) => props.$color ? lightenColor(props.$color, 15) : props.theme.themeColor ? lightenColor(props.theme.themeColor, 15) : '#B0B8D4'};

  margin: 3px;
  width: 8px;
  height: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;

  &.diary{
   &:last-child{
    border-radius: 2px;
   }
  }
  &.current {
    background-color: ${(props) => props.$color ?? props.theme.themeColor ?? '#8CADE2'};
    width: 20px;
  }
`
