'use client';

import Diary from "@/common/components/ui/Diary";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import React from "react";
import styled from "styled-components";
import { diaryData } from "../_types/diaryData";

import { EMOTIONS } from "@/common/constants/emotions";
import Image from "next/image";


interface DiariesProps {
  diaries: diaryData[];
}

export const Diaries = ({ diaries }: DiariesProps) => {
  return (<>
    {diaries?.length > 0 ?
      diaries?.map((data: diaryData, i: number) => {
        const currentDiaryDate = format(data.date, 'yyyy년 M월', { locale: ko });
        const previousDiaryDate = i > 0 ? format(diaries[i - 1].date, 'yyyy년 M월', { locale: ko }) : '';

        if (currentDiaryDate !== previousDiaryDate) {
          return <React.Fragment key={'listNote' + i}>
            <MonthSeparator>{currentDiaryDate}</MonthSeparator>
            <DiaryWrapper><Diary type="large" diaryData={data} /></DiaryWrapper>
          </React.Fragment>
        }
        else {
          return <DiaryWrapper key={'listNote' + i}>
            <Diary type="large" diaryData={data} />
          </DiaryWrapper>
        }
      })
      :
      <NoDiaries>
        <Image src={EMOTIONS[1].src} alt={EMOTIONS[1].nameKr} width={128} height={128} />
        <span>작성된 일기가 존재하지 않습니다. :(</span>
      </NoDiaries>}
  </>);
}


const DiaryWrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px 0;

  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 8px;
  }
`

const MonthSeparator = styled.span`
  margin: 16px 0;

  display: flex;
  justify-content: start;
  align-items: center;

  text-transform: capitalize;
  color: rgb(var(--greyTitle));
  font-size: 32px;
  font-family: 'BMJUA';
  width: 100%;

  @media (max-width: 479px) { //mobile port
    width: 90dvw;
  }

  @media (min-width:1025px) { //desktop
    font-size: 36px;
    margin : 28px 0;
  }

`
const NoDiaries = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap : 32px;


  color: rgb(var(--greyTitle));

  @media (max-width: 479px) { //mobile port
    font-size: 18px;  
    padding-top: 25dvh;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    font-size: 18px;
    padding-top: 32px;
  }
  @media (min-width:1024px) { //desktop
    font-size: 22px;
    padding-top: 25dvh;
  }
`