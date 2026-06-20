import styled from "styled-components";


interface SnackBarActionProps {
  yesAction: () => void;
  noAction: () => void;
}

export const SnackBarAction = ({ yesAction, noAction }: SnackBarActionProps) => {
  return (
    <ButtonContainer>
      <Button className="no" onClick={noAction}>no</Button>
      <Button className="yes" onClick={yesAction}>yes</Button>
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`
const Button = styled.button`
  padding: 6px 16px;
  border-radius: 14px;
  font-weight: 500;
  &.yes{
    background-color: rgba(131, 198, 182, 0.9);
    color: white;
  }
  &.no{
    background-color: rgba(220, 120, 137, 0.9);
    color: white;
  }
`
