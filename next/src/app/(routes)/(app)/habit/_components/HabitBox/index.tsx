'use client';

import styled from "styled-components";


import { authAction } from "@/common/auth/authAction";
import { getHabitRecentStatus } from "@/common/actions/habit";
import { getTodayString } from "@/common/functions/getTodayString";
import { useQuery } from "@tanstack/react-query";
import { format, subDays } from "date-fns";
import { ko } from "date-fns/locale";
import { ChangeEvent } from "react";

import { StarRating } from "@/common/components/ui/StarRating";
import { SnackBarAction } from "@/common/utils/snackBar/SnackBarAction";
import { useRouter } from "next/navigation";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { MdOutlineDeleteForever, MdOutlineEdit, MdOutlineInsertChart } from 'react-icons/md';
import useHabitAction from "./utils/useHabitAction";


interface Props {
  name: string;
  id: number;
  priority: number;
}

const HabitBox = ({ name, id, priority }: Props) => {

  const router = useRouter();
  const { checkHabit, uncheckHabit, deleteHabit } = useHabitAction();

  const todayString = getTodayString(); // 'yyyy-MM-dd'
  const currentDate = new Date();
  let recentDateArray = new Array(4).fill(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()));
  recentDateArray = recentDateArray.map((e, i) => subDays(e, i));

  const { data: recentDateStatus } = useQuery({
    queryKey: ['habit', name, 'recent'],
    queryFn: () => authAction(() => getHabitRecentStatus({ id, date: todayString })),
  });

  const onDeleteHabit = () => {
    const action = () => (
      <SnackBarAction
        yesAction={() => {
          deleteHabit.mutate({ habitId: id });
          closeSnackbar('deleteHabit');
        }}
        noAction={() => {
          closeSnackbar('deleteHabit');
        }} />
    );
    enqueueSnackbar(`습관 항목(${name})을 지우시겠습니까?`, { key: 'deleteHabit', persist: false, action, autoHideDuration: 3000 });
  }
  const habitToggle = (e: ChangeEvent<HTMLInputElement>, dateString: string) => {
    if (e.currentTarget.checked === true) {
      checkHabit.mutate({ habitId: id, date: dateString });
    }
    else {
      uncheckHabit.mutate({ habitId: id, date: dateString });
    }
  }

  return (<Wrapper>
    <StarRating rating={priority + 1} />
    <Name><span>{name}</span></Name>
    <Days>
      {recentDateArray.map((date, i: number) => {
        return <Check key={`${date}-${name}`}>
          <label htmlFor={`${date}-${name}`}>
            <span className="week">{format(date, 'eee', { locale: ko })}</span>
            <span className="date">{format(date, 'd')}</span>
            <input
              id={`${date}-${name}`}
              type="checkbox"
              checked={!!recentDateStatus?.[i]}
              onChange={(e) => {
                habitToggle(e, format(date, 'yyyy-MM-dd'));
              }} />
            <div className="checkmark"><div></div></div>
          </label>
        </Check>
      })}
    </Days>
    <ButtonWrapper>
      <button onClick={() => router.push(`/inter/habitInfo?id=${id}`, { scroll: false })}>
        <MdOutlineInsertChart />
      </button>
      <button onClick={() => router.push(`/inter/input/editHabit?id=${id}`, { scroll: false })}>
        <MdOutlineEdit />
      </button>
      <button onClick={onDeleteHabit}>
        <MdOutlineDeleteForever />
      </button>
    </ButtonWrapper>
  </Wrapper >);
}

export default HabitBox;
const ButtonWrapper = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #b9b9b9;
  button{
    font-size: 20px;
    margin : 0 8px;
  }
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  
  border-radius: 24px;
  background-color: rgba(255,255,255,0.9);
  backdrop-filter: blur(12px);
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);

  width: 100%;
  aspect-ratio: 0.8;
`
const Name = styled.div`
  width: 100%;
  height: auto;
  
  font-weight: 500;
  font-size: ${(props) => props.theme.fontSize ?? '15pt'};
  color: rgb(var(--greyTitle));
  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center;

  span{
    white-space: nowrap;
    overflow: scroll;
    max-width: 90%;
  }
`
const Days = styled.div`
  width: 100%;
  height: auto;
  
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  margin: 6px 0;
`
const Check = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;

  &:first-child{
    .week{
      color: ${(props) => props.theme.themeColor ? props.theme.themeColor : '#979FC7'} !important;
    }
  }
  .date{
    margin: 2px 0;
    @media ((max-height: 479px) and (min-width:480px) and (max-width:1024px)) { //only mobild land
      margin: 2px 0;
    }
  }
  .week{
    font-weight: 500;
    color: rgb(var(--greyTitle)) !important;
    @media ((max-height: 479px) and (min-width:480px) and (max-width:1024px)) { //only mobild land
      font-size: 14px;
    }
  }

  label{
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    font-size: 14px;
    font-weight: 500;
    color: grey;

    input{
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }
    .checkmark{
      
      height: 20px;
      width: 20px;
      border-radius: 25px;
      background-color: rgba(0,0,0,0.06);

      div{
        transition: all ease-in-out 0.4s;

        flex-shrink: 0;
        width: 12px;
        height: 12px; 
        border-radius: 20px;

        @media ((max-height: 479px) and (min-width:480px) and (max-width:1024px)) { //only mobild land
          height: 8px;
          width: 8px;
        }
      }

      display: flex;
      flex-shrink: 0;
      justify-content: center;
      align-items: center;
      @media ((max-height: 479px) and (min-width:480px) and (max-width:1024px)) { //only mobild land
        height: 16px;
        width: 16px;
      }
    }
    input:checked ~ .checkmark{
      div{
        background-color: ${(props) => props.theme.themeColor ? props.theme.themeColor : '#979FC7'};
      }    
    }
    span:first-child{
      color: rgb(var(--greyTitle));
    }
  }
`
