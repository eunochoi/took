import styled from "styled-components";

interface Props {
  habitName: string;
  setHabitName: (name: string) => void;
}

export const HabitName = ({ habitName, setHabitName }: Props) => {
  return (
    <Wrapper>
      <input
        onChange={(e) => setHabitName(e.currentTarget.value)}
        value={habitName || ""}
        placeholder="습관 이름을 입력하세요"
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;

  input {
    font-size: 16px;
    width: 100%;
  }
`;