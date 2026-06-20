'use client';

import { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  children?: ReactNode;
  classname?: string;
}

const TopButtons = ({ children, classname }: Props) => {
  return (
    <Wrapper className={classname || ''}>
      {children}
    </Wrapper>
  );
}

export default TopButtons;

const Wrapper = styled.div`
  z-index: 91;
  display: flex;
  justify-content: end;
  align-items: center;
  flex-shrink: 0;
  gap: 6px;

  position: sticky;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;

  @media (max-width: 479px) {
    height: var(--mobileHeader);
    padding: 0 4dvw;
  }
  @media (min-width:480px) and (max-width:1024px) {
    height: var(--mobileHeader);
    padding: 0 20px;
  }
  @media (min-width:1025px) {
    height: var(--desktopHeader);
    padding: 0 48px;
  }

  button{
    display: flex;
    justify-content: center;
    align-items: center;

    height: 32px;

    transition: all ease-in-out 200ms;
    text-transform: capitalize;

    font-size: 16px;
    font-weight: 500;
    color: white;
    background-color: ${(props) => props.theme.themeColor ? props.theme.themeColor : '#979FC7'};
    border-radius: 16px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.06);

    &.small{
      width: 48px;
    }
    &.normal{
      width: 64px;
    }
    &.large{
      width: 80px;
    }
    &.auto{
      width: auto;
      padding: 0 14px;
      gap: 8px;
    }
    @media (min-width:1025px) {
      padding: 4px 14px;
      height: 36px;
      border-radius: 18px;
    }
  }
`