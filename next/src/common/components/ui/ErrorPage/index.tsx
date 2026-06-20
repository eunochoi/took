import { EMOTIONS } from '@/common/constants/emotions';
import Image from 'next/image';
import { ReactNode } from 'react';
import styled from 'styled-components';

interface Button {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

interface ErrorPageProps {
  title: string;
  description: string | ReactNode;
  buttons?: Button[];
}

// 에러 페이지 공통 컴포넌트
// 모든 에러 상황에서 동일한 UI 제공
export const ErrorPage = ({ title, description, buttons = [] }: ErrorPageProps) => {
  return (
    <Wrapper>
      <IconWrapper>
        <Image
          src={EMOTIONS[6].src}
          alt={EMOTIONS[6].nameKr}
          width={128}
          height={128}
          priority
        />
      </IconWrapper>
      <Title>{title}</Title>
      <Description>{typeof description === 'string' ? <p>{description}</p> : description}</Description>
      {buttons.length > 0 && (
        <ButtonGroup>
          {buttons.map((button, index) => (
            <Button
              key={index}
              onClick={button.onClick}
              $variant={button.variant || 'primary'}
            >
              {button.label}
            </Button>
          ))}
        </ButtonGroup>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100dvw;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  background-color: var(--theme-bg, #f5f5fa);
  color: rgb(88, 88, 88);
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 96px;
  line-height: 1;

  img {
    filter: brightness(1.1);
  }

  @media (min-width: 1025px) {
    font-size: 128px;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  margin: 16px 0 8px;
  text-align: center;

  @media (min-width: 1025px) {
    font-size: 32px;
  }
`;

const Description = styled.div`
  font-size: 16px;
  color: #525252;
  text-align: center;
  padding: 0 20px;
  max-width: 80%;

  p {
    margin: 0;
    line-height: 1.5;
  }

  @media (min-width: 1025px) {
    font-size: 18px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
  flex-wrap: wrap;
  justify-content: center;
`;

const Button = styled.button<{ $variant: 'primary' | 'secondary' }>`
  padding: 10px 24px;
  font-size: 16px;
  border-radius: 24px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }

  ${({ $variant }) =>
    $variant === 'primary'
      ? `
    border: none;
    background-color: rgb(88, 88, 88);
    color: white;
  `
      : `
    border: 1px solid rgb(88, 88, 88);
    background-color: white;
    color: rgb(88, 88, 88);
  `}

  @media (min-width: 1025px) {
    font-size: 18px;
  }
`;
