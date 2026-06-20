'use client'

import { ReactNode } from "react";
import styled from "styled-components";
import MobileNav from "./MobileNav";

interface Props {
  children: ReactNode;
  modal?: ReactNode;
}

const MobileLayout = ({ modal, children }: Props) => {
  return (
    <Wrapper>
      {modal}
      {children}
      <MobileNav />
    </Wrapper>
  );
}

export default MobileLayout;

const Wrapper = styled.div`
  width: 100dvw;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  @media (min-width:480px) and (max-width:1024px) {
    width: 75dvw;
    margin-left: 25dvw;
  }
`;