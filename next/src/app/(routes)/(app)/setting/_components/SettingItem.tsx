import { ReactNode } from "react";
import styled from "styled-components";

interface SettingItemProps {
  settingItemKey: string;
  settingItemValue: ReactNode;
}

export const SettingItem = ({ settingItemKey, settingItemValue }: SettingItemProps) => {
  return (<Wrapper>
    <span className="settingItemKey">{settingItemKey}</span>
    <span className="settingItemValue">{settingItemValue}</span>
  </Wrapper>);
}

const Wrapper = styled.span`
  display: flex;
  justify-content: space-between;

  width: 100%;
  padding: 12px 0;
  box-sizing: border-box;

  *{
    color: darkgray;
  }

  .settingItemKey{
    font-size: 18px;
    text-transform: capitalize;
  }
  .settingItemValue{

  }
`