'use client';

import { ReactNode } from "react";
import styled from "styled-components";

interface ModalFooterProps {
  className?: string;
  children: ReactNode;
}

export const ModalFooter = ({ className, children }: ModalFooterProps) => {
  return (<Wrapper className={className}>
    {children}
  </Wrapper>);
}

const Wrapper = styled.div`
  width: 100%;
  height: var(--mobileHeader);
  flex-shrink: 0;

  display: flex;
  justify-content: center;
  align-items: center;
`