import { authAction } from "@/common/auth/authAction";
import { deleteCurrentUser } from "@/common/actions/user";
import { SnackBarAction } from "@/common/utils/snackBar/SnackBarAction";
import { signOut } from "next-auth/react";
import { closeSnackbar, enqueueSnackbar } from "notistack";

export const onDeleteAccount = () => {
  const userDeleteAction = () => (
    <>
      <SnackBarAction
        yesAction={() => {
          authAction(deleteCurrentUser).then(async () => {
            await signOut({ redirect: false });
            window.location.replace('/login');
          });
          closeSnackbar('userDelete');
        }}
        noAction={() => {
          closeSnackbar('userDelete');
        }} />
    </>
  );
  enqueueSnackbar('회원탈퇴 하시겠습니까?', { key: 'userDelete', persist: false, action: userDeleteAction, autoHideDuration: 3000 });
}
