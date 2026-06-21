import styled from "styled-components";

export const InfoSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
`;

export const SectionTitle = styled.h2`
  color: rgb(var(--greyTitle));
  font-size: 28px;
  font-family: 'BMJUA';
  flex: 1;

  @media (min-width: 1025px) {
    font-size: 32px;
  }
`;

export const SectionMeta = styled.span`
  font-size: 15px;
  color: rgba(var(--greyTitle), 0.6);
  white-space: nowrap;
  flex-shrink: 0;
`;

export const CardGrid = styled.div<{ $columns: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns}, minmax(0, 1fr));
  gap: 12px;
`;

export const StatCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-width: 0;
  min-height: 100px;
  padding: 20px 8px;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);

  @media (min-width: 480px) {
    min-height: 110px;
    padding: 24px 12px;
  }
`;

export const StatLabel = styled.span`
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

export const StatValueWrapper = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 2px;
  line-height: 1.2;
`;

export const StatValue = styled.span`
  font-size: 28px;
  font-weight: 700;
  color: ${(props) => props.theme.themeColor ?? '#979FC7'};

  @media (min-width: 480px) {
    font-size: 32px;
  }
`;

export const StatUnit = styled.span`
  font-size: 15px;
  color: rgba(var(--greyTitle), 0.6);
`;

export const SurfaceCard = styled.div`
  width: 100%;
  border-radius: 16px;
  padding: 16px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

export const InfoCard = styled.p`
  margin: 0;
  padding: 20px 16px;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  font-size: 14px;
  line-height: 1.5;
  color: rgba(var(--greyTitle), 0.6);
  word-break: keep-all;
  overflow-wrap: break-word;

  @media (min-width: 480px) {
    padding: 24px 20px;
    font-size: 16px;
  }
`;
