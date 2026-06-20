'use client';

import Logo from '@/common/components/ui/Logo';
import styled, { keyframes } from "styled-components";

interface LoadingScreenProps {
  message?: string;
  showLogo?: boolean;
}

const LoadingScreen = ({ message, showLogo = true }: LoadingScreenProps) => (
  <Wrapper>
    {showLogo && (
      <LogoWrapper>
        <Logo size={48} />
        <Dots>
          <Dot $delay={0} />
          <Dot $delay={0.2} />
          <Dot $delay={0.4} />
        </Dots>
      </LogoWrapper>
    )}
    {message && <Message>{message}</Message>}
  </Wrapper>
);

export default LoadingScreen;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 0.4;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
`;

const Wrapper = styled.div`
  width: 100dvw;
  height: 100dvh;
  background-color: var(--theme-bg, #f3f7fc);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  animation: ${fadeIn} 0.6s ease-out;
`;



const Dots = styled.div`
  display: flex;
  gap: 8px;
`;

const Dot = styled.div<{ $delay: number }>`
  width: 16px;
  height: 16px;
  border-radius: 100%;
  background-color: ${(props) => props.theme.themeColor ?? '#8CADE2'};
  animation: ${pulse} 1.2s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
`;

const Message = styled.span`
  font-size: 16px;
  color: rgb(150, 150, 150);
  animation: ${fadeIn} 0.6s ease-out 0.3s both;
`;
