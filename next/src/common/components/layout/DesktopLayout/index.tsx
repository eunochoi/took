'use client';

import styled from "styled-components";

import { ReactNode } from "react";
import SideBar from "./SideBar";

interface Props {
  children: ReactNode;
  modal?: ReactNode;
}


const DesktopLayout = ({ modal, children }: Props) => {
  return (
    <DesktopLayoutWrapper>
      <SideBar />
      <DesktopContent>
        {modal}
        {children}
      </DesktopContent>
    </DesktopLayoutWrapper>
  );
}

export default DesktopLayout;


const DesktopLayoutWrapper = styled.div`
  width: 100vw;
  /* height: 100vh; */
  display: flex;
  justify-content: center;
`;

const DesktopContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  width: calc(100vw - var(--sidebarWidth));
  margin-left: var(--sidebarWidth);
`