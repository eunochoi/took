import { AnimatePresence } from 'framer-motion';
import { useId, useRef, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { PickerDialog } from '../Dialog/PickerDialog';
import {
  PICKER_ACTIONS_CLASS,
  PICKER_CLOSE_BUTTON_CLASS,
  PICKER_CONFIRM_BUTTON_CLASS,
  PICKER_CONTENT_CLASS,
  PICKER_DANGER_BUTTON_CLASS,
  PICKER_TITLE_CLASS
} from '../Dialog/PickerDialog/constants';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onEdit: () => void;
  onDelete: () => void;
}

const Menus = ({ isOpen, onClose, title, message, onEdit, onDelete }: Props) => {
  const id = useId();
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const pendingAction = useRef<'edit' | 'delete' | null>(null);
  const titleId = `${id}-title`;
  const messageId = `${id}-message`;

  return (
    <AnimatePresence onExitComplete={() => {
      const action = pendingAction.current;
      pendingAction.current = null;
      setIsConfirmingDelete(false);
      if (action === 'edit') onEdit();
      if (action === 'delete') window.requestAnimationFrame(onDelete);
    }}>
      {isOpen && (
        <PickerDialog labelledBy={titleId} describedBy={messageId} onClose={onClose}>
          <div className={PICKER_CONTENT_CLASS}>
            <button type="button" aria-label="메뉴 닫기" onClick={onClose} className={PICKER_CLOSE_BUTTON_CLASS}>
              <MdClose aria-hidden="true" className="h-5 w-5" />
            </button>
            <div className="flex flex-col">
              <h2 id={titleId} className={`${PICKER_TITLE_CLASS} break-words`}>{title}</h2>
              <span id={messageId} aria-live="polite" className='mt-4 text-center text-sm text-theme-text-primary text-pretty break-keep'>
                {isConfirmingDelete ? <>정말 삭제하시겠어요?<br />삭제한 뒤에는 되돌릴 수 없어요.</> : message}
              </span>
            </div>

            <div className={`${PICKER_ACTIONS_CLASS} flex gap-3`}>
              <button
                type="button"
                className={PICKER_CONFIRM_BUTTON_CLASS}
                onClick={() => {
                  if (isConfirmingDelete) {
                    setIsConfirmingDelete(false);
                    return;
                  }
                  pendingAction.current = 'edit';
                  onClose();
                }}
              >
                {isConfirmingDelete ? '취소' : '수정'}
              </button>
              <button
                type="button"
                className={PICKER_DANGER_BUTTON_CLASS}
                onClick={() => {
                  if (!isConfirmingDelete) {
                    setIsConfirmingDelete(true);
                    return;
                  }
                  pendingAction.current = 'delete';
                  onClose();
                }}
              >
                {isConfirmingDelete ? '삭제하기' : '삭제'}
              </button>
            </div>
          </div>
        </PickerDialog>
      )}
    </AnimatePresence>
  );
};

export default Menus;
