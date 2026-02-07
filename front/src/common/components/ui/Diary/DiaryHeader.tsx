import type { DiaryHeaderData } from '@/common/types/diary';
import { EMOTIONS } from '@/common/constants/emotions';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useEffect, useRef, useState } from 'react';
import { MdMoreVert } from 'react-icons/md';
import styled from 'styled-components';
import DiaryMenus from './DiaryMenus';

interface Props {
  type: 'small' | 'large';
  diaryData: DiaryHeaderData;
}

const DiaryHeader = ({ diaryData, type }: Props) => {
  const date = format(diaryData.date, 'yyyy년 M월 d일');
  const day = format(diaryData.date, 'eeee', { locale: ko });

  const [isMenuOpen, setMenuOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [wrapperHeight, setWrapperHeight] = useState<number | undefined>();

  const handleToggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // 일기 변경시 메뉴 닫기
  useEffect(() => {
    setMenuOpen(false);
  }, [diaryData]);

  useEffect(() => {
    setWrapperHeight(wrapperRef.current?.offsetHeight);
  }, []);

  return (
    <Wrapper ref={wrapperRef}>
      <DateInfo className={type}>
        <span className="date">{date}</span>
        <span className="week">{day}</span>
        <span className="emotion">
          {diaryData.visible && EMOTIONS[diaryData.emotion]?.nameKr}
        </span>
      </DateInfo>
      <Edit onClick={handleToggleMenu}>
        {diaryData.visible && <MdMoreVert />}
      </Edit>
      <DiaryMenus
        isMenuOpen={isMenuOpen}
        setMenuOpen={setMenuOpen}
        position={wrapperHeight}
        diaryData={diaryData}
      />
    </Wrapper>
  );
};

export default DiaryHeader;

const Wrapper = styled.div`
  width: 100%;
  padding: 14px;
  padding-bottom: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;
`
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
`
const Edit = styled.div`
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  color: #a5a5a5;
`
