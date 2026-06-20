import { useRouter } from 'next/navigation';
import { MdAdd } from 'react-icons/md';
import styled from "styled-components";

interface Props {
  date: string; // yyyy-MM-dd
}

const DiaryAddButton = ({ date }: Props) => {
  const router = useRouter();

  const onAddDiary = () => {
    router.push(`/inter/input/addDiary?date=${date}`, { scroll: false });
  };

  return (
    <Wrapper>
      <AddButton onClick={onAddDiary}>
        <MdAdd />
        <span>새 일기 작성</span>
      </AddButton>
    </Wrapper>
  );
};

export default DiaryAddButton;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  width: 100%;
  height: 100%;
`

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  
  font-size: ${(props) => props.theme.fontSize ?? '15pt'};
  color: ${(props) => props.theme.themeColor ? props.theme.themeColor : '#979FC7'};
`
