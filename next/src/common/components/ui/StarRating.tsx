'use client';

import styled from "styled-components";

interface StarRatingProps {
  rating: number;
  className?: string;
  color?: string;
}

export const StarRating = ({ rating, className, color }: StarRatingProps) => {
  return (
    <Wrapper className={className} $color={color}>
      {Array.from({ length: rating }, (_, index) => (
        <span className="star" key={index}>★</span>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ $color?: string }>`
  display: flex;
  font-size: ${(props) => props.theme.fontSize ?? '15pt'};
  gap: 4px;
  color: ${(props) => props.$color ?? props.theme.themeColor ?? '#979FC7'};
`;