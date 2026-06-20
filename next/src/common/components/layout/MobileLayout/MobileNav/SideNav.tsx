'use client'

import Logo from '@/common/components/ui/Logo';
import Link from "next/link";
import styled from "styled-components";
import { useNavItems } from "./useNavItems";

const SideNav = () => {
  const { items, current } = useNavItems();

  return (
    <Nav>
      <LogoWrapper>
        <Logo size={24} />
      </LogoWrapper>
      {items.map(({ key, icon: Icon, label, href }) => (
        <Menu key={key} href={href} $active={current === key}>
          <Icon /> {label}
        </Menu>
      ))}
    </Nav>
  );
};

export default SideNav;

const Nav = styled.nav`
  position: fixed;
  left: 0;
  width: 25dvw;
  height: 100dvh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;

  background-color: rgba(255,255,255,0.8);
  backdrop-filter: blur(24px);
  box-shadow: 2px 0 20px rgba(0,0,0,0.04);
`;

const LogoWrapper = styled.div`
  margin-bottom: 16px;
`;

const Menu = styled(Link) <{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 80%;
  padding: 8px 12px;
  font-size: 14px;
  text-transform: capitalize;
  color: ${({ $active, theme }) => $active ? (theme.themeColor || '#979FC7') : '#c3c3c3'};
  cursor: pointer;
`;
