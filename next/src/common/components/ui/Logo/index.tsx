'use client';

import Image from 'next/image';
import styled from 'styled-components';
import emotionsImage from '/public/img/emotion/emotions.png';

interface LogoProps {
  size?: number;
  className?: string;
}

const Logo = ({ size = 36, className }: LogoProps) => {
  const imageSize = size * 5;

  return (
    <LogoWrapper className={className}>
      <LogoImageWrapper>
        <Image src={emotionsImage} alt="TO:OK Logo" width={imageSize} height={imageSize} priority />
      </LogoImageWrapper>
      <LogoText $fontSize={`${size}px`}>TO:OK</LogoText>
    </LogoWrapper>
  );
};

export default Logo;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const LogoImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoText = styled.span<{ $fontSize: string }>`
  font-family: var(--font-joti-one), 'Joti One', sans-serif;
  font-size: ${({ $fontSize }) => $fontSize};
  color: #5C5C5C;
  text-transform: uppercase;
  line-height: 1.2;
`;
