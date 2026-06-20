import { EMOTIONS } from '@/common/constants/emotions';
import type { DiaryData } from '@/common/types/diary';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useEffect, useRef, useState } from 'react';
import { MdMoreVert } from 'react-icons/md';
import styled from 'styled-components';
import DiaryMenus from './DiaryMenus';

interface Props {
  diaryData: DiaryData;
}

const DiaryDateHeader = ({ diaryData }: Props) => {
  const formattedDate = format(new Date(diaryData.date), 'yyyy년 M월 d일');
  const day = format(new Date(diaryData.date), 'eeee', { locale: ko });

  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const handleToggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // 일기 바뀌면 메뉴 닫기
  useEffect(() => {
    setMenuOpen(false);
  }, [diaryData]);

  return (
    <Wrapper>
      <DateInfo>
        <span className="date">{formattedDate}</span>
        <span className="week">{day}</span>
        <span className="emotion">
          {EMOTIONS[diaryData.emotion]?.nameKr}
        </span>
      </DateInfo>
      <Edit ref={menuButtonRef} onClick={handleToggleMenu}>
        <MdMoreVert />
      </Edit>
      <DiaryMenus
        isMenuOpen={isMenuOpen}
        setMenuOpen={setMenuOpen}
        anchorRef={menuButtonRef}
        diaryData={diaryData}
      />
    </Wrapper>
  );
};

export default DiaryDateHeader;

const Wrapper = styled.div`
  width: 100%;
  padding: 14px;
  padding-bottom: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;
`;

const DateInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  span {
    font-weight: 500;
    font-size: 20px;
  }
  .week {
    color: grey;
  }
  .date {
    color: rgb(var(--greyTitle));
  }
  .emotion {
    color: ${(props) => props.theme.themeColor ? props.theme.themeColor : '#979FC7'};
  }
`;

const Edit = styled.button`
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  color: #a5a5a5;
`;
