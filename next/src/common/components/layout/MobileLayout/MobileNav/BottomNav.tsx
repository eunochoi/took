'use client'

import Link from "next/link";
import styled from "styled-components";
import { useNavItems } from "./useNavItems";

const BottomNav = () => {
  const { items, current } = useNavItems();

  // setting을 제외한 메인 메뉴
  const mainItems = items.filter(item => item.key !== 'setting');
  const settingItem = items.find(item => item.key === 'setting');

  return (
    <NavWrapper>
      <NavGroup>
        {mainItems.map(({ key, icon: Icon, href }) => (
          <NavMenu key={key} href={href} $active={current === key}>
            <Icon />
          </NavMenu>
        ))}
      </NavGroup>

      {settingItem && (
        <SettingButton href={settingItem.href} $active={current === 'setting'}>
          <settingItem.icon />
        </SettingButton>
      )}
    </NavWrapper>
  );
};

export default BottomNav;

const NavWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 95;
  
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  width: 100%;
  height: var(--mobileNav);
  
  pointer-events: none;
`;

const NavGroup = styled.nav`
  display: flex;
  align-items: center;
  gap: 4px;
  
  padding: 6px 8px;
  border-radius: 28px;
  
  background-color: rgba(255,255,255,0.8);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  
  pointer-events: auto;
`;

const NavMenu = styled(Link) <{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  
  width: 44px;
  height: 44px;
  border-radius: 22px;
  
  font-size: 22px;
  color: ${({ $active, theme }) => $active ? '#fff' : '#999'};
  background-color: ${({ $active, theme }) => $active ? (theme.themeColor || '#979FC7') : 'transparent'};
  
  cursor: pointer;
  transition: all 0.2s ease;
`;

const SettingButton = styled(Link) <{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  
  width: 52px;
  height: 52px;
  border-radius: 26px;
  
  font-size: 24px;
  color: ${({ $active, theme }) => $active ? '#fff' : '#999'};
  background-color: ${({ $active, theme }) => $active ? (theme.themeColor || '#979FC7') : 'rgba(255,255,255,0.8)'};
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  
  pointer-events: auto;
  cursor: pointer;
  transition: all 0.2s ease;
`;
