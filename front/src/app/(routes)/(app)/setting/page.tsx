'use client';

import { useRouter } from 'next/navigation';
import { MdAndroid, MdDeleteForever, MdLogout, MdLowPriority } from 'react-icons/md';
import styled from "styled-components";

import { ContentWrapper } from "@/common/components/layout/ContentWrapper";
import { PageWrapper } from "@/common/components/layout/PageWrapper";
import TopButtons from "@/common/components/ui/TopButtons";
import { useCurrentUser } from "@/common/hooks/useCurrentUser";
import { usePrefetchPage } from "@/common/hooks/usePrefetchPage";
import { format } from "date-fns";

import { FontSizeSelector } from "./_components/FontSizeSelector";
import { FontTypeSelector } from "./_components/FontTypeSelector";
import { SettingItem } from "./_components/SettingItem";
import { ThemeColorSelector } from "./_components/ThemeColorSelector";
import { onDeleteAccount } from "./_functions/onDeleteAccount";
import { onLogout } from "./_functions/onLogout";

const SettingPage = () => {
  usePrefetchPage();
  const router = useRouter();

  const dev = process.env.NODE_ENV === 'development';
  const protocol = dev ? 'http://' : 'https://';
  const introURL = `${protocol}${process.env.NEXT_PUBLIC_DOMAIN}/intro`;
  const { data: user } = useCurrentUser();
  const email = user?.email ?? '-';
  const provider = user?.provider ?? '-';
  const createAt = user?.createdAt ? format(user.createdAt, 'yyyy.MM.dd') : '-';

  return (
    <PageWrapper>
      <TopButtons>
        <a href="https://play.google.com/store/apps/details?id=com.everstamp&pcampaignid=web_share"
          target="_blank"
          rel="noopener noreferrer" >
          <button className="auto"><MdAndroid /></button>
        </a>
        <a href={introURL}
          target="_blank"
          rel="noopener noreferrer" >
          <button className="normal">intro</button>
        </a>
      </TopButtons>

      <ContentWrapper>
        <Section>
          <Title>계정 정보</Title>
          <Card>
            <SubSection>
              <SettingItem settingItemKey="이메일" settingItemValue={<span>{email}</span>}></SettingItem>
              <SettingItem settingItemKey="계정 타입" settingItemValue={<span>{provider}</span>}></SettingItem>
              <SettingItem settingItemKey="가입일" settingItemValue={<span>{createAt}</span>}></SettingItem>
            </SubSection>
          </Card>
        </Section>

        <Section>
          <Title>앱 설정</Title>
          <Card>
            <SubSection>
              <SubTitle>테마 색상</SubTitle>
              <ThemeColorSelector />
            </SubSection>
          </Card>
          <Card>
            <SubSection>
              <SubTitle>폰트</SubTitle>
              <SettingItem
                settingItemKey="다이어리 글씨 크기"
                settingItemValue={<FontSizeSelector />} />
              <SettingItem
                settingItemKey="폰트 타입"
                settingItemValue={<FontTypeSelector />} />
            </SubSection>
          </Card>
          <Card>
            <SubSection>
              <SubTitle>습관</SubTitle>
              <SettingItem
                settingItemKey="습관 순서 커스텀"
                settingItemValue={
                  <button onClick={() => {
                    router.push('/inter/habitOrder', { scroll: false })
                  }}>
                    <MdLowPriority />
                  </button>} />
            </SubSection>
          </Card>
        </Section>

        <Section>
          <Title>계정 관리</Title>
          <Card>
            <SubSection>
              <SettingItem
                settingItemKey="로그아웃"
                settingItemValue={
                  <button onClick={onLogout}>
                    <MdLogout />
                  </button>} />
              <SettingItem
                settingItemKey="회원 탈퇴"
                settingItemValue={
                  <button onClick={onDeleteAccount}>
                    <MdDeleteForever />
                  </button>} />
            </SubSection>
          </Card>
        </Section>
      </ContentWrapper>
    </PageWrapper >
  );
}

export default SettingPage;

const Section = styled.section`
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const Card = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`

const SubSection = styled.section`
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`
const Title = styled.span`
  color: rgb(var(--greyTitle));
  text-transform: capitalize;
  font-size: 32px;
  font-family: 'BMJUA';
  
  @media (min-width:1025px) { //desktop
    font-size: 36px;
  }
`
const SubTitle = styled.span`
  display : block;
  font-size: 22px;
  font-weight: 500;
  text-transform: capitalize;
  color: grey;
`
