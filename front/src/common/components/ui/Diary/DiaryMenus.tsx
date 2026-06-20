import styled from "styled-components";

import { authAction } from "@/common/actions/authAction";
import { deleteDiary } from "@/common/actions/diary";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { closeSnackbar, enqueueSnackbar, SnackbarKey } from "notistack";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { MdContentCopy, MdOutlineDeleteForever, MdOutlineEdit } from 'react-icons/md';
import { SnackBarAction } from "../../../utils/snackBar/SnackBarAction";

interface Props {
  isMenuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  position: number | undefined;
  diaryData: {
    date: string;  // yyyy-MM-dd
    visible: boolean;
    emotion: number;
    text: string;
    id: number;
  }
}

interface Err {
  response: {
    data: string;
  }
}

const DiaryMenus = ({ isMenuOpen, setMenuOpen, position, diaryData }: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const timer = useRef<number | null>(null);
  useEffect(() => {
    if (isMenuOpen) {
      timer.current = window.setTimeout(closeMenu, 5000);
    }
    return () => {
      if (timer.current !== null) {
        console.log('delete timer - ', timer.current);
        clearTimeout(timer.current);
        timer.current = null;
      }
    }
  }, [isMenuOpen])


  const deleteDiaryMutation = useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      await authAction(() => deleteDiary({ id }));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diary'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      console.log('success delete diary');
      closeSnackbar('diaryDelete');
      enqueueSnackbar('일기 삭제 완료', { variant: 'success' });
    },
    onError: (e: Err) => {
      enqueueSnackbar(e?.response?.data, { variant: 'error' });
      console.log('delete diary error');
    },
  });
  const closeMenu = () => {
    setMenuOpen(false);
  }
  const onClickDeleteButton = () => {
    const action = (snackbarId: SnackbarKey) => (
      <SnackBarAction
        yesAction={() => {
          deleteDiaryMutation.mutate({ id: diaryData.id });
          closeSnackbar('diaryDelete');
        }}
        noAction={() => {
          closeSnackbar('diaryDelete');
        }} />
    );
    enqueueSnackbar(`${format(new Date(diaryData.date), 'yy년 M월 d일')} 일기를 지우시겠습니까?`, { key: 'diaryDelete', persist: false, action, autoHideDuration: 3000 });
    closeMenu();
  };
  const onClickCopy = () => {
    navigator.clipboard.writeText(diaryData.text).then(() => {
      enqueueSnackbar('텍스트가 클립보드에 복사되었습니다.', { variant: 'success' });
    });
    closeMenu();
  }
  const onClickEdit = () => {
    router.push(`/inter/input/editDiary?id=${diaryData.id}`, { scroll: false })
    closeMenu();
  };


  return <Wrapper className={isMenuOpen ? '' : 'hidden'} $position={position}>
    <button onClick={onClickCopy}>
      <MdContentCopy className='icon' />텍스트 복사
    </button>
    <button onClick={onClickEdit}>
      <MdOutlineEdit className='icon' />수정
    </button>
    <button onClick={onClickDeleteButton}>
      <MdOutlineDeleteForever className='icon' />삭제
    </button>
  </Wrapper>;
}

export default DiaryMenus;

const Wrapper = styled.div<{ $position: number | undefined }>`
  transition: 200ms ease-in-out opacity;
  opacity: 1;
  &.hidden{
    pointer-events: none;
    opacity: 0;
  }

  height: auto;
  width: auto;
  padding: 10px 20px;

  display: flex;
  align-items: center;
  position: absolute;
  top: ${props => props.$position ? `${props.$position}px` : '50px'};
  right: 12px;
  gap: 20px;

  background-color: color-mix(in srgb, var(--theme-bg, #f5f5fa) 90%, white);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);

  button{
    .icon{
      font-size: 18px;
      margin-right: 4px;
      line-height: 0;
    }
    display: flex;
    align-items: center;
    font-size: 16px;
    color: rgb(var(--greyTitle));

    &:last-child{
      color: #d24343;
    }
  }
`
