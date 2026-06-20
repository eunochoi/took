'use client';

import { useRouter } from "next/navigation";
import styled from "styled-components";

import { MdArrowBackIos } from 'react-icons/md';

interface ModalHeaderProps {
  className?: string;
  headerTitleText?: string;
  headerConfirmText?: string;
  onConfirm?: () => void;
}

export const ModalHeader = ({ className, headerTitleText, headerConfirmText = '완료', onConfirm }: ModalHeaderProps) => {
  const router = useRouter();

  return (<Wrapper className={className}>
    <Button
      className="left"
      onClick={() => router.back()}>
      <MdArrowBackIos />
    </Button>
    {headerTitleText ? <Title>{headerTitleText}</Title> : <></>}
    {onConfirm ? <Button className="right" onClick={onConfirm}>{headerConfirmText}</Button> : <></>}
  </Wrapper>);
}

const Wrapper = styled.div`
  width: 100%;
  height: var(--mobileHeader);

  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;


  @media (max-width: 479px) { //mobile port
    padding: 0 4dvw;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    padding: 0 24px;
  }
  @media (min-width:1024px) { //desktop
    padding: 0 24px;
  }
`
const Button = styled.button` 
  color: ${(props) => props.theme.themeColor ? props.theme.themeColor : '#979FC7'};
  .left{

  }
  .right{

  }
`
const Title = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  color: rgb(var(--greyTitle));
  font-size: 20px;
`