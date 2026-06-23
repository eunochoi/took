'use client';

import { deleteCurrentUser } from "@/common/actions/user";
import { authAction } from "@/common/auth/authAction";
import { signOut } from "next-auth/react";
import { closeSnackbar, CustomContentProps, SnackbarContent } from "notistack";
import { forwardRef, useState } from "react";

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
        className="box-border w-full max-w-[420px] rounded-[20px] border border-white/80 bg-white p-3 text-grey-title shadow-[0_1px_8px_rgba(0,0,0,0.15)]"
      >
        <div className="flex w-full min-w-0 flex-col gap-3">
          <div className="flex flex-col">
            <span className="text-sm font-semibol">회원탈퇴 하시겠습니까?</span>
            <span className="mt-1 text-sm text-gray-400">계속하려면 DELETE를 입력해주세요.</span>
          </div>
          <input
            className="h-9 w-full min-w-0 rounded-2xl bg-gray-100 px-4 text-center text-base font-medium text-grey-title shadow-card placeholder:text-gray-400"
            onChange={(event) => {
              setConfirmText(event.target.value);
              setErrorMessage("");
            }}
            placeholder={DELETE_CONFIRM_TEXT}
            type="text"
            value={confirmText}
          />
          {errorMessage && <span className="text-center text-sm font-medium text-theme">{errorMessage}</span>}
          <div className="flex justify-end gap-2">
            <button
              className="rounded-2xl bg-gray-100 px-4 py-1.5 font-medium text-gray-500 shadow-card"
              onClick={() => {
                closeSnackbar(id);
              }}
              type="button"
            >
              취소
            </button>
            <button
              className="rounded-2xl bg-theme px-4 py-1.5 font-medium text-white shadow-card"
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
