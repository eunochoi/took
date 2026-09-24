'use client';

import { cn } from "@/common/utils/cn";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Dispatch, RefObject, SetStateAction, useCallback, useEffect, useRef } from "react";
import { MdOutlineDeleteForever, MdOutlineEdit } from 'react-icons/md';

interface Props {
  isMenuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  anchorRef: RefObject<HTMLElement>;
  onEdit: () => void;
  onDelete: () => void;
  vertical?: boolean;
  id?: string;
}

const EditDeleteMenu = ({ isMenuOpen, setMenuOpen, anchorRef, onEdit, onDelete, vertical = false, id }: Props) => {
  const reduceMotion = useReducedMotion();
  const menuRef = useRef<HTMLDivElement>(null);
  const closeMenu = useCallback(() => setMenuOpen(false), [setMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const timer = window.setTimeout(() => {
      if (!menuRef.current?.contains(document.activeElement)) closeMenu();
    }, 5000);
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!menuRef.current?.contains(target) && !anchorRef.current?.contains(target)) closeMenu();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
        anchorRef.current?.focus();
      }
    };
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', closeMenu, true);
    window.addEventListener('resize', closeMenu);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', closeMenu, true);
      window.removeEventListener('resize', closeMenu);
    };
  }, [isMenuOpen, anchorRef, closeMenu]);

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          id={id}
          ref={menuRef}
          initial={{ opacity: 0, y: reduceMotion ? 0 : -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduceMotion ? 0 : -4, pointerEvents: "none" }}
          transition={{ duration: reduceMotion ? 0 : 0.16, ease: "easeOut" }}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget) && !anchorRef.current?.contains(event.relatedTarget)) closeMenu();
          }}
          className={cn(
            "absolute right-4 top-12 z-[1000] flex rounded-theme bg-theme-surface shadow-[0_2px_12px_rgb(var(--theme-shadow-color)/0.1)]",
            vertical ? "min-w-24 flex-col p-1.5" : "items-center gap-5 px-5 py-2.5",
          )}
        >
          <button type="button" className={cn("flex items-center rounded-lg text-sm text-theme-text-primary", vertical && "justify-center px-3 py-2.5")} onClick={() => { closeMenu(); onEdit(); }}>
            {!vertical && <MdOutlineEdit className="mr-1 text-lg leading-none" aria-hidden="true" />}
            수정
          </button>
          <button type="button" className={cn("flex items-center rounded-lg text-sm text-theme-danger", vertical && "justify-center px-3 py-2.5")} onClick={() => { closeMenu(); onDelete(); }}>
            {!vertical && <MdOutlineDeleteForever className="mr-1 text-lg leading-none" aria-hidden="true" />}
            삭제
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditDeleteMenu;
