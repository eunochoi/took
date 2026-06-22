import { authAction } from "@/common/auth/authAction";
import { deleteDiary } from "@/common/actions/diary";
import type { DiaryMenuData } from "@/common/types/diary";
import { cn } from "@/common/utils/cn";
import { parseLocalDate } from "@/common/utils/date/parseLocalDate";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { closeSnackbar, enqueueSnackbar } from "notistack";
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

  const onClickDeleteButton = () => {
    const action = () => (
      <SnackBarAction
        yesAction={async () => {
          closeSnackbar('diaryDelete');
          try {
            await authAction(() => deleteDiary({ id: diaryData.id }));
            queryClient.invalidateQueries({ queryKey: ['diary'] });
            queryClient.invalidateQueries({ queryKey: ['stats'] });
            enqueueSnackbar('일기 삭제 완료', { variant: 'success' });
          } catch (error) {
            enqueueSnackbar(error instanceof Error ? error.message : '일기 삭제 실패', { variant: 'error' });
          }
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

  return createPortal(
    <div
      ref={menuRef}
      className={cn(
        "absolute z-[1000] flex h-auto w-auto items-center gap-5 rounded-2xl px-5 py-2.5 shadow-[0_2px_12px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-opacity duration-200 ease-in-out",
        menuPosition ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        "[&>button]:flex [&>button]:items-center [&>button]:text-base [&>button]:text-grey-title [&>button_.icon]:mr-1 [&>button_.icon]:text-lg [&>button_.icon]:leading-none [&>button:last-child]:text-[#d24343]",
      )}
      style={{
        top: menuPosition ? `${menuPosition.top}px` : '0',
        right: menuPosition ? `${menuPosition.right}px` : '0',
        backgroundColor: "color-mix(in srgb, var(--theme-bg, #f5f5fa) 90%, white)",
      }}
    >
      <button onClick={onClickCopy} type="button">
        <MdContentCopy className='icon' />텍스트 복사
      </button>
      <button onClick={onClickEdit} type="button">
        <MdOutlineEdit className='icon' />수정
      </button>
      <button onClick={onClickDeleteButton} type="button">
        <MdOutlineDeleteForever className='icon' />삭제
      </button>
    </div>,
    document.body,
  );
};

export default DiaryMenus;
