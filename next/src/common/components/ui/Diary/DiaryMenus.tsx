import { deleteDiary } from "@/common/actions/diary";
import { authAction } from "@/common/auth/authAction";
import type { DiaryMenuData } from "@/common/types/diary";
import { cn } from "@/common/utils/cn";
import { parseLocalDate } from "@/common/utils/date/parseLocalDate";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { Dispatch, RefObject, SetStateAction, useCallback, useEffect, useRef } from "react";
import { MdOutlineDeleteForever, MdOutlineEdit } from 'react-icons/md';
import { SnackBarAction } from "../../../providers/snackbar/SnackBarAction";

interface Props {
  isMenuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  anchorRef: RefObject<HTMLElement>;
  diaryData: DiaryMenuData;
}

const menuWrapperPositionClass = "absolute z-[1000] top-12 right-4";
const menuButtonClass = "flex items-center text-theme-text-primary";
const menuIconClass = "mr-1 text-lg leading-none";
const menuTextClass = "text-sm";

const DiaryMenus = ({ isMenuOpen, setMenuOpen, anchorRef, diaryData }: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  const timer = useRef<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, [setMenuOpen]);

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
            queryClient.invalidateQueries({ queryKey: ['diary-habit', 'month'] });
            queryClient.invalidateQueries({ queryKey: ['stats'] });
            enqueueSnackbar('일기 삭제 완료');
          } catch (error) {
            enqueueSnackbar(error instanceof Error ? error.message : '일기 삭제 실패');
          }
        }}
        noAction={() => {
          closeSnackbar('diaryDelete');
        }} />
    );
    enqueueSnackbar(`${format(parseLocalDate(diaryData.date), 'yy년 M월 d일')} 일기를 지우시겠습니까?`, { key: 'diaryDelete', persist: false, action, autoHideDuration: 3000 });
    closeMenu();
  };
  const onClickEdit = () => {
    router.push(`/inter/input/editDiary?id=${diaryData.id}`, { scroll: false });
    closeMenu();
  };

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          key="diary-menu"
          ref={menuRef}
          initial={{ opacity: 0, y: reduceMotion ? 0 : -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduceMotion ? 0 : -4, pointerEvents: "none" }}
          transition={{ duration: reduceMotion ? 0 : 0.16, ease: "easeOut" }}
          className={cn(menuWrapperPositionClass,
            "bg-theme-surface flex h-auto w-auto items-center gap-5 rounded-theme px-5 py-2.5 shadow-[0_2px_12px_rgb(var(--theme-shadow-color)/0.18)]",
          )}
        >
          <button className={menuButtonClass} onClick={onClickEdit} type="button">
            <MdOutlineEdit className={menuIconClass} />
            <span className={menuTextClass}>수정</span>
          </button>
          <button className={cn(menuButtonClass, "text-theme-danger")} onClick={onClickDeleteButton} type="button">
            <MdOutlineDeleteForever className={menuIconClass} />
            <span className={menuTextClass}>삭제</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DiaryMenus;
