'use client';

import { ReactNode } from 'react';
import styled from 'styled-components';

interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Overlay = ({ isOpen, onClose, children }: OverlayProps) => {
  return (
    <Wrapper className={isOpen ? 'open' : ''} onClick={onClose}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  background-color: rgba(75, 75, 75, 0.05);
  backdrop-filter: blur(12px);

  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  opacity: 0;
  visibility: hidden;

  &.open {
    opacity: 1;
    visibility: visible;
  }

  @media (max-width: 479px) {
    z-index: 98;
  }
  @media (min-width: 480px) {
    z-index: 105;
  }
`;
