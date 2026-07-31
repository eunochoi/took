'use client';

import { deleteCurrentUser } from "@/common/actions/user";
import { authAction } from "@/common/auth/authAction";
import { signOut } from "next-auth/react";
import { closeSnackbar, CustomContentProps, SnackbarContent } from "notistack";
import { forwardRef, useState } from "react";
import { snackbarPrimaryActionClass, snackbarSecondaryActionClass } from "./constants";

const DELETE_CONFIRM_TEXT = "DELETE";

const DeleteAccountSnackbarContent = forwardRef<HTMLDivElement, CustomContentProps>(
  ({ id, style }, ref) => {
    const [confirmText, setConfirmText] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const onConfirm = () => {
      if (confirmText !== DELETE_CONFIRM_TEXT) {
        setErrorMessage("DELETE를 정확히 입력해주세요.");
        return;
      }

      authAction(deleteCurrentUser).then(async () => {
        await signOut({ redirect: false });
        window.location.replace('/login');
      });
      closeSnackbar(id);
    };

    return (
      <SnackbarContent
        ref={ref}
        role="alert"
        style={style}
        className="box-border w-full max-w-[420px] rounded-theme border border-theme-border-muted bg-theme-surface-elevated p-3 text-theme-text-primary shadow-[0_1px_8px_rgb(var(--theme-shadow-color)/0.15)]"
      >
        <div className="flex w-full min-w-0 flex-col gap-3">
          <div className="flex flex-col">
            <span className="text-sm font-semibol">회원탈퇴 하시겠습니까?</span>
            <span className="mt-1 text-sm text-theme-text-tertiary">계속하려면 DELETE를 입력해주세요.</span>
          </div>
          <input
            className="h-9 w-full min-w-0 rounded-theme bg-theme-surface-muted px-4 text-center text-base font-medium text-theme-text-primary shadow-card placeholder:text-theme-text-tertiary"
            onChange={(event) => {
              setConfirmText(event.target.value);
              setErrorMessage("");
            }}
            placeholder={DELETE_CONFIRM_TEXT}
            type="text"
            value={confirmText}
          />
          {errorMessage && <span className="text-center text-sm font-medium text-theme-accent">{errorMessage}</span>}
          <div className="flex justify-end gap-2">
            <button
              className={snackbarSecondaryActionClass}
              onClick={() => {
                closeSnackbar(id);
              }}
              type="button"
            >
              취소
            </button>
            <button
              className={snackbarPrimaryActionClass}
              onClick={onConfirm}
              type="button"
            >
              확인
            </button>
          </div>
        </div>
      </SnackbarContent>
    );
  },
);

DeleteAccountSnackbarContent.displayName = "DeleteAccountSnackbarContent";

export default DeleteAccountSnackbarContent;
