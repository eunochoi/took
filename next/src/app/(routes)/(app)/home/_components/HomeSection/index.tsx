import styled from "styled-components";

export const HomeSectionWrapper = styled.section`
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const HomeSectionHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
`;

export const HomeSectionTitle = styled.h2`
  color: rgb(var(--greyTitle));
  text-transform: capitalize;
  font-size: 32px;
  font-family: 'BMJUA';
  flex: 1;

  @media (min-width: 1025px) {
    font-size: 36px;
  }
`;

export const HomeTotalCount = styled.span`
  font-size: 16px;
  color: rgba(var(--greyTitle), 0.6);
  white-space: nowrap;
  flex-shrink: 0;
`;

export const HomeCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

export const HomeCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 12px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  gap: 4px;
  min-height: 100px;

  @media (min-width: 480px) {
    padding: 24px 16px;
    min-height: 110px;
  }
`;

export const HomeCardLabel = styled.span`
  font-size: 14px;
  color: rgba(var(--greyTitle), 0.7);
  text-align: center;

  @media (min-width: 480px) {
    font-size: 16px;
  }
`;

export const HomeCardValueWrapper = styled.div`
  display: flex;
  align-items: baseline;
  gap: 2px;
  line-height: 1.2;
`;

export const HomeCardValue = styled.span`
  font-size: 28px;
  font-weight: 700;
  color: ${(props) => props.theme.themeColor ?? '#979FC7'};

  @media (min-width: 480px) {
    font-size: 32px;
  }
`;

export const HomeCardUnit = styled.span`
  font-size: 16px;
  color: rgba(var(--greyTitle), 0.6);

  @media (min-width: 480px) {
    font-size: 15px;
  }
`;

export const HomeSubsection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const HomeSubsectionTitle = styled.h3`
  font-size: 22px;
  font-weight: 500;
  text-transform: capitalize;
  color: grey;
  display: block;
  word-break: break-word;
  overflow-wrap: break-word;
`;
