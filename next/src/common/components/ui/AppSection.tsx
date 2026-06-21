import styled from "styled-components";

export const AppSection = styled.section<{ $gap?: number }>`
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap ?? 16}px;
  width: 100%;
`;

export const AppSectionHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
`;

export const AppSectionTitle = styled.h2`
  color: rgb(var(--greyTitle));
  text-transform: capitalize;
  font-size: 32px;
  font-family: 'BMJUA';
  flex: 1;

  @media (min-width: 1025px) {
    font-size: 36px;
  }
`;

export const AppSectionMeta = styled.span`
  font-size: 16px;
  color: rgba(var(--greyTitle), 0.6);
  white-space: nowrap;
  flex-shrink: 0;
`;

export const AppCardGrid = styled.div<{ $columns?: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns ?? 3}, minmax(0, 1fr));
  gap: 12px;
`;

export const AppCard = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

export const AppStatCard = styled(AppCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-width: 0;
  min-height: 100px;
  padding: 20px 12px;

  @media (min-width: 480px) {
    min-height: 110px;
    padding: 24px 16px;
  }
`;

export const AppStatLabel = styled.span`
  width: 100%;
  font-size: 14px;
  color: rgba(var(--greyTitle), 0.7);
  text-align: center;
  line-height: 1.4;
  word-break: keep-all;
  overflow-wrap: break-word;

  @media (min-width: 480px) {
    font-size: 16px;
  }
`;

export const AppStatValueWrapper = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 2px;
  line-height: 1.2;
`;

export const AppStatValue = styled.span`
  font-size: 28px;
  font-weight: 700;
  color: ${(props) => props.theme.themeColor ?? '#979FC7'};

  @media (min-width: 480px) {
    font-size: 32px;
  }
`;

export const AppStatUnit = styled.span`
  font-size: 15px;
  color: rgba(var(--greyTitle), 0.6);
`;

export const AppSubsection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const AppSubsectionTitle = styled.h3`
  font-size: 22px;
  font-weight: 500;
  text-transform: capitalize;
  color: grey;
  display: block;
  word-break: break-word;
  overflow-wrap: break-word;
`;

export const AppInfoCard = styled(AppCard)`
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (min-width: 480px) {
    padding: 24px 20px;
  }
`;

export const AppInfoContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;

  span {
    font-size: 16px;
    color: rgb(var(--greyTitle));
    line-height: 1.5;
    overflow-wrap: break-word;
    text-align: justify;
    flex: 1;
  }
`;

export const AppInfoText = styled.p`
  font-size: 14px;
  color: rgba(var(--greyTitle), 0.5);
  line-height: 1.4;
  margin: 0;
  padding-top: 8px;
  text-align: left;
  word-break: keep-all;
  overflow-wrap: break-word;

  @media (min-width: 480px) {
    font-size: 16px;
  }
`;

export const AppSurfaceCard = styled(AppCard)`
  width: 100%;
  padding: 16px;
`;

export const AppNoteCard = styled(AppInfoText)`
  padding: 20px 16px;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);

  @media (min-width: 480px) {
    padding: 24px 20px;
  }
`;
