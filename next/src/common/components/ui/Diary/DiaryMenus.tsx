import styled from "styled-components";

import { authAction } from "@/common/actions/authAction";
import { deleteDiary } from "@/common/actions/diary";
import type { DiaryMenuData } from "@/common/types/diary";
import { parseLocalDate } from "@/common/utils/date/parseLocalDate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { closeSnackbar, enqueueSnackbar, SnackbarKey } from "notistack";
import { Dispatch, RefObject, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MdContentCopy, MdOutlineDeleteForever, MdOutlineEdit } from 'react-icons/md';
import { SnackBarAction } from "../../../utils/snackBar/SnackBarAction";

interface Props {
  isMenuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  anchorRef: RefObject<HTMLElement>;
  diaryData: DiaryMenuData;
}

type MenuPosition = {
  top: number;
  right: number;
};

const MENU_GAP = 6;

const DiaryMenus = ({ isMenuOpen, setMenuOpen, anchorRef, diaryData }: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const timer = useRef<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState<MenuPosition | null>(null);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, [setMenuOpen]);

  const updateMenuPosition = useCallback(() => {
    const anchor = anchorRef.current;
    const menu = menuRef.current;

    if (!anchor || !menu) return;

    const anchorRect = anchor.getBoundingClientRect();
    const menuRect = menu.getBoundingClientRect();
    const top = Math.max(MENU_GAP, anchorRect.top + window.scrollY - menuRect.height - MENU_GAP);
    const right = Math.max(MENU_GAP, window.innerWidth - anchorRect.right);

    setMenuPosition({ top, right });
  }, [anchorRef]);

  useEffect(() => {
    if (!isMenuOpen) {
      setMenuPosition(null);
      return;
    }

    updateMenuPosition();
  }, [isMenuOpen, updateMenuPosition]);

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
    };
  }, [isMenuOpen, closeMenu]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;

      if (menuRef.current?.contains(target) || anchorRef.current?.contains(target)) {
        return;
      }

      closeMenu();
    };

    const handleViewportChange = () => {
      closeMenu();
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('scroll', handleViewportChange, true);
    window.addEventListener('resize', handleViewportChange);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('scroll', handleViewportChange, true);
      window.removeEventListener('resize', handleViewportChange);
    };
  }, [isMenuOpen, anchorRef, closeMenu]);


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
    onError: (error: Error) => {
      enqueueSnackbar(error.message || '일기 삭제 실패', { variant: 'error' });
      console.log('delete diary error');
    },
  });
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
    enqueueSnackbar(`${format(parseLocalDate(diaryData.date), 'yy년 M월 d일')} 일기를 지우시겠습니까?`, { key: 'diaryDelete', persist: false, action, autoHideDuration: 3000 });
    closeMenu();
  };
  const onClickCopy = () => {
    navigator.clipboard.writeText(diaryData.text).then(() => {
      enqueueSnackbar('텍스트가 클립보드에 복사되었습니다.', { variant: 'success' });
    });
    closeMenu();
  };
  const onClickEdit = () => {
    router.push(`/inter/input/editDiary?id=${diaryData.id}`, { scroll: false });
    closeMenu();
  };

  if (!isMenuOpen) return null;

  return createPortal(<Wrapper ref={menuRef} $position={menuPosition}>
    <button onClick={onClickCopy}>
      <MdContentCopy className='icon' />텍스트 복사
    </button>
    <button onClick={onClickEdit}>
      <MdOutlineEdit className='icon' />수정
    </button>
    <button onClick={onClickDeleteButton}>
      <MdOutlineDeleteForever className='icon' />삭제
    </button>
  </Wrapper>, document.body);
};

export default DiaryMenus;

const Wrapper = styled.div<{ $position: MenuPosition | null }>`
  transition: 200ms ease-in-out opacity;
  opacity: ${({ $position }) => $position ? 1 : 0};
  pointer-events: ${({ $position }) => $position ? 'auto' : 'none'};

  height: auto;
  width: auto;
  padding: 10px 20px;

  display: flex;
  align-items: center;
  position: absolute;
  z-index: 1000;
  top: ${({ $position }) => $position ? `${$position.top}px` : '0'};
  right: ${({ $position }) => $position ? `${$position.right}px` : '0'};
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
