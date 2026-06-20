import styled from "styled-components";

const DiaryCardShell = styled.div<{ $type: 'small' | 'large' }>`
  width: 100%;
  overflow: hidden;

  box-sizing: border-box;
  border-radius: 20px;
  background-color: rgba(255,255,255,0.9);
  backdrop-filter: blur(12px);
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);

  ${({ $type }) => $type === 'small' && `
    height: 180px;

    @media (min-width:1025px) {
      height: 230px;
    }
  `}

  ${({ $type }) => $type === 'large' && `
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    flex-shrink: 0;

    height: auto;
    min-height: 250px;

    @media (max-width: 479px) {
      min-height: 200px;
    }

    @media (min-width:1024px) {
      min-height: 300px;
    }
  `}
`;

export default DiaryCardShell;
